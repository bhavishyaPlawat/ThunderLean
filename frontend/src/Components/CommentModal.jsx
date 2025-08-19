// frontend/src/Components/Community/CommentModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";
import { IoClose, IoSend, IoSyncOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

// Utility function to format time
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

const CommentModal = ({
  isOpen,
  onClose,
  postId,
  currentUser,
  onCommentPosted,
}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const commentsEndRef = useRef(null);

  const fetchComments = async () => {
    if (!postId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("comments")
      .select("*, profiles(full_name, avatar_url)")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (error) console.error("Error fetching comments:", error);
    else setComments(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen, postId]);

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    const { error } = await supabase.from("comments").insert({
      post_id: postId,
      user_id: currentUser.id,
      content: newComment,
    });

    if (error) {
      console.error("Error posting comment:", error);
    } else {
      setNewComment("");
      fetchComments(); // Refetch to show the new comment
      onCommentPosted(); // Notify parent to update count
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#1E1E1E] rounded-2xl w-full max-w-lg h-[80vh] flex flex-col"
          >
            <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
              <h2 className="text-xl font-bold text-white">Comments</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <IoClose size={24} />
              </button>
            </header>

            <div className="flex-grow p-4 overflow-y-auto">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <IoSyncOutline className="animate-spin h-8 w-8 text-gray-500" />
                </div>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex items-start space-x-3"
                    >
                      <img
                        src={
                          comment.profiles?.avatar_url ||
                          "https://api.dicebear.com/8.x/adventurer/svg?seed=default"
                        }
                        alt={comment.profiles?.full_name || "User"}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="bg-[#282828] rounded-xl px-3 py-2">
                          <p className="font-bold text-white text-sm">
                            {comment.profiles?.full_name || "Anonymous User"}
                          </p>
                          <p className="text-gray-300 text-sm">
                            {comment.content}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 ml-2">
                          {timeAgo(comment.created_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={commentsEndRef} />
                </div>
              )}
            </div>

            <footer className="p-4 border-t border-gray-700 flex-shrink-0">
              <form
                onSubmit={handleCommentSubmit}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-[#282828] border border-gray-600 rounded-full py-2 px-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 disabled:bg-gray-500"
                  disabled={!newComment.trim()}
                >
                  <IoSend />
                </button>
              </form>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommentModal;
