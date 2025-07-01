import React from "react";

export default function HighscoreModal({ highscore, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Highscore</h2>
        <p className="text-xl mb-6">{highscore} XP</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sluit
        </button>
      </div>
    </div>
  );
}
