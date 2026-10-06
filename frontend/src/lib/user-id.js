const STORAGE_KEY = 'x-user-id';

export function getUserId() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw == null) {
    return null;
  }
  const id = Number(raw);
  if (!Number.isInteger(id) || id < 1) {
    return null;
  }
  return id;
}

export function setUserId(id) {
  localStorage.setItem(STORAGE_KEY, String(id));
}
