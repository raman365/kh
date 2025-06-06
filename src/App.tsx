import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

import ParticlesBackground from "./ParticlesBackground";
import PasswordPage from "./PasswordPage";
import welcome from "../public/welcome.mp3";
import kitten from "../public/kitten.jpg";
import memoryPhoto from "../public/memoryphoto1.jpeg";
import memoryPhoto2 from "../public/memoryphoto2.jpeg";

import memory1 from "../public/memory1.jpeg";
import memory2 from "../public/memory2.jpeg";
import memory3 from "../public/memory3.jpeg";
import memory4 from "../public/memory4.jpeg";
import memory5 from "../public/memory5.jpeg";
import memory6 from "../public/memory6.jpeg";
import memory7 from "../public/memory7.jpeg";
import memory8 from "../public/memory8.jpeg";

import moretocome from "../public/moretocome.jpg";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [pageIndex, setPageIndex] = useState(0); // new state to manage content pages
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const memoryGallery = [
    memory1,
    memory2,
    memory3,
    memory4,
    memory5,
    memory6,
    memory7,
    memory8,
  ];

  const handlePasswordSubmit = (password: string) => {
    if (password === "iloveyou") {
      setAuthenticated(true);

      if (!audioRef.current) {
        const audio = new Audio(welcome);
        audioRef.current = audio;
        audio.volume = 0.25;

        audio.addEventListener("loadedmetadata", () => {
          audio.currentTime = 32;

          audio.play().catch((err) => {
            console.error("Audio play failed:", err);
          });

          const checkLoop = () => {
            if (audio.currentTime >= 107) {
              audio.currentTime = 33;
              audio.play();
            }
            requestAnimationFrame(checkLoop);
          };

          requestAnimationFrame(checkLoop);
        });
      }
    } else {
      alert("Incorrect password. Try again ❤️");
    }
  };

  const contentPages = [
    {
      title: "Welcome to Raman & Kristin’s Appreciation 🎉",
      text: "This is our little journey, captured in words and memories. I hope it reminds you just how deeply I appreciate and love you.",
      image: kitten,
      caption: "US ❤️",
    },
    {
      title: "How It All Started",
      text: "It all started with evening/night games on PlayStation just us, laughing, teasing, bonding. Every minute brought us closer, and every laugh made me realize how much joy you brought into my life. You quickly became my favorite person, someone I looked forward to every day talking to. Then came the moment we finally met in person and everything just clicked. It felt natural, effortless, like we’d known each other forever. The cuddles felt amazing and loved every minute of it.",
      image: memoryPhoto,
      caption: "Our First Photo Together 📸",
    },
    {
      title: "Reasons I Love You",
      text: `The way your smile lights up everything around you including me tihi, it’s impossible to stay sad when I see you happy.

      Your kindness, not just toward me, but in how you treat everyone, you're a happy place to be for everyone even though you can't see it.
      
      The way you laugh, especially at the silly stuff it's the most beautiful sound, and it makes me melt every single time.
      
      The way you believe in me to keep motivated about certain things, even when I doubt myself, you've helped me grow and pushed me to become better, just by being by my side.
      
      Your heart, how deeply you love, how cute and emotional you can get. It’s rare, and it’s one of the things I cherish most.
      
      And the list goes on… I could be here all day thinking of things to say about you so that was just a few things.`,
      image: memoryPhoto2,
      caption: "Forever and Always 💖",
    },
    {
      title: "These are some of my favorite memories with you",
    },
    {
      title: "More to Come...",
      text: "This is just the beginning of our beautiful journey. I can't wait to create more memories with you.",
      image: moretocome,
      caption: "To be continued... 💫",
    },
    {
      title: "Thank you!",
      text: "Thank you for being you, for being my partner, my love, and my best friend. I can’t wait to see what the future holds for us. Here’s to many more adventures together! ❤️",
    },
  ];

  const handleNext = () => {
    setPageIndex((prev) => (prev + 1) % contentPages.length);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentPage = contentPages[pageIndex];

  useEffect(() => {
    if (currentPage.title === "Thank you!") {
      // Avoid multiple triggers
      const duration = 5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [currentPage]);

  return (
    <div className="relative min-h-screen text-center flex items-center justify-center bg-pink-50 p-4 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticlesBackground />
      </div>

      <div className="relative z-10 w-full flex justify-center">
        {!authenticated ? (
          <PasswordPage onSubmit={handlePasswordSubmit} />
        ) : (
          <div className="flex flex-col items-center gap-6 max-w-3xl">
            <div>
              <h1 className="text-3xl 2xl:text-4xl font-bold text-pink-600 mb-4">
                {currentPage.title}
              </h1>
              <p className="text-gray-700 text-lg 2xl:text-xl whitespace-pre-line mb-6">
                {currentPage.text}
              </p>
            </div>

            {currentPage.title ===
            "These are some of my favorite memories with you" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4">
                {memoryGallery.map((img, idx) => (
                  <motion.div
                    key={idx}
                    className="overflow-hidden rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: idx * 0.5,
                      duration: 1,
                      ease: "easeOut",
                    }}
                  >
                    <img
                      src={img}
                      alt={`Memory ${idx + 1}`}
                      className={`object-cover w-full h-60 shadow-md ${
                        img === memory1
                          ? "scale-200 translate-x-1/3"
                          : img === memory2
                          ? "scale-150"
                          : img === memory3
                          ? "scale-150 -translate-y-1/12"
                          : img === memory6
                          ? "scale-150"
                          : img === memory7
                          ? "scale-200 -translate-y-3/12 -translate-x-3"
                          : img === memory8
                          ? "scale-200"
                          : img === memory4
                          ? "scale-200"
                          : ""
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
            ) : currentPage.title === "Thank you!" ? null : (
              <div
                className={`overflow-hidden w-full relative rounded-xl shadow-md ${
                  currentPage.image === memoryPhoto ||
                  currentPage.image === memoryPhoto2
                    ? "max-w-[40%]"
                    : "max-w-[50%] 2xl:max-w-[75%]"
                }`}
              >
                <img
                  src={currentPage.image}
                  alt="Appreciation"
                  loading="lazy"
                  className={`w-full object-cover scale-110 rounded-xl ${
                    currentPage.image === moretocome ? "h-130" : ""
                  }`}
                />
                <p className="absolute bottom-0 left-0 right-0 text-white text-xl bg-pink-500 bg-opacity-80 p-2">
                  {currentPage.caption}
                </p>
              </div>
            )}

            <button
              onClick={handleNext}
              className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full shadow-lg transition-all cursor-pointer"
            >
              {currentPage.title === "Thank you!"
                ? "End ❤️"
                : "Next ❤️"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
