// frontend/src/Components/Community/Community.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import GetTip from "./GetTip";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import { supabase } from "../supabaseClient";
import { IoChatbubbleEllipsesOutline, IoSyncOutline } from "react-icons/io5";

const Community = () => {
  const location = useLocation();
  const activePage = location.pathname.split("/")[1] || "community";
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isTipOpen, setIsTipOpen] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      await fetchUser();
      await fetchPosts();
      setLoading(false);
    };
    initialize();
  }, []);

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        *,
        profiles (
          full_name,
          avatar_url
        ),
        likes (
          user_id
        ),
        comments (
          id
        )
      `
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data);
    }
  };

  const handlePostAction = () => {
    fetchPosts(); // Refetches all posts to update the UI
  };

  return (
    <>
      <div className="flex h-screen bg-[#121212] overflow-hidden">
        <Sidebar activePage={activePage} />
        <main className="flex-grow p-6 md:p-8 bg-[#121212] text-white font-sans overflow-y-auto pb-20 md:pb-6">
          <div className="max-w-3xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-bold">Community</h1>
            </header>

            <section className="mb-8">
              <CreatePost onPostCreated={handlePostAction} />
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Latest Posts</h2>
              {loading ? (
                <div className="flex justify-center items-center p-10">
                  <IoSyncOutline className="animate-spin h-8 w-8 text-gray-500" />
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      currentUser={user}
                      onPostDeleted={handlePostAction}
                      onPostUpdated={handlePostAction}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
          <button
            onClick={() => setIsTipOpen(true)}
            className="fixed bottom-20 right-4 md:bottom-8 md:right-8 bg-green-500 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-40"
          >
            <IoChatbubbleEllipsesOutline className="h-6 w-6" />
          </button>
        </main>
      </div>
      <BottomNav />
      <GetTip isOpen={isTipOpen} onClose={() => setIsTipOpen(false)} />
    </>
  );
};

export default Community;
