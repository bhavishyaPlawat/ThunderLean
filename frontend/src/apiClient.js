// API client to replace Supabase functionality
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth methods
  async signIn(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async signUp(email, password, fullName) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async signOut() {
    this.setToken(null);
    return { success: true };
  }

  async getUser() {
    if (!this.token) {
      return { user: null };
    }
    
    try {
      const response = await this.request('/auth/me');
      return { user: response.user };
    } catch (error) {
      this.setToken(null);
      return { user: null };
    }
  }

  // Profile methods
  async getProfile() {
    return this.request('/profiles');
  }

  async updateProfile(profileData) {
    return this.request('/profiles', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  }

  async getProfileByUserId(userId) {
    return this.request(`/profiles/${userId}`);
  }

  // Post methods
  async getPosts() {
    return this.request('/posts');
  }

  async createPost(postData) {
    return this.request('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async updatePost(postId, postData) {
    return this.request(`/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  }

  async deletePost(postId) {
    return this.request(`/posts/${postId}`, {
      method: 'DELETE',
    });
  }

  // Comment methods
  async getPostComments(postId) {
    return this.request(`/comments/post/${postId}`);
  }

  async createComment(commentData) {
    return this.request('/comments', {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  }

  async updateComment(commentId, content) {
    return this.request(`/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    });
  }

  async deleteComment(commentId) {
    return this.request(`/comments/${commentId}`, {
      method: 'DELETE',
    });
  }

  // Like methods
  async toggleLike(postId) {
    return this.request('/likes/toggle', {
      method: 'POST',
      body: JSON.stringify({ post_id: postId }),
    });
  }

  async getPostLikes(postId) {
    return this.request(`/likes/post/${postId}`);
  }

  async checkUserLike(postId) {
    return this.request(`/likes/check/${postId}`);
  }
}

// Create a singleton instance
export const apiClient = new ApiClient();

// Mock supabase-like interface for easier migration
export const supabase = {
  auth: {
    signInWithPassword: async ({ email, password }) => {
      try {
        const response = await apiClient.signIn(email, password);
        return { data: { user: response.user }, error: null };
      } catch (error) {
        return { data: { user: null }, error };
      }
    },
    
    signUp: async ({ email, password, options }) => {
      try {
        const fullName = options?.data?.full_name || '';
        const response = await apiClient.signUp(email, password, fullName);
        return { data: { user: response.user }, error: null };
      } catch (error) {
        return { data: { user: null }, error };
      }
    },
    
    signOut: async () => {
      try {
        await apiClient.signOut();
        return { error: null };
      } catch (error) {
        return { error };
      }
    },
    
    getUser: async () => {
      try {
        const response = await apiClient.getUser();
        return { data: response, error: null };
      } catch (error) {
        return { data: { user: null }, error };
      }
    },
    
    onAuthStateChange: (callback) => {
      // Simple implementation - in a real app, you'd want proper event handling
      const checkAuth = async () => {
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          callback('SIGNED_IN', { user: data.user });
        }
      };
      
      checkAuth();
      
      return {
        data: {
          subscription: {
            unsubscribe: () => {
              // Cleanup if needed
            }
          }
        }
      };
    }
  },
  
  from: (table) => ({
    select: (fields = '*') => ({
      eq: (column, value) => ({
        single: async () => {
          try {
            if (table === 'profiles') {
              const response = await apiClient.getProfile();
              return { data: response.profile, error: null };
            }
            return { data: null, error: { code: 'PGRST116' } };
          } catch (error) {
            return { data: null, error };
          }
        }
      }),
      
      order: (column, options) => ({
        async then(resolve) {
          try {
            if (table === 'posts') {
              const response = await apiClient.getPosts();
              resolve({ data: response.posts, error: null });
            }
          } catch (error) {
            resolve({ data: null, error });
          }
        }
      })
    }),
    
    insert: (data) => ({
      select: () => ({
        async then(resolve) {
          try {
            if (table === 'posts') {
              const response = await apiClient.createPost(data);
              resolve({ data: [response.post], error: null });
            }
          } catch (error) {
            resolve({ data: null, error });
          }
        }
      })
    }),
    
    update: (data) => ({
      eq: (column, value) => ({
        async then(resolve) {
          try {
            if (table === 'posts') {
              const response = await apiClient.updatePost(value, data);
              resolve({ data: [response.post], error: null });
            }
          } catch (error) {
            resolve({ data: null, error });
          }
        }
      })
    }),
    
    delete: () => ({
      eq: (column, value) => ({
        async then(resolve) {
          try {
            if (table === 'posts') {
              await apiClient.deletePost(value);
              resolve({ data: null, error: null });
            }
          } catch (error) {
            resolve({ data: null, error });
          }
        }
      })
    })
  })
};