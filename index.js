'use strict';
/* global cuid */
/* global $ */

// change store to an object with an array of the objects inside; this allows us to add a boolean hideCompleted property
const STORE = {
  items: [
    {id: cuid(), name: 'apples', checked: false},
    {id: cuid(), name: 'oranges', checked: false},
    {id: cuid(), name: 'milk', checked: true},
    {id: cuid(), name: 'bread', checked: false}
  ],
  hideCompleted: false
};


function generateItemElement(item) {
  return `
    <li data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item) => generateItemElement(item));
  
  return items.join('');
}


function renderShoppingList() {
  console.log('`renderShoppingList` ran');
  let filteredItems = STORE.items;
  if (STORE.hideCompleted) {
    filteredItems = filteredItems.filter(item => !item.checked);
  }
  const shoppingListItemsString = generateShoppingItemsString(filteredItems);
  $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({id: cuid(), name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    console.log(newItemName);
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });

  console.log('`handleNewItemSubmit` ran');
}

function toggleCheckedForListItem(itemId) {
  console.log('Toggling checked property for item with id ' + itemId);
  const item = STORE.items.find(item => item.id === itemId);
  item.checked = !item.checked;
}

function getItemIdFromElement(item) {
  return $(item)
    .closest('li')
    .data('item-id');
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', function(event) {
    console.log('`handleItemCheckClicked` ran');
    const id = getItemIdFromElement(event.currentTarget);
    toggleCheckedForListItem(id);
    renderShoppingList();
  });

  console.log('`handleItemCheckClicked` ran');
}
function deleteItem(itemId) {
  // create a variable which stores the item's index based on its id
  const itemIndex = STORE.items.findIndex(item => item.id === itemId);
  // this removes the item from the array
  STORE.items.splice(itemIndex, 1);
}


function handleDeleteItemClicked() {
  // use event delegation to target the shopping list, and then more specifically the delete button that is created
  $('.js-shopping-list').on('click', '.js-item-delete', function(event) {
    console.log('`handleDeleteItemClicked` ran');
    // reference the index of the specific item in the STORE array
    const itemIndex = getItemIdFromElement(this);
    // call the delete item function to remove the item from the array
    deleteItem(itemIndex);
    // re-render the shopping list
    renderShoppingList();
  });
}

function toggleHideFilter() {
  STORE.hideCompleted = !STORE.hideCompleted;
}

function handleToggleHideFilter() {
  $('.js-hide-completed-toggle').on('click', () => {
    toggleHideFilter();
    renderShoppingList();
  });
}

// search box
function searchForItem() {
  // this function should take the value entered into the search box and compare it to all elements in the STORE.items array of objects
  const searchItem = $('.js-search-item').val();
  console.log(searchItem);
}

function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleToggleHideFilter();
}


$(handleShoppingList);