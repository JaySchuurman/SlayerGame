import React from "react";

export default function XPLevel({ xp, targetXP, level }) {
  const percentage = Math.min(100, (xp / targetXP) * 100);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-3 text-purple-700">Level {level}</h2>
      <p className="mb-2">
        XP: {xp} 
      </p>
      <div className="w-full bg-gray-300 rounded-full h-6">
        <div
          className="h-6 rounded-full bg-purple-600 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
