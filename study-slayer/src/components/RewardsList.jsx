import { FaCheckCircle } from "react-icons/fa";

export default function RewardsList({ rewards, earnedXP }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-purple-700">Verdiende Rewards</h2>
      <ul>
        {rewards.map(({ milestone, reward }) => {
          const earned = earnedXP >= milestone;
          return (
            <li
              key={milestone}
              className={`flex items-center gap-2 mb-2 ${
                earned ? "text-green-600 font-semibold" : "text-gray-400"
              }`}
            >
              {earned && <FaCheckCircle />}
              <span>
                Bij {milestone} XP: {reward}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
