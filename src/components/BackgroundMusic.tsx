"use client";

import { useEffect, useRef } from "react";

import { useMusicStore } from "@/store/useMusicStore";

const MUSIC = "/audio/music/stadium-theme.mp3";

export default function BackgroundMusic() {
  const enabled = useMusicStore((s) => s.enabled);

  const setPlaying = useMusicStore((s) => s.setPlaying);

  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audio.current) return;
    audio.current.volume = 0.15;
    if (enabled) {
      audio.current
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch(console.error);
    } else {
      audio.current.pause();
      setPlaying(false);
    }
  }, [enabled, setPlaying]);

  return (
    <audio
      ref={audio}
      src={MUSIC}
      preload="auto"
      loop
    />
  );
}