const isBrowser = typeof window !== 'undefined'

export function useAudio() {
  function speak(text: string, opts?: { rate?: number; pitch?: number; interrupt?: boolean }) {
    if (!isBrowser || !window.speechSynthesis) return

    // Only cancel ongoing speech if explicitly interrupting (user tapped something)
    // Default: queue the speech so welcome scripts don't cut each other off
    if (opts?.interrupt !== false) {
      window.speechSynthesis.cancel()
    }

    const u = new SpeechSynthesisUtterance(text)
    u.rate = opts?.rate ?? 0.85
    u.pitch = opts?.pitch ?? 1.1
    u.volume = 1

    // Wait for voices to be loaded (especially on Chrome)
    const setVoice = () => {
      const voices = window.speechSynthesis.getVoices()
      const voice = voices.find(v => v.lang.startsWith('en') && /female/i.test(v.name))
        || voices.find(v => v.lang.startsWith('en'))
      if (voice) u.voice = voice
    }

    const voices = window.speechSynthesis.getVoices()
    if (voices.length > 0) {
      setVoice()
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', setVoice, { once: true })
    }

    window.speechSynthesis.speak(u)
  }

  // Queue speech without cancelling current speech
  function queue(text: string, opts?: { rate?: number; pitch?: number }) {
    speak(text, { ...opts, interrupt: false })
  }

  function stop() {
    if (isBrowser) window.speechSynthesis.cancel()
  }

  return { speak, queue, stop }
}
