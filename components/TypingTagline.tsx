"use client";

import { useEffect, useState } from "react";

const phrases = [
  "Strategic Leader.",
  "Data-Driven Builder.",
  "Co-Founder.",
  "BI Developer.",
];

export default function TypingTagline() {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), 1500);
      return () => clearTimeout(t);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
      return;
    }

    const delay = deleting ? 30 : 60;
    const t = setTimeout(() => {
      setText((prev) =>
        deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
      );
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, phraseIdx]);

  return (
    <p className="max-w-md text-lg text-zinc-300 sm:text-xl">
      <span>{text}</span>
      <span className="animate-pulse text-cyan-400">|</span>
    </p>
  );
}
