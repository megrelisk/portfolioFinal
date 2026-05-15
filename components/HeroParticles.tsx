"use client";

import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const particleOptions: ISourceOptions = {
  /* ─────────────────────────────────────────────
     GENERAL
  ───────────────────────────────────────────── */
  fullScreen: { enable: false }, // contained inside the section, NOT the whole page
  background: { color: { value: "transparent" } },
  fpsLimit: 60,

  /* ─────────────────────────────────────────────
     PARTICLES
  ───────────────────────────────────────────── */
  particles: {
    number: {
      value: 48,          // sparse — only ~48 particles on desktop
      density: {
        enable: true,
        width: 1920,      // normalise density against a 1920-wide canvas
      },
    },

    color: {
      value: ["#00e5ff", "#00bcd4", "#7c3aed", "#a78bfa"],
    },

    shape: { type: "circle" },

    opacity: {
      value: { min: 0.05, max: 0.28 }, // extremely subtle — never harsh
      animation: {
        enable: true,      // ← the "breathing / twinkling" effect
        speed: 0.6,        // very slow cycle
        sync: false,       // each particle breathes at its own pace
      },
    },

    size: {
      value: { min: 0.8, max: 2.8 }, // fine dust, not blobs
      animation: {
        enable: true,
        speed: 1.2,
        sync: false,
      },
    },

    /* ── Connecting lines: almost invisible, short range ── */
    links: {
      enable: true,
      distance: 130,        // only link very close neighbours
      color: "#00e5ff",
      opacity: 0.08,        // near-invisible — feels like a constellation hint
      width: 0.6,
      triangles: { enable: false },
    },

    /* ── Slow cinematic drift ── */
    move: {
      enable: true,
      speed: 0.35,          // glacially slow — cinematic, not chaotic
      direction: "none",
      random: true,
      straight: false,
      outModes: {
        default: "out",     // particles gently exit and re-enter — no bouncing
      },
      attract: { enable: false },
    },
  },

  /* ─────────────────────────────────────────────
     INTERACTIVITY
  ───────────────────────────────────────────── */
  interactivity: {
    detectsOn: "window",
    events: {
      onHover: {
        enable: true,
        mode: "grab",       // subtle gravitational pull — not violent repulsion
      },
      onClick: { enable: false },
      resize: { enable: true },
    },
    modes: {
      grab: {
        distance: 120,
        links: { opacity: 0.18 }, // very lightly highlights nearby lines on hover
      },
    },
  },

  detectRetina: true,
};

export default function HeroParticles() {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, []);

  const particlesLoaded = useCallback(async () => {
    // intentionally empty — hook required by the API
  }, []);

  if (!engineReady) return null;

  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0 z-0 pointer-events-none"
      options={particleOptions}
      particlesLoaded={particlesLoaded}
    />
  );
}
