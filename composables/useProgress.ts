const KEY = 'nanaty-progress'

interface State {
  stars: number
  scores: Record<string, number>
  completed: Record<string, boolean>
  streak: number
  lastCompletedDate: string
}

function load(): State {
  if (!import.meta.client) return { stars: 0, scores: {}, completed: {}, streak: 0, lastCompletedDate: '' }
  try { return JSON.parse(localStorage.getItem(KEY) || '{}') as State }
  catch { return { stars: 0, scores: {}, completed: {}, streak: 0, lastCompletedDate: '' } }
}

function save(s: State) {
  if (!import.meta.client) return
  localStorage.setItem(KEY, JSON.stringify(s))
  window.dispatchEvent(new Event('progress-updated'))
}

export function useProgress() {
  const getStars = () => load().stars ?? 0
  const getStreak = () => load().streak ?? 0

  function addStars(n: number) {
    const s = load()
    s.stars = (s.stars ?? 0) + n
    save(s)
    // Fire milestone event so home page / any listener can react
    window.dispatchEvent(new CustomEvent('stars-milestone', { detail: { stars: s.stars } }))
    return s.stars
  }

  function setScore(category: string, pct: number) {
    const s = load()
    s.scores = s.scores ?? {}
    s.scores[category] = pct

    if (pct >= 80) {
      s.completed = s.completed ?? {}
      const wasCompleted = s.completed[category]
      s.completed[category] = true

      // Streak tracking — only increment for new completions
      if (!wasCompleted) {
        const today = new Date().toDateString()
        if (s.lastCompletedDate !== today) {
          s.streak = (s.streak ?? 0) + 1
          s.lastCompletedDate = today
        }
        // Fire streak event
        window.dispatchEvent(new CustomEvent('streak-updated', { detail: { streak: s.streak } }))
      }
    }
    save(s)
  }

  function markCompleted(category: string) {
    setScore(category, 100)
  }

  function getScore(category: string) {
    return load().scores?.[category] ?? 0
  }

  function isCompleted(category: string) {
    return !!load().completed?.[category]
  }

  function getAll() { return load() }

  function reset() {
    if (import.meta.client) localStorage.removeItem(KEY)
    window.dispatchEvent(new Event('progress-updated'))
  }

  return { getStars, getStreak, addStars, setScore, markCompleted, getScore, isCompleted, getAll, reset }
}
