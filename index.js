'use strict';

const STORE = [
  {name: 'apples', checked: false},
  {name: 'oranges', checked: false},
  {name: 'milk', checked: true},
  {name: 'bread', checked: false}
];

function generateItemElement(item, itemIndex, template) {
  return `
  <li>${item.name}</li>`;
}

function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');
  const items = shoppingList.map((item, index) => generateItemElement(item, index));

  return items.join('');
}

function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE);
  $('.js-shopping-list').html(shoppingListItemsString);
}

function handleNewItemSubmit() {

  console.log('`handleNewItemSubmit` ran');
}

function handleItemCheckClicked() {

  console.log('`handleItemCheckClicked` ran');
}

function handleDeleteItemClicked() {

  console.log('`handleDeleteItemClicked` ran');
}
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  console.log('`renderShoppingList` ran');
}

$(handleShoppingList);