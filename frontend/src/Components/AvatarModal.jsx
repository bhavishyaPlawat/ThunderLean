// frontend/src/Components/Settings/AvatarModal.jsx
import React, { useState, useRef } from "react";
import { supabase } from "../supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoSaveOutline, IoCloudUploadOutline } from "react-icons/io5";

const presetAvatars = [
  "https://api.dicebear.com/8.x/adventurer/svg?seed=Mittens",
  "https://api.dicebear.com/8.x/adventurer/svg?seed=Sheba",
  "https://api.dicebear.com/8.x/adventurer/svg?seed=Gizmo",
  "https://api.dicebear.com/8.x/adventurer/svg?seed=Pepper",
  "https://api.dicebear.com/8.x/adventurer/svg?seed=Leo",
  "https://api.dicebear.com/8.x/adventurer/svg?seed=Milo",
];

const AvatarModal = ({ isOpen, onClose, onAvatarUpdate }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setSelectedAvatar(null);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handlePresetSelect = (url) => {
    setSelectedAvatar(url);
    setUploadedFile(null);
    setPreviewUrl(url);
  };

  const handleSave = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    let newAvatarUrl = selectedAvatar;

    if (uploadedFile) {
      const filePath = `avatars/${user.id}/${Date.now()}_${uploadedFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, uploadedFile);

      if (uploadError) {
        console.error("Error uploading avatar:", uploadError);
        setLoading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);
      newAvatarUrl = urlData.publicUrl;
    }

    if (newAvatarUrl) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: newAvatarUrl })
        .eq("id", user.id);

      if (!updateError) {
        onAvatarUpdate();
      } else {
        console.error("Error updating profile:", updateError);
      }
    }

    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          className="bg-[#1E1E1E] rounded-2xl p-6 max-w-lg w-full relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <IoClose size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-6 text-white text-center">
            Choose Avatar
          </h2>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
            {presetAvatars.map((src) => (
              <img
                key={src}
                src={src}
                alt="preset avatar"
                onClick={() => handlePresetSelect(src)}
                className={`w-16 h-16 rounded-full cursor-pointer transition-all ${
                  previewUrl === src
                    ? "ring-4 ring-purple-500 scale-110"
                    : "opacity-70 hover:opacity-100"
                }`}
              />
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 mb-6">
            <button
              onClick={() => fileInputRef.current.click()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600"
            >
              <IoCloudUploadOutline />
              Upload your own
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            {previewUrl && !presetAvatars.includes(previewUrl) && (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover ring-4 ring-purple-500"
              />
            )}
          </div>

          <button
            onClick={handleSave}
            disabled={loading || (!selectedAvatar && !uploadedFile)}
            className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            <IoSaveOutline size={22} />
            <span>{loading ? "Saving..." : "Save Changes"}</span>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AvatarModal;
