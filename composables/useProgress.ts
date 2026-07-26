const KEY = 'nanaty-progress'

interface State {
  stars: number
  scores: Record<string, number>   // category → 0-100
  completed: Record<string, boolean>
}

function load(): State {
  if (!import.meta.client) return { stars: 0, scores: {}, completed: {} }
  try { return JSON.parse(localStorage.getItem(KEY) || '{}') as State }
  catch { return { stars: 0, scores: {}, completed: {} } }
}

function save(s: State) {
  if (!import.meta.client) return
  localStorage.setItem(KEY, JSON.stringify(s))
  window.dispatchEvent(new Event('progress-updated'))
}

export function useProgress() {
  const getStars = () => load().stars ?? 0

  function addStars(n: number) {
    const s = load()
    s.stars = (s.stars ?? 0) + n
    save(s)
    return s.stars
  }

  function setScore(category: string, pct: number) {
    const s = load()
    s.scores = s.scores ?? {}
    s.scores[category] = pct
    if (pct === 100) {
      s.completed = s.completed ?? {}
      s.completed[category] = true
    }
    save(s)
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

  return { getStars, addStars, setScore, getScore, isCompleted, getAll, reset }
}
