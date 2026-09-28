const KEY = "maum:answers";

export function saveAnswers(answers: Record<string, number>) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(answers));
  } catch {
    /* storage unavailable */
  }
}

export function loadAnswers(): Record<string, number> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null
      ? (parsed as Record<string, number>)
      : null;
  } catch {
    return null;
  }
}

export function clearAnswers() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {
    /* storage unavailable */
  }
}
