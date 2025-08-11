import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import GetTip from './GetTip';
import {
  IoImageOutline,
  IoHeartOutline,
  IoChatbubbleOutline,
  IoShareSocialOutline,
  IoChatbubbleEllipsesOutline
} from 'react-icons/io5';

// --- Mock Data (Ready for Backend Integration) ---
const initialPosts = [
  {
    id: 1,
    author: 'Sophia Clark',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXZhdGFyfGVufDB8fDB8fHww',
    timestamp: '2d ago',
    content: 'Just completed my first marathon! Feeling exhausted but incredibly proud. #Marathon #FitnessJourney',
    likes: 23,
    comments: 5,
    shares: 2,
  },
  {
    id: 2,
    author: 'Ethan Bennett',
    avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fHww',
    timestamp: '3d ago',
    content: 'Trying out a new high-protein breakfast recipe. Scrambled eggs with spinach and feta, topped with avocado. Delicious and keeps me full for hours! #HealthyEating #BreakfastIdeas',
    likes: 18,
    comments: 3,
    shares: 1,
  },
  {
    id: 3,
    author: 'Olivia Carter',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww',
    timestamp: '4d ago',
    content: 'Consistency is key! Even on days when I don\'t feel like it, I make sure to get some form of exercise in. Today was a light yoga session. #FitnessMotivation #Yoga',
    likes: 35,
    comments: 7,
    shares: 4,
  },
];

// --- Reusable Sub-components ---

const CreatePostCard = ({ currentUserAvatar, onPost }) => {
  const [postContent, setPostContent] = useState('');

  const handlePost = () => {
    if (postContent.trim()) {
      onPost(postContent);
      setPostContent(''); // Clear input after posting
    }
  };

  return (
    <div className="bg-[#1E1E1E] p-4 rounded-xl">
      <div className="flex space-x-4">
        <img src={currentUserAvatar} alt="Your avatar" className="w-10 h-10 rounded-full object-cover" />
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          className="w-full bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none resize-none"
          placeholder="Share your thoughts or progress..."
          rows="2"
        />
      </div>
      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-700/50">
        <button className="text-gray-400 hover:text-green-500">
          <IoImageOutline size={22} />
        </button>
        <button
          onClick={handlePost}
          className="bg-green-600 text-white font-bold px-5 py-1.5 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-500"
          disabled={!postContent.trim()}
        >
          Post
        </button>
      </div>
    </div>
  );
};

const PostCard = ({ post }) => (
  <div className="bg-[#1E1E1E] p-5 rounded-xl">
    <div className="flex items-start space-x-4">
      <img src={post.avatarUrl} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
      <div className="flex-1">
        <div className="flex items-baseline space-x-2">
          <p className="font-bold text-white">{post.author}</p>
          <p className="text-xs text-gray-500">{post.timestamp}</p>
        </div>
        <p className="text-gray-300 mt-1 whitespace-pre-wrap">{post.content}</p>
        <div className="flex items-center space-x-6 mt-4 text-gray-400">
          <button className="flex items-center space-x-1.5 hover:text-pink-500">
            <IoHeartOutline size={18} />
            <span className="text-sm">{post.likes}</span>
          </button>
          <button className="flex items-center space-x-1.5 hover:text-blue-500">
            <IoChatbubbleOutline size={18} />
            <span className="text-sm">{post.comments}</span>
          </button>
          <button className="flex items-center space-x-1.5 hover:text-green-500">
            <IoShareSocialOutline size={18} />
            <span className="text-sm">{post.shares}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);


const Community = () => {
  const location = useLocation();
  const activePage = location.pathname.split('/')[1] || 'community';
  const [posts, setPosts] = useState(initialPosts);
  const [isTipOpen, setIsTipOpen] = useState(false);

  const handleCreatePost = (content) => {
    const newPost = {
      id: Date.now(), // Temporary unique ID
      author: 'Your Name', // Replace with actual logged-in user
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D', // Replace with actual user avatar
      timestamp: 'Just now',
      content: content,
      likes: 0,
      comments: 0,
      shares: 0,
    };
    setPosts([newPost, ...posts]); // Add new post to the top of the list
  };

  return (
    <>
      <div className="flex min-h-screen bg-[#121212]">
        <Sidebar activePage={activePage} />
        <main className="flex-grow p-6 md:p-8 bg-[#121212] text-white font-sans">
          <div className="max-w-3xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-bold">Community</h1>
            </header>

            <section className="mb-8">
              <CreatePostCard
                currentUserAvatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
                onPost={handleCreatePost}
              />
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Latest Posts</h2>
              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          </div>
           <button
            onClick={() => setIsTipOpen(true)}
            className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-40"
          >
            <IoChatbubbleEllipsesOutline className="h-6 w-6" />
          </button>
        </main>
      </div>

      <GetTip isOpen={isTipOpen} onClose={() => setIsTipOpen(false)} />
      
      {isTipOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsTipOpen(false)}
        />
      )}
    </>
  );
};

export default Community;
