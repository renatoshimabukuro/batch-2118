// Step 3
// Listen for a submission
// Select the correct elements

// Select the submit  form
const giftForm = document.querySelector(".gift-form");
// Select the name and price
// querySelector with id - #, class - .cssClassName
const nameInput = document.querySelector("#name");
// const name = document.getElementById("name");
const priceInput = document.querySelector("#price");
const giftList = document.querySelector(".gift-list");

// Step 4 Updating the list
// Listen to the form submission (add an event listener)
giftForm.addEventListener("submit", (event) => {
  // Prevent the default behaviour
  event.preventDefault();
  // Get the nameInput and priceInput Values
  const name = nameInput.value;
  const price = priceInput.value;
  console.log(name, price);
  // create an li element for the new item
  const li = document.createElement("li");
  li.textContent = `${name} - ${price}`;
  console.log(li);
  // append to the list
  giftList.appendChild(li);
  nameInput.value = "";
  priceInput.value = "";
});

// Function to remove item from the ideas list and add it to the main list
const handleSearchListItemClick = (itemData) => {
  // Create a new list item for the main gift list
  const newListItem = document.createElement("li");
  newListItem.textContent = `${itemData.title} - €${itemData.price}`;
  newListItem.classList.add("gift-item");

  // Add it to the gift list
  giftList.appendChild(newListItem);
};

// Step 5 - Searching for ideas (fetch API)
// Select the search form
const searchForm = document.querySelector(".search-form");
const searchList = document.querySelector(".search-list");
// Get the option value (category)
// Fetching the api including the search value
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const categorySelect = document.querySelector("#search-input");
  console.log(categorySelect);
  const apiURL = `https://fakestoreapi.com/products/category/${categorySelect.value}`;
  console.log(apiURL);

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((item) => {
        const listItemContainer = document.createElement("div");
        listItemContainer.classList.add(
          "d-flex",
          "align-items-center",
          "justify-content-center",
          "w-100",
          "mx-2",
          "py-2",
          "col-lg-7"
        );
        const listItem = document.createElement("li");
        listItem.textContent = `${item.title} - €${item.price}`;
        const addButton = document.createElement("button");
        addButton.textContent = "Add";
        // Pass the data directly to the click handler
        addButton.addEventListener("click", () =>
          handleSearchListItemClick(item)
        );
        addButton.classList.add(
          "btn",
          "btn-info",
          "btn-sm",
          "ms-2",
          "text-white"
        );

        listItemContainer.appendChild(listItem);
        listItemContainer.appendChild(addButton);

        // Append the list item to the search list
        searchList.appendChild(listItemContainer);
      });
    });
});
