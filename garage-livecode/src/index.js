// Fetch garage info from the API
const url = "https://garage.api.lewagon.com/2118/cars";
const carCardContainer = document.querySelector(".cars-list");

const carCardGenerator = (car) => {
  return `
        <div class="car">
          <div class="car-image">
            <img src="https://pollinations.ai/p/${car.brand} ${car.model}?nologo=true" />
          </div>
          <div class="car-info">
            <h4>${car.brand} ${car.model}</h4>
            <p><strong>Owner:</strong> ${car.owner}</p>
            <p><strong>Plate:</strong> ${car.plate}</p>
          </div>
        </div>`;
};

fetch(url)
  // parse the JSON
  .then((response) => response.json())
  .then((data) => {
    // iterate over the array of cars
    data.forEach((car) => {
      // on each iteration, make a car Card with model, brand, owner and number plate interpolated
      const carCard = carCardGenerator(car);
      // insert the car Card into car-list div
      carCardContainer.insertAdjacentHTML("afterbegin", carCard);
    });
  });
