const getStorage = (type) => {
  if (type === 'session') {
    return sessionStorage
  }
  return localStorage
}

const setStorageItem = (type, key, value) => {
  const storageType = getStorage(type)
  storageType.setItem(key, value)
}

const getStorageItem = (type, key) => {
  const storageType = getStorage(type)
  return storageType.getItem(key)
}

const removeStorageItem = (type, key) => {
  const storageType = getStorage(type)
  storageType.removeItem(key)
}

export {
  setStorageItem,
  getStorageItem,
  removeStorageItem,
}
