// Listen on click
const button = document.querySelector("button");
button.addEventListener("click", () => {
  // When clicked, choose a random suggested action for the day
  const actions = ["Do laundry", "code 🧑‍💻", "Pitch!🎤", "Get drunk🍻"];

  const randomAction = actions[Math.floor(Math.random() * actions.length)];

  // insert the action into the h1

  const action = document.querySelector("h1");
  action.innerText = randomAction;
});
