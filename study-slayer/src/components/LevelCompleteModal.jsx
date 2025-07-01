import React from "react";

export default function LevelCompleteModal({ level, onNextLevel }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
      aria-labelledby="level-complete-title"
    >
      <div className="bg-white rounded-lg p-8 max-w-sm text-center shadow-lg">
        <h2 id="level-complete-title" className="text-3xl font-bold mb-4">
          🎉 Level {level} voltooid!
        </h2>
        <p className="mb-6 text-lg">Goed gedaan! Klaar voor het volgende level?</p>
        <button
          onClick={onNextLevel}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          autoFocus
        >
          Volgend Level
        </button>
      </div>
    </div>
  );
}
