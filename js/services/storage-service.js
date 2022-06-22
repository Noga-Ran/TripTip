'use strict';

const STORAGE_KEY = 'videos'
const WIKI_KEY = 'wiki'

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key);
  return JSON.parse(val);
}