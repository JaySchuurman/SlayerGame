import React from "react";

export default function StressMeter({ stress }) {
  let barColor = "bg-green-500";

  if (stress >= 70) barColor = "bg-red-500";
  else if (stress >= 40) barColor = "bg-yellow-400";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-3 text-red-600">Stress Level</h2>
      <p className="mb-2">{stress} / 100</p>
      <div className="w-full bg-gray-300 rounded-full h-6">
        <div
          className={`${barColor} h-6 rounded-full transition-all duration-500`}
          style={{ width: `${stress}%` }}
        />
      </div>
    </div>
  );
}
