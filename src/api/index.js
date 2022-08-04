export const loadStore = (storeName) => {
  const serializedState = localStorage.getItem(storeName)

  return JSON.parse(serializedState)
}

export const saveToStore = (storeName, state) => {
  const serializedState = JSON.stringify(state)

  localStorage.setItem(storeName, serializedState)
}

export const removeFromStore = (storeName) => {
  localStorage.removeItem(storeName);
}