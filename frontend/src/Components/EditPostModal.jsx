// frontend/src/Components/Community/EditPostModal.jsx
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { IoClose, IoSaveOutline } from "react-icons/io5";

const EditPostModal = ({ isOpen, onClose, post, onPostUpdated }) => {
  if (!isOpen) return null;

  const [content, setContent] = useState(post.content);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("posts")
      .update({ content })
      .eq("id", post.id);

    if (error) {
      console.error("Error updating post:", error);
    } else {
      onPostUpdated();
      onClose();
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1E1E1E] rounded-2xl p-6 max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <IoClose size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-white">Edit Post</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="w-full p-3 bg-[#282828] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
        />
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full mt-4 px-4 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 disabled:opacity-50 transition flex items-center justify-center gap-2"
        >
          <IoSaveOutline />
          <span>{loading ? "Saving..." : "Save Changes"}</span>
        </button>
      </div>
    </div>
  );
};

export default EditPostModal;
