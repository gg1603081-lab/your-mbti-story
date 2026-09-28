import {
  clearProgress,
  getProgress,
  listResults,
  saveProgress,
  saveResult,
} from "@/lib/quiz.functions";

const DEVICE_KEY = "maum:device";

export function getDeviceId(): string {
  let id = window.localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
}

export async function loadAnswers(): Promise<Record<string, number> | null> {
  try {
    return await getProgress({ data: { deviceId: getDeviceId() } });
  } catch {
    return null;
  }
}

export async function saveAnswers(answers: Record<string, number>) {
  try {
    await saveProgress({ data: { deviceId: getDeviceId(), answers } });
  } catch {
    /* network issue */
  }
}

export async function clearAnswers() {
  try {
    await clearProgress({ data: { deviceId: getDeviceId() } });
  } catch {
    /* network issue */
  }
}

export async function recordResult(typeCode: string, answers: Record<string, number>) {
  try {
    await saveResult({ data: { deviceId: getDeviceId(), typeCode, answers } });
  } catch {
    /* network issue */
  }
}

export async function loadHistory() {
  try {
    return await listResults({ data: { deviceId: getDeviceId() } });
  } catch {
    return [];
  }
}
