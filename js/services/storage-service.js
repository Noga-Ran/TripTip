export const storageService = {
  saveToStorage,
  loadFromStorage
}

// const STORAGE_KEY = 'locations'
// const WIKI_KEY = 'wiki'

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key);
  return JSON.parse(val);
}