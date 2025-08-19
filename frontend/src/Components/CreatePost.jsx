// frontend/src/Components/Community/CreatePost.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { IoImageOutline, IoCloseCircle } from "react-icons/io5";

// Preset hashtags for users to choose from
const presetHashtags = [
  "#FitnessJourney",
  "#HealthyEating",
  "#WorkoutMotivation",
  "#MealPrep",
  "#HealthyLifestyle",
  "#Cardio",
  "#StrengthTraining",
];

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for the image preview URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create a URL for the selected image to show a preview
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleHashtagClick = (hashtag) => {
    // Append the hashtag to the content with a space
    setContent((prevContent) => `${prevContent} ${hashtag}`);
  };

  const handlePost = async () => {
    if (!content.trim() || !user) return;
    setLoading(true);
    setError(null);

    let imageUrl = null;
    if (imageFile) {
      const filePath = `${user.id}/${Date.now()}_${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("posts")
        .upload(filePath, imageFile);

      if (uploadError) {
        console.error("Error uploading image:", uploadError);
        setError("Failed to upload image. Please try again.");
        setLoading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("posts")
        .getPublicUrl(filePath);
      imageUrl = urlData.publicUrl;
    }

    const { error: postError } = await supabase
      .from("posts")
      .insert({ content, image_url: imageUrl, user_id: user.id });

    if (postError) {
      console.error("Error creating post:", postError);
      setError("Failed to create post. Please try again.");
    } else {
      setContent("");
      setImageFile(null);
      setImagePreview(null);
      onPostCreated();
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#1E1E1E] p-4 rounded-xl">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none resize-none"
        placeholder="Share your thoughts or progress..."
        rows="3"
      />

      {/* Image Preview Section */}
      {imagePreview && (
        <div className="relative mt-2 w-32 h-32">
          <img
            src={imagePreview}
            alt="Selected preview"
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full p-1"
          >
            <IoCloseCircle size={20} />
          </button>
        </div>
      )}

      {/* Hashtag Presets */}
      <div className="mt-3 flex flex-wrap gap-2">
        {presetHashtags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleHashtagClick(tag)}
            className="px-3 py-1 bg-gray-700 text-purple-300 text-xs font-semibold rounded-full hover:bg-gray-600 transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-700/50">
        <label className="cursor-pointer text-gray-400 hover:text-green-500">
          <IoImageOutline size={22} />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        <button
          onClick={handlePost}
          className="bg-green-600 text-white font-bold px-5 py-1.5 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-500"
          disabled={loading || !content.trim()}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
