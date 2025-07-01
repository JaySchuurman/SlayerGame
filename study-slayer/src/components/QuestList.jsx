import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const monsters = [
  { name: "De Uitsteller", icon: "🐢" },
  { name: "Deadline-Draak", icon: "🐉" },
  { name: "Stress-Slang", icon: "🐍" },
  { name: "Perfectionisme-Phoenix", icon: "🦅" },
];

export default function QuestList({ setXp, setStress }) {
  const [quests, setQuests] = useState(() => {
    const saved = localStorage.getItem("quests");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("quests", JSON.stringify(quests));
  }, [quests]);

  // verhoog stress langzaam voor onvoltooide quests
  useEffect(() => {
    const interval = setInterval(() => {
      const hasIncomplete = quests.some(q => !q.completed);
      if (hasIncomplete) setStress(prev => Math.min(prev + 1, 100));
    }, 10000); // elke 10 sec +1 stress

    return () => clearInterval(interval);
  }, [quests, setStress]);

  const addQuest = () => {
    if (input.trim() === "") return;
    const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];
    setQuests([
      ...quests,
      { id: Date.now(), text: input, completed: false, monster: randomMonster },
    ]);
    setInput("");
  };

  const completeQuest = (id) => {
    setQuests(
      quests.map((q) =>
        q.id === id ? { ...q, completed: true } : q
      )
    );
    setXp(prev => prev + 20);
    setStress(prev => Math.max(prev - 10, 0));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          className="flex-grow p-2 text-black rounded"
          placeholder="Voeg een quest toe..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addQuest()}
        />
        <button
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          onClick={addQuest}
        >
          Voeg toe
        </button>
      </div>

      <ul className="space-y-2">
        {quests.map((quest) => (
          <motion.li
            key={quest.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-4 rounded shadow flex items-center justify-between
              ${quest.completed ? "bg-green-700" : "bg-purple-700"}
            `}
          >
            <div>
              <p className="text-lg font-semibold">
                {quest.monster.icon} {quest.text}
              </p>
              {!quest.completed && (
                <p className="text-sm opacity-70">
                  Monster: {quest.monster.name}
                </p>
              )}
            </div>
            {!quest.completed ? (
              <button
                className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                onClick={() => completeQuest(quest.id)}
              >
                Versla!
              </button>
            ) : (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1.2, rotate: 360 }}
                className="text-2xl"
              >
                ✅
              </motion.span>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
