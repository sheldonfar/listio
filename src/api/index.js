import { saveAs } from 'file-saver'

export const loadStore = storeName => {
  const serializedState = localStorage.getItem(storeName)

  return JSON.parse(serializedState)
}

export const saveToStore = (storeName, state) => {
  const serializedState = JSON.stringify(state)

  localStorage.setItem(storeName, serializedState)
}

export const removeFromStore = storeName => {
  localStorage.removeItem(storeName)
}

export const importStore = store => {
  Object.keys(store).forEach(key => {
    localStorage.setItem(key, store[key])
  })
}

export const exportStore = () => {
  const blob = new Blob([[JSON.stringify(localStorage)]], { type: 'text/plain;charset=utf-8' })
  saveAs(blob, `[${new Date().toDateString()}] list.json`)
}
