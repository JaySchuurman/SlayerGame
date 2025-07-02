import React, { useEffect, useState } from "react";

export default function PauseTimer({ timeLeft, onFinish }) {
  // formatteer seconden naar mm:ss
  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish();
    }
  }, [timeLeft, onFinish]);

  return (
    <div className="bg-yellow-100 text-yellow-900 p-4 rounded-lg shadow-md w-full max-w-md text-center font-semibold text-xl">
      🛑 Pauze actief! Neem even rust: {formatTime(timeLeft)} ⏱️
    </div>
  );
}
