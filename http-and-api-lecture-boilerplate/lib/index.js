// TODO: Fetch an activity with the Bored API - Let's pseudocode!
const url = "https://the-fork.api.lewagon.com/api/v1/restaurants";

const button = document.querySelector("#button");
const list = document.querySelector("#restaurants");

// TODO: when clicked on a button, populate the restaurant list with restaurants you get from the API
button.addEventListener("click", (event) => {
  // Make a request using fetch
  const url = "https://the-fork.api.lewagon.com/api/v1/restaurants";
  fetch(url)
    // Parse the JSON response
    .then((response) => response.json())
    .then((data) => {
      // data is now an JS array.
      // Interact with the parsed json,
      // insert list of restaurants into the list

      // iterate over the array
      data.forEach((restaurant) => {
        // on each restaurant object, create a <li>
        const li = document.createElement("li");
        li.innerText = restaurant.name;
        li.classList.add("list-group-item");
        // insert them into the list
        list.appendChild(li);
      });
    });
});
