import React, { useState, useEffect } from "react";
import XPLevel from "./components/XPLevel";
import StressMeter from "./components/StressMeter";
import MonsterGame from "./components/MonsterGame";
import PauseTimer from "./components/PauseTimer";
import LevelCompleteModal from "./components/LevelCompleteModal";

export default function App() {
  const [xp, setXp] = useState(0);
  const [stress, setStress] = useState(50);
  const [gameStarted, setGameStarted] = useState(false);
  const [mode, setMode] = useState(null);
  const [level, setLevel] = useState(1);
  const [pauseActive, setPauseActive] = useState(false);
  const [pauseTimeLeft, setPauseTimeLeft] = useState(0);
  const [earnedRewards, setEarnedRewards] = useState([
    { milestone: 500, reward: "5 minuten pauze" },
    { milestone: 1000, reward: "10 minuten pauze" },
  ]);
  const [showLevelCompleteModal, setShowLevelCompleteModal] = useState(false);

  const [selectedReward, setSelectedReward] = useState(null);
  const [claimError, setClaimError] = useState(null);

  const [isExplanationOpen, setIsExplanationOpen] = useState(false);

  const startGame = (selectedMode) => {
    setMode(selectedMode);
    setGameStarted(true);
    setLevel(1);
    setXp(0);
    setStress(50);
    setPauseActive(false);
    setPauseTimeLeft(0);
    setShowLevelCompleteModal(false);
    setSelectedReward(null);
    setClaimError(null);
  };

  const handleXPChange = (amount) => {
    if (pauseActive) return;
    setXp((prevXp) => prevXp + amount);
  };

  const claimSelectedReward = () => {
    if (pauseActive) {
      setClaimError("Je hebt al een actieve pauze!");
      return;
    }
    if (!selectedReward) {
      setClaimError("Selecteer eerst een reward om te claimen.");
      return;
    }
    if (xp < selectedReward) {
      setClaimError("Niet genoeg XP om deze reward te claimen.");
      return;
    }

    const reward = earnedRewards.find((r) => r.milestone === selectedReward);
    if (!reward) {
      setClaimError("Ongeldige reward.");
      return;
    }

    const pauzeMinuten = reward.reward.includes("10 minuten") ? 10 : 5;

    setXp((prev) => prev - selectedReward);
    setClaimError(null);
    setPauseActive(true);
    setPauseTimeLeft(pauzeMinuten * 60);
  };

  const handleStressChange = (amount) =>
    setStress((prev) => Math.min(100, Math.max(0, prev + amount)));

  const [levelCompleting, setLevelCompleting] = useState(false);

  const handleLevelComplete = () => {
    if (levelCompleting) return;
    setLevelCompleting(true);
    setShowLevelCompleteModal(true);
  };

  const handleNextLevel = () => {
    setShowLevelCompleteModal(false);
    setPauseActive(false);
    setLevel((prev) => prev + 1);
    setStress(50);
    setLevelCompleting(false);
  };

  useEffect(() => {
    if (!gameStarted || pauseActive) return;

    const interval = setInterval(() => {
      setStress((prev) => Math.min(100, prev + 10));
    }, 5000);

    return () => clearInterval(interval);
  }, [gameStarted, pauseActive]);

  useEffect(() => {
    if (!pauseActive) return;

    if (pauseTimeLeft <= 0) {
      setPauseActive(false);
      setSelectedReward(null); // reset reward so it can be claimed again
      return;
    }

    const timerId = setInterval(() => {
      setPauseTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [pauseActive, pauseTimeLeft]);

  const handleBackToMenu = () => {
    setGameStarted(false);
    setMode(null);
    setLevel(1);
    setXp(0);
    setStress(50);
    setPauseActive(false);
    setPauseTimeLeft(0);
    setShowLevelCompleteModal(false);
    setSelectedReward(null);
    setClaimError(null);
  };

  function RewardDropdown({
    earnedRewards,
    selectedReward,
    selectReward,
    xp,
    pauseActive,
  }) {
    const [open, setOpen] = React.useState(true);

    return (
      <div>
        <button
          className="mb-2 text-sm text-gray-600 underline"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Verberg rewards" : "Toon rewards"}
        </button>
        {open && (
          <ul className="max-h-60 overflow-auto border rounded p-2 bg-gray-50">
            {earnedRewards.length === 0 && (
              <li>Je hebt nog geen rewards verdiend.</li>
            )}
            {earnedRewards.map(({ milestone, reward }) => {
              const canClaim = xp >= milestone && !pauseActive;

              return (
                <li
                  key={milestone}
                  className="flex items-center justify-between mb-2"
                >
                  <label
                    className={`flex items-center gap-2 cursor-pointer ${
                      !canClaim ? "text-gray-400" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="reward"
                      disabled={!canClaim}
                      checked={selectedReward === milestone}
                      onChange={() => selectReward(milestone)}
                    />
                    <span>{`Bij ${milestone} XP: ${reward}`}</span>
                  </label>
                  {!canClaim && (
                    <span className="text-red-500 ml-2 text-xs">
                      {pauseActive ? "Pauze bezig" : "Niet genoeg XP"}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-red-500 flex flex-col items-center justify-center p-6 gap-6">
      {!gameStarted && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-600 via-red-700 to-pink-600 text-white px-6">
          <h1 className="text-6xl font-extrabold mb-8 drop-shadow-lg text-center">
            Welkom bij <span className="text-yellow-300">Study Slayer!</span>
          </h1>
          <p className="mb-6 text-xl font-semibold">
            Klik op de knop om te beginnen:
          </p>

          <button
            onClick={() => setIsExplanationOpen(!isExplanationOpen)}
            className="mb-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition"
          >
            {isExplanationOpen ? "Verberg uitleg" : "Toon uitleg"}
          </button>

          {isExplanationOpen && (
            <div className="mb-8 text-lg bg-yellow-100 text-gray-800 rounded-lg p-4 shadow-md max-w-xl text-center mx-auto">
              <p>
                <strong>Wat je moet doen:</strong>
                <p>- Klik op de bewegende monsters om ze te verslaan. </p>
                <p>- Probeer je stress level zo laag mogelijk te houden! </p>
                <p>- Voor elk verslagen monster krijg je XP en gaat je stress omlaag.</p>
                <p>- Behaal genoeg XP om nieuwe levels te bereiken en rewards te claimen, zoals pauzes!</p>
              </p>
              <p className="mt-2">
                Let op: hoe hoger het level, hoe meer monsters er zijn en hoe moeilijker het wordt!
              </p>
            </div>
          )}

          <div className="flex gap-6">
            <button
              onClick={() => startGame("levels")}
              className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-xl font-bold rounded-full shadow-lg transition duration-300"
            >
              Speel!
            </button>
          </div>
        </div>
      )}

      {gameStarted && (
        <>
          <h1 className="text-4xl font-bold text-center mb-4">
            Study Quest 🗡️ {mode === "levels" ? `- Level ${level}` : ""}
          </h1>

          <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl justify-center">
            {mode === "levels" && (
              <XPLevel xp={xp} targetXP={level * 100} level={level} />
            )}
            <StressMeter stress={stress} />
          </div>

          {pauseActive && (
            <PauseTimer
              timeLeft={pauseTimeLeft}
              onFinish={() => setPauseActive(false)}
            />
          )}

          <MonsterGame
            onXPChange={handleXPChange}
            onStressChange={handleStressChange}
            disabled={pauseActive || showLevelCompleteModal}
            mode={mode}
            level={level}
            onLevelComplete={handleLevelComplete}
          />

          <div className="w-full max-w-md mt-8 p-4 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-2">Verdiende Rewards</h2>

            <RewardDropdown
              earnedRewards={earnedRewards}
              selectedReward={selectedReward}
              selectReward={setSelectedReward}
              xp={xp}
              pauseActive={pauseActive}
            />

            {claimError && (
              <p className="text-red-600 mt-2 font-semibold">{claimError}</p>
            )}

            <button
              onClick={claimSelectedReward}
              disabled={!selectedReward || pauseActive}
              className={`mt-4 w-full py-2 rounded font-bold transition ${
                selectedReward && !pauseActive
                  ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed text-gray-700"
              }`}
            >
              Claim gekozen reward
            </button>
          </div>

          <button
            onClick={handleBackToMenu}
            className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold transition"
          >
            Terug naar menu
          </button>

          {showLevelCompleteModal && (
            <LevelCompleteModal level={level} onNextLevel={handleNextLevel} />
          )}
        </>
      )}
    </div>
  );
}
