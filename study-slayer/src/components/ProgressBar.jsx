export default function ProgressBar({ xp, maxXP }) {
  const percentage = Math.min((xp / maxXP) * 100, 100);

  return (
    <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden shadow-inner">
      <div
        className="h-6 bg-purple-600 transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
