"use client"

import { useEffect, useRef } from "react"

interface SoundEffectProps {
  src: string
  play: boolean
}

export function SoundEffect({ src, play }: SoundEffectProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const hasPlayedRef = useRef(false)

  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio(src)
    }

    // Play sound when the play prop changes to true and hasn't played yet
    if (play && !hasPlayedRef.current) {
      audioRef.current.play().catch((error) => console.error("Error playing sound:", error))
      hasPlayedRef.current = true
    }

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [play, src])

  return null
}

