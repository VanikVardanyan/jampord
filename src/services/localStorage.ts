type LocalStorageKeys = 'isImpersonate' | 'utmIsEmpty'

interface LocalStorageValues {
  isImpersonate?: boolean
  utmIsEmpty?: boolean
}

export const setToStorage = <K extends LocalStorageKeys>(key: K, value: LocalStorageValues[K]): void => {
  const serializedValue = JSON.stringify(value)
  localStorage.setItem(key, serializedValue)
}

export const getFromStorage = <K extends LocalStorageKeys>(key: K): LocalStorageValues[K] | null => {
  const item = localStorage.getItem(key)
  return item ? (JSON.parse(item) as LocalStorageValues[K]) : null
}

export const removeFromStorage = (keys: LocalStorageKeys | LocalStorageKeys[]): void => {
  const keyList = Array.isArray(keys) ? keys : [keys]
  keyList.forEach((key) => localStorage.removeItem(key))
}

export const isInStorage = (key: LocalStorageKeys): boolean => {
  return localStorage.getItem(key) !== null
}

export const clearStorage = (): void => {
  localStorage.clear()
}
