import React, { useState, useEffect, useRef } from "react";

const monsterSize = 96;

// Voor willekeurige posities in container
function randomPosition(maxWidth, maxHeight) {
  return {
    x: Math.random() * (maxWidth - monsterSize),
    y: Math.random() * (maxHeight - monsterSize),
  };
}

// Lijst met monsters afbeeldingen in public/monsters
const monsterImages = [
  "/monsters/monster1.png",
  "/monsters/monster2.png",
  "/monsters/monster3.png",
   "/monsters/monster4.png",
  "/monsters/monster5.png",
  // Voeg hier meer toe als je wilt
];

export default function MonsterGame({ onXPChange, onStressChange, disabled, mode, level, onLevelComplete }) {
  const containerRef = useRef(null);
  const [monsters, setMonsters] = useState([]);

  // Nieuwe monsters aanmaken bij level of mode verandering
  useEffect(() => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    const count = mode === "levels" ? level + 2 : 5 + level;

    const newMonsters = Array.from({ length: count }).map((_, i) => {
      const pos = randomPosition(clientWidth, clientHeight);
      // Kies een random afbeelding uit monsterImages voor elk monster
      const imgIndex = Math.floor(Math.random() * monsterImages.length);
      return { id: i + Date.now(), x: pos.x, y: pos.y, img: monsterImages[imgIndex] };
    });
    setMonsters(newMonsters);
  }, [level, mode]);

  // Monsters bewegen elke 500ms
  useEffect(() => {
    if (disabled || monsters.length === 0) return;

    const interval = setInterval(() => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;

      setMonsters((prev) =>
        prev.map((m) => {
          const moveX = (Math.random() - 0.5) * 20;
          const moveY = (Math.random() - 0.5) * 20;

          let newX = m.x + moveX;
          let newY = m.y + moveY;

          newX = Math.max(0, Math.min(clientWidth - monsterSize, newX));
          newY = Math.max(0, Math.min(clientHeight - monsterSize, newY));

          return { ...m, x: newX, y: newY };
        })
      );
    }, 500);

    return () => clearInterval(interval);
  }, [disabled, monsters.length]);

  // Klik op monster: verwijder monster, verhoog XP en verlaag stress
  function handleClick(id) {
    if (disabled) return;

    setMonsters((prev) => {
      const filtered = prev.filter((m) => m.id !== id);
      if (filtered.length === 0) {
        onLevelComplete();
      }
      return filtered;
    });

    onXPChange?.(10);
    onStressChange?.(-5);
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: 300,
        border: "2px solid #444",
        borderRadius: 12,
        backgroundColor: "#fafafa",
        overflow: "hidden",
      }}
    >
      {monsters.map(({ id, x, y, img }) => (
        <img
          key={id}
          src={img}
          alt="monster"
          onClick={() => handleClick(id)}
          style={{
            position: "absolute",
            width: monsterSize,
            height: monsterSize,
            left: x,
            top: y,
            cursor: disabled ? "default" : "pointer",
            userSelect: "none",
            transition: "left 0.4s ease, top 0.4s ease",
          }}
          draggable={false}
        />
      ))}
      {monsters.length === 0 && (
        <p style={{ textAlign: "center", marginTop: 20 }}>Alle monsters zijn verslagen!</p>
      )}
    </div>
  );
}
