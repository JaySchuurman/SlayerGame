import React, { useState } from "react";
import MonsterGame from "./MonsterGame";

export default function WelcomePage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [xp, setXP] = useState(0);
  const [stress, setStress] = useState(50);

  function handleStart() {
    setGameStarted(true);
  }

  function handleXPChange(amount) {
    setXP((prev) => prev + amount);
  }

  function handleStressChange(amount) {
    setStress((prev) => Math.max(0, prev + amount));
  }

  if (gameStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
        <MonsterGame onXPChange={handleXPChange} onStressChange={handleStressChange} />
        <div className="mt-6 text-white text-lg font-semibold">
          XP: {xp} | Stress: {stress}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-600 via-blue-700 to-red-600 text-white px-6">
      <h1 className="text-6xl font-extrabold mb-8 drop-shadow-lg">
        Welkom bij <span className="text-yellow-300">Study Slayer!</span>
      </h1>
      <button
        onClick={handleStart}
        className="px-10 py-4 bg-yellow-400 hover:bg-yellow-500 text-xl font-bold rounded-full shadow-lg transition duration-300"
      >
        Start Minigame
      </button>
    </div>
  );
}
