const isBrowser = typeof window !== 'undefined'

// Pick the clearest, most child-friendly English voice available
function pickVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices()
  if (!voices.length) return null

  // Priority: Google UK English Female > Samantha > any en-GB > any en-US > any English
  return (
    voices.find(v => v.name === 'Google UK English Female') ||
    voices.find(v => v.name === 'Samantha') ||
    voices.find(v => v.lang === 'en-GB') ||
    voices.find(v => v.lang === 'en-US') ||
    voices.find(v => v.lang.startsWith('en')) ||
    null
  )
}

export function useAudio() {
  function speak(text: string, opts?: { rate?: number; pitch?: number; interrupt?: boolean }) {
    if (!isBrowser || !window.speechSynthesis) return

    if (opts?.interrupt !== false) {
      window.speechSynthesis.cancel()
    }

    const u = new SpeechSynthesisUtterance(text)
    // Slower rate (0.65) and slightly lower pitch = clearer for beginners
    u.rate   = opts?.rate  ?? 0.65
    u.pitch  = opts?.pitch ?? 1.0
    u.volume = 1

    const doSpeak = () => {
      const voice = pickVoice()
      if (voice) u.voice = voice
      window.speechSynthesis.speak(u)
    }

    // Chrome loads voices asynchronously on first call
    if (window.speechSynthesis.getVoices().length > 0) {
      doSpeak()
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', doSpeak, { once: true })
    }
  }

  // Queue without cancelling ongoing speech (for welcome sequences)
  function queue(text: string, opts?: { rate?: number; pitch?: number }) {
    speak(text, { ...opts, interrupt: false })
  }

  function stop() {
    if (isBrowser) window.speechSynthesis.cancel()
  }

  return { speak, queue, stop }
}
