// frontend/src/Components/Community/DeleteConfirmationModal.jsx
import React from "react";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1E1E1E] rounded-2xl p-8 max-w-sm w-full relative text-center">
        <h2 className="text-xl text-white font-bold mb-4">Confirm Deletion</h2>
        <p className="text-gray-400 mb-6">
          Are you sure you want to delete this post? This action cannot be
          undone.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
