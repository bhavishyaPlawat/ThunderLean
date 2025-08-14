// frontend/src/Components/Community/PostCard.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import EditPostModal from "./EditPostModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import CommentModal from "./CommentModal"; // Make sure this component is created
import {
  IoHeartOutline,
  IoHeart,
  IoChatbubbleOutline,
  IoShareSocialOutline,
  IoEllipsisHorizontal,
} from "react-icons/io5";

// --- UTILITY FUNCTIONS ---
const timeAgo = (date) => {
  if (!date) return "";
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "m ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "min ago";
  return "just now";
};

const PostContent = ({ text }) => {
  if (!text) return null;
  const parts = text.split(/(#\w+)/g);
  return (
    <p className="text-gray-300 mt-2 whitespace-pre-wrap">
      {parts.map((part, i) =>
        part.startsWith("#") ? (
          <span
            key={i}
            className="text-purple-400 font-semibold cursor-pointer hover:underline"
          >
            {part}
          </span>
        ) : (
          part
        )
      )}
    </p>
  );
};
// --- END UTILITY FUNCTIONS ---

const PostCard = ({ post, currentUser, onPostDeleted, onPostUpdated }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [commentCount, setCommentCount] = useState(post.comments?.length || 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  useEffect(() => {
    if (
      currentUser &&
      post.likes?.some((like) => like.user_id === currentUser.id)
    ) {
      setIsLiked(true);
    }
  }, [post.likes, currentUser]);

  const handleLike = async () => {
    if (!currentUser) return;

    setIsLiked(!isLiked); // Optimistic UI update

    if (isLiked) {
      setLikeCount((prev) => prev - 1);
      await supabase
        .from("likes")
        .delete()
        .match({ post_id: post.id, user_id: currentUser.id });
    } else {
      setLikeCount((prev) => prev + 1);
      await supabase
        .from("likes")
        .insert({ post_id: post.id, user_id: currentUser.id });
    }
  };

  const handleDelete = async () => {
    // Delete image from storage first, if it exists
    if (post.image_url) {
      const imagePath = post.image_url.split("/posts/")[1];
      if (imagePath) {
        await supabase.storage.from("posts").remove([imagePath]);
      }
    }

    // Then delete the post from the database
    const { error } = await supabase.from("posts").delete().eq("id", post.id);
    if (error) {
      console.error("Error deleting post:", error);
    } else {
      onPostDeleted();
      setIsDeleteModalOpen(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Post by ${post.profiles?.full_name || "a user"}`,
          text: post.content,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const isOwner = currentUser && currentUser.id === post.user_id;

  return (
    <>
      <EditPostModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        post={post}
        onPostUpdated={() => {
          setIsEditModalOpen(false);
          onPostUpdated();
        }}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        postId={post.id}
        currentUser={currentUser}
        onCommentPosted={() => setCommentCount((prev) => prev + 1)}
      />

      <div className="bg-[#1E1E1E] p-5 rounded-xl border border-gray-800">
        <div className="flex items-start space-x-4">
          <img
            src={
              post.profiles?.avatar_url ||
              "https://api.dicebear.com/8.x/adventurer/svg?seed=default"
            }
            alt={post.profiles?.full_name || "User"}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-gray-700"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div className="flex items-baseline space-x-2">
                <p className="font-bold text-white hover:underline cursor-pointer">
                  {post.profiles?.full_name || "Anonymous User"}
                </p>
                <p className="text-xs text-gray-500">
                  · {timeAgo(post.created_at)}
                </p>
              </div>
              {isOwner && (
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-1 rounded-full hover:bg-gray-700"
                  >
                    <IoEllipsisHorizontal className="text-gray-400" />
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#282828] rounded-md shadow-lg z-10 border border-gray-700">
                      <button
                        onClick={() => {
                          setIsEditModalOpen(true);
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Edit Post
                      </button>
                      <button
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                      >
                        Delete Post
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <PostContent text={post.content} />
            {post.image_url && (
              <img
                src={post.image_url}
                alt="Post"
                className="mt-4 rounded-lg border border-gray-700 max-h-96 w-full object-cover"
              />
            )}
            <div className="flex items-center space-x-6 mt-4 text-gray-400">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1.5 transition-colors duration-200 ${
                  isLiked ? "text-pink-500" : "hover:text-pink-500"
                }`}
              >
                {isLiked ? <IoHeart size={20} /> : <IoHeartOutline size={20} />}
                <span className="text-sm font-semibold">{likeCount}</span>
              </button>
              <button
                onClick={() => setIsCommentModalOpen(true)}
                className="flex items-center space-x-1.5 hover:text-blue-500 transition-colors duration-200"
              >
                <IoChatbubbleOutline size={20} />
                <span className="text-sm font-semibold">{commentCount}</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center space-x-1.5 hover:text-green-500 transition-colors duration-200"
              >
                <IoShareSocialOutline size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
