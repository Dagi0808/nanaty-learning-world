export function useAudio() {
  function speak(text: string, opts?: { rate?: number; pitch?: number }) {
    if (!import.meta.client || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.rate = opts?.rate ?? 0.85
    u.pitch = opts?.pitch ?? 1.1
    u.volume = 1
    const voices = window.speechSynthesis.getVoices()
    const voice = voices.find(v => v.lang.startsWith('en') && /female/i.test(v.name))
      || voices.find(v => v.lang.startsWith('en'))
    if (voice) u.voice = voice
    window.speechSynthesis.speak(u)
  }

  function stop() {
    if (import.meta.client) window.speechSynthesis.cancel()
  }

  return { speak, stop }
}
