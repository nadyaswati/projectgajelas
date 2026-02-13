"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [yesPressed, setYesPressed] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // ⚡ Client-only setup
  useEffect(() => {
    setMounted(true);

    // Ambil ukuran window hanya di client
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);

    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  const phrases = [
    "Ga mau 😭",
    "Yakin?",
    "Serius?",
    "Pikir lagi lah bjir🙂",
    "Jangan gitu donk 😤",
    "Tega amat 😤",
    "Gw dah effort banget inihh 😤",
    "NYESEL SIH LU KATA GW 😤",
    "Klik Mau aja...",
  ];

  // Pindahkan tombol NO
  const moveNoButton = () => {
    const maxX = Math.min(windowSize.width * 0.35, 250); // max 250px dari center
    const maxY = Math.min(windowSize.height * 0.35, 250); // max 250px dari center

    const randomX = (Math.random() - 0.5) * 2 * maxX;
    const randomY = (Math.random() - 0.5) * 2 * maxY;

    setNoPosition({ x: randomX, y: randomY });
    setNoCount((prev) => prev + 1);
  };

  const handleYes = () => {
    setYesPressed(true);
    confetti({ particleCount: 250, spread: 160 });
  };

  if (!mounted) return null; // ❌ Jangan render di server

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-rose-200 to-purple-400 overflow-hidden">

      {/* 🔥 AUTOPLAY MUSIC */}
      <iframe
        className="hidden"
        src="https://www.youtube.com/embed/y1cBhJLNNXU?autoplay=1&mute=1&loop=1&playlist=y1cBhJLNNXU"
        allow="autoplay"
        title="background-music"
      />

      {yesPressed ? (
        <div className="flex flex-col items-center gap-10">
          <img
            className="rounded-3xl shadow-2xl w-[320px]"
            src="https://media1.tenor.com/m/UEFGoNHQg2wAAAAd/fullmetal-alchemist-roy-mustang.gif"
          />
          <h1 className="text-6xl font-bold animate-bounce">
            wkwkwk… akhirnya ❤️ kiwkiw
          </h1>
        </div>
      ) : (
        <div className="w-[70vw] h-[70vh] max-w-[500px] max-h-[600px] backdrop-blur-2xl bg-white/30 rounded-[45px] shadow-[0_25px_80px_rgba(0,0,0,0.25)] border border-white/40 flex flex-col items-center justify-center relative">
          
          {/* GIF */}
          <img
            className="h-[240px] mb-8"
            src="https://media1.tenor.com/m/_t6z8zkbZ8YAAAAd/heart-love.gif"
          />

          <h1 className="text-5xl font-bold mb-14 text-center">
            Kita serius yuk… mau ga?
          </h1>

          <div className="flex gap-12 items-center justify-center">
            {/* YES */}
            <button
              onClick={handleYes}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-5 px-12 rounded-3xl shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 text-2xl"
            >
              Mau ❤️
            </button>

            {/* NO */}
            <button
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              style={
                noPosition
                  ? {
                      position: "fixed",
                      left: `calc(50% + ${noPosition.x}px)`,
                      top: `calc(50% + ${noPosition.y}px)`,
                      transform: "translate(-50%, -50%)",
                    }
                  : {}
              }
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-10 rounded-3xl shadow-xl transition-all duration-300 text-xl"
            >
              {phrases[Math.min(noCount, phrases.length - 1)]}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
