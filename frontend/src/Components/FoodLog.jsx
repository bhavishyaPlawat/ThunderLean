
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import Sidebar from "./Sidebar";
import GetTip from './GetTip';
import BottomNav from './BottomNav';

import {
  IoCloudUploadOutline,
  IoTextOutline,
  IoChevronForward,
  IoChatbubbleEllipsesOutline,
  IoSyncOutline,
  IoClose,
  IoRestaurantOutline,
  IoTrashOutline,
} from "react-icons/io5";


// --- Supabase Client Setup ---
// IMPORTANT: Replace with your actual Supabase URL and Anon Key.
const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// MODIFIED: Displays an image if imageUrl is provided, otherwise shows the default icon.
const AiAnalysisCard = ({
  title,
  description,
  buttonText,
  buttonIcon,
  imageUrl,
  onClick,
}) => (

  <div className="bg-[#1E1E1E] rounded-xl p-6 flex items-center justify-between space-x-4">
    <div className="flex-1">
      <p className="text-xs font-bold text-green-500 mb-1">AI POWERED</p>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      <button
        onClick={onClick}
        className="flex items-center space-x-2 bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        {buttonIcon}
        <span>{buttonText}</span>
      </button>
    </div>
    <div className="flex-shrink-0 w-32 h-24 hidden sm:block">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover rounded-md"
      />
    </div>
  </div>
);

const MealCard = ({ id, name, calories, imageUrl, onDelete }) => (
  <div className="w-full bg-[#1E1E1E] rounded-xl p-4 flex items-center space-x-4 text-left">
    <div className="flex-shrink-0 w-14 h-14 bg-gray-700 rounded-lg flex items-center justify-center">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <IoRestaurantOutline className="text-green-400 h-7 w-7" />
      )}

    </div>
    <div className="flex-grow">
      <p className="font-bold text-white capitalize">{name}</p>
      <p className="text-sm text-gray-400">{calories} calories</p>
    </div>
    <button
      onClick={() => onDelete(id)}
      className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full"
    >
      <IoTrashOutline className="h-5 w-5" />
    </button>
  </div>
);

const AnalysisModal = ({
  isOpen,
  onClose,
  onSubmit,
  mealDescription,
  setMealDescription,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1E1E1E] rounded-2xl p-8 max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <IoClose size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Describe Your Meal</h2>
        <form onSubmit={onSubmit}>
          <textarea
            value={mealDescription}
            onChange={(e) => setMealDescription(e.target.value)}
            placeholder="e.g., A bowl of oatmeal with blueberries and almonds"
            rows={4}
            className="w-full p-3 bg-[#282828] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
          />
          <button
            type="submit"
            disabled={isLoading || !mealDescription.trim()}
            className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 disabled:opacity-50 transition flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <IoSyncOutline className="animate-spin" />
            ) : (
              <IoTextOutline />
            )}
            <span>{isLoading ? "Analyzing..." : "Analyze Text"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

const ImageUploadModal = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [mealType, setMealType] = useState("Breakfast");
  const fileInputRef = useRef(null);

  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snacks"];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (previewUrl) URL.revokeObjectURL(previewUrl); // Clean up previous preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  useEffect(() => {
    // Clean up the object URL when the component unmounts
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleClose = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    onClose();
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onSubmit(selectedFile, mealType);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1E1E1E] rounded-2xl p-6 sm:p-8 max-w-md w-full relative">
        <h2 className="text-xl font-bold text-center mb-4">Upload Your Meal</h2>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <IoClose size={24} />
        </button>
        <div
          onClick={() => fileInputRef.current.click()}
          className="w-full h-48 bg-[#282828] border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center cursor-pointer mb-6"
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Meal preview"
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <div className="text-center text-gray-400">
              <IoCloudUploadOutline size={48} className="mx-auto" />
              <p>Click to upload image</p>
            </div>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
        <div className="mb-6">
          <p className="text-sm font-bold text-gray-400 mb-2">
            Select Meal Type
          </p>
          <div className="flex flex-wrap gap-2">
            {mealTypes.map((type) => (
              <button
                key={type}
                onClick={() => setMealType(type)}
                className={`px-4 py-1.5 rounded-full border transition-colors text-sm font-semibold ${
                  mealType === type
                    ? "bg-green-600 border-green-600 text-white"
                    : "bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!selectedFile || isLoading}
          className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? <IoSyncOutline className="animate-spin" /> : null}
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

// --- Main FoodLog Component ---
const FoodLog = () => {
  const location = useLocation();

  const activePage = location.pathname.split("/")[1] || "food-log";

  const [mealItems, setMealItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [analysisError, setAnalysisError] = useState(null);

  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [mealDescription, setMealDescription] = useState("");

  useEffect(() => {
    const fetchFoodLogs = async () => {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // MODIFIED: Select image_url
        const { data, error } = await supabase
          .from("food_logs")
          .select("id, food_name, calories, image_url")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          setFetchError("Could not fetch food logs.");
          console.error(error);
        } else {
          // MODIFIED: Map image_url to state
          setMealItems(
            data.map((log) => ({
              id: log.id,
              name: log.food_name,
              calories: log.calories,
              imageUrl: log.image_url,
            }))
          );
        }
      }
      setIsLoading(false);
    };

    fetchFoodLogs();
  }, []);

  const analyzeMeal = async (formData) => {
    setIsLoading(true);
    setAnalysisError(null);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found.");

      // NEW: Handle image upload to Supabase Storage
      let imageUrl = null;
      const imageFile = formData.get("mealImage");
      if (imageFile) {
        const filePath = `${user.id}/${Date.now()}_${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("mealimages")
          .upload(filePath, imageFile);
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("mealimages")
          .getPublicUrl(filePath);
        imageUrl = urlData.publicUrl;
      }

      // Invoke the Edge Function for analysis
      const { data, error: functionError } = await supabase.functions.invoke(
        "analyze-meal",
        { body: formData }
      );
      if (functionError) throw functionError;

      const parsedResult =
        typeof data.result === "string" ? JSON.parse(data.result) : data.result;

      // Insert the log into the database, now with the image URL
      const { data: insertedData, error: insertError } = await supabase
        .from("food_logs")
        .insert([
          {
            user_id: user.id,
            food_name: parsedResult.name || "Analyzed Meal",
            calories: parseInt(parsedResult.calories) || 0,
            protein_grams: parseInt(parsedResult.protein) || 0,
            carbs_grams: parseInt(parsedResult.carbs) || 0,
            fat_grams: parseInt(parsedResult.fat) || 0,
            image_url: imageUrl, // Save the image URL
          },
        ])
        .select("id, food_name, calories, image_url")
        .single();

      if (insertError) throw insertError;

      if (insertedData) {
        setMealItems((prevItems) => [insertedData, ...prevItems]);
      }

      setMealDescription("");
      setIsTextModalOpen(false);
      setIsUploadModalOpen(false);
    } catch (err) {
      setAnalysisError(err.message || "Failed to process meal.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLog = async (logId) => {
    const itemToDelete = mealItems.find((item) => item.id === logId);
    setMealItems((prevItems) => prevItems.filter((item) => item.id !== logId));

    // NEW: Delete image from storage if it exists
    if (itemToDelete && itemToDelete.imageUrl) {
      const imagePath = itemToDelete.imageUrl.split("/mealimages/")[1];
      if (imagePath) {
        await supabase.storage.from("meal_images").remove([imagePath]);
      }
    }

    const { error } = await supabase.from("food_logs").delete().eq("id", logId);

    if (error) {
      setAnalysisError(`Failed to delete log: ${error.message}`);
      console.error("Error deleting log:", error);
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!mealDescription.trim()) return;
    const formData = new FormData();
    formData.append("meal", mealDescription);
    analyzeMeal(formData);
  };

  const handleImageSubmit = (file, mealType) => {
    const formData = new FormData();
    formData.append("mealImage", file);
    formData.append("meal", mealType);
    analyzeMeal(formData);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar activePage={activePage} />
      <AnalysisModal
        isOpen={isTextModalOpen}
        onClose={() => setIsTextModalOpen(false)}
        onSubmit={handleTextSubmit}
        mealDescription={mealDescription}
        setMealDescription={setMealDescription}
        isLoading={isLoading}
      />
      <ImageUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSubmit={handleImageSubmit}
        isLoading={isLoading}
      />

      <main className="flex-grow p-6 md:p-8 bg-[#121212] text-white font-sans">
        <div className="max-w-5xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Food Log</h1>
            <button className="bg-green-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-green-700 transition-colors">
              + Add Manually
            </button>
          </header>

          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">AI Food Analysis</h2>
            {analysisError && (
              <div className="bg-red-900/50 text-red-300 p-4 rounded-lg mb-4">
                {analysisError}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AiAnalysisCard
                title="Analyze Image"
                description="Analyze your food by uploading an image."
                buttonText="Upload"
                buttonIcon={<IoCloudUploadOutline />}
                imageUrl="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                onClick={() => setIsUploadModalOpen(true)}
              />
              <AiAnalysisCard
                title="Describe Food"
                description="Describe your meal to get nutritional info."
                buttonText="Describe"
                buttonIcon={<IoTextOutline />}
                imageUrl="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                onClick={() => setIsTextModalOpen(true)}
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Today's Meals</h2>
            <div className="space-y-3">
              {isLoading && mealItems.length === 0 && (
                <div className="text-center text-gray-400 p-4">Loading...</div>
              )}
              {fetchError && (
                <div className="text-center text-red-400 p-4">{fetchError}</div>
              )}
              {!isLoading && !fetchError && mealItems.length === 0 && (
                <div className="text-center text-gray-500 p-4">
                  No meals logged yet. Use the AI tools above to start!
                </div>
              )}
              {mealItems.map((item) => (
                <MealCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  calories={item.calories}
                  imageUrl={item.imageUrl}
                  onDelete={handleDeleteLog}
                />
              ))}
            </div>
          </section>
        </div>
        <button className="fixed bottom-8 right-8 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110">
          <IoChatbubbleEllipsesOutline className="h-6 w-6" />
        </button>
      </main>
    </div>

  );
};

export default FoodLog;
