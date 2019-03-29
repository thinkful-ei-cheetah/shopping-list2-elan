// To complete this challenge requires:

// Using DOM manipulation and traversal to dynamically add and remove HTML elements and apply styles.
// *Linking to an externally hosted library (jQuery) and a locally hosted JavaScript file (index.js).
// *Linking to your application JavaScript file from the index.html page.
// Using this and event delegation
// Requirements

// In terms of user experience, your shopping list app must allow users to:

// *enter items they need to purchase by entering text and hitting "Return" or clicking the "Add item" button
// check and uncheck items on the list by clicking the "Check" button
// permanently remove items from the list
// Additionally:

// *You must use a CDN-hosted version of jQuery
// *Put your application code in a file called index.js and link to it in index.html
// *Be sure to put both script elements at the bottom of the <body> element.
// *Do not alter index.html or main.css other than adding the links to the external JavaScript inside index.html. Write JavaScript code that works with the existing HTML and CSS to implement the required features.
// Hint: you may find it helpful to read up on and use the following jQuery methods: .submit(), preventDefault(), toggleClass(), and closest().

function buildListItem(item) {
  return `<li>
  <span class="shopping-item">${item}</span>
  <div class="shopping-item-controls">
    <button class="shopping-item-toggle">
      <span class="button-label">check</span>
    </button>
    <button class="shopping-item-delete">
      <span class="button-label">delete</span>
    </button>
  </div>
</li>`;
}

function main() {
  $("#js-shopping-list-form").on("submit", function(event) {
    event.preventDefault();
    const inputValue = $("input").val();
    const newListItem = buildListItem(inputValue);
    $(".shopping-list").append(newListItem);
  });

  $("ul").on("click", ".shopping-item-delete", function(event) {
    event.currentTarget.closest("li").remove();
  });

  $("ul").on("click", ".shopping-item-toggle", function(event) {
    let element = this.closest("div");

    $(element)
      .siblings()
      .toggleClass("shopping-item__checked");
  });
}

$(main);
