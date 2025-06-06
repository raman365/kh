import { useState, useEffect, memo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { loadHeartShape } from "@tsparticles/shape-heart";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

const ParticlesBackground = memo(() => {
  const [init, setInit] = useState(false);
  const is2xl = useMediaQuery("(min-width: 1536px)"); // Tailwind's 2xl breakpoint

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
      await loadHeartShape(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        background: { color: "#fce7f3" },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: { enable: false },
            onHover: { enable: true, mode: "repulse" },
            resize: { enable: true },
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
          },
        },
        particles: {
          color: { value: "#fda5d5" },
          move: {
            enable: true,
            speed: 3,
            outModes: { default: "bounce" },
            direction: "none",
            straight: false,
            random: false,
          },
          number: { value: is2xl ? 40 : 30 }, // Adjust number based on screen size
          opacity: { value: 1 },
          shape: { type: "heart" },
          size: { value: { min: 10, max: 30 } },
        },
        detectRetina: true,
      }}
    />
  );
});

export default ParticlesBackground;
