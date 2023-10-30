import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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
  if (snapshot.exists()) {
    let itemsInDb = Object.entries(snapshot.val());

    clearShoppingListEl();

    for (let i = 0; i < itemsInDb.length; i++) {
      let currentItem = itemsInDb[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];
      appendItemToShoppingList(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = '<p>No items here... yet!</p>';
  }
});

function clearInput() {
  inputFieldEl.value = '';
}

function clearShoppingListEl() {
  shoppingListEl.innerHTML = '';
}

function appendItemToShoppingList(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let newEl = document.createElement('li');
  newEl.textContent = itemValue;

  newEl.addEventListener('click', function () {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);

    remove(exactLocationOfItemInDB);
  });

  shoppingListEl.append(newEl);
}
