// select the grid
const grid = document.querySelector("#cardsContainer");
// select template
const cardTemplate = document.querySelector("#cardTemplate");

// Call the API https://pokeapi.co/api/v2/pokemon
// Console.log the data

fetch("https://pokeapi.co/api/v2/pokemon")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Iterate over the results array
    data.results.forEach((pokemon) => {
      // On each iteration
      // do a fetch to get a detailed information of the pokemon
      fetch(pokemon.url)
        .then((response) => response.json())
        .then((info) => {
          // Clone the template
          const clone = cardTemplate.content.cloneNode(true);
          // In the cloned template, insert name,
          clone.querySelector("h2").textContent = pokemon.name;
          // insert image source
          // console.log(info);
          clone.querySelector("img").src = info.sprites.back_shiny;

          // Get types of the pokemon
          // Map types object array into strings of types
          // ['grass', 'flying'].join(', ')
          // Combine them with a comma in between (#join)
          // Insert them into the p tag
          clone.querySelector("p").textContent = info.types
            .map((typeObject) => typeObject.type.name)
            .join(", ");

          // Insert the card into the grid
          grid.appendChild(clone);
        });
    });
  });
