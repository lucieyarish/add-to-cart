import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
  onValue,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const appSettings = {
  databaseURL:
    'https://realtime-database-e886f-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, 'shoppingList');

const inputFieldEl = document.getElementById('input-field');
const addBtnEl = document.getElementById('add-button');
const shoppingListEl = document.getElementById('shopping-list');

addBtnEl.addEventListener('click', function () {
  let inputValue = inputFieldEl.value;

  push(shoppingListInDB, inputValue);
  clearInput();
});

onValue(shoppingListInDB, function (snapshot) {
  let itemsInDb = Object.values(snapshot.val());

  clearBooksListEl();

  for (let i = 0; i < itemsInDb.length; i++) {
    appendItemToShoppingList(itemsInDb[i]);
  }
});

function clearInput() {
  inputFieldEl.value = '';
}

function clearBooksListEl() {
  shoppingListEl.innerHTML = '';
}

function appendItemToShoppingList(item) {
  shoppingListEl.innerHTML += `
    <li>
        ${item}
    </li>
  `;
}
