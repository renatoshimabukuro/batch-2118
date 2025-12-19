import numberFlow from "https://cdn.jsdelivr.net/npm/number-flow@0.5.8/+esm";

let map;
const markers = [];

const displayCoordinates = (longitude, latitude) => {
  // TODO #6: Insert the coordinates into the DOM
  // - Display the coordinates in the element where the coordinates will be displayed
  const p = document.querySelector("p.font-monospace");
  const lon = p.querySelector("#lon");
  const lat = p.querySelector("#lat");

  lon.update(longitude);
  lat.update(latitude);
};

const injectMap = (lng, lat) => {
  markers.forEach((marker) => {
    marker.remove();
  });
  // TODO #5: Create the map
  // - Create a map using the Mapbox API
  // - Add a marker to the map at the coordinates
  const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
  markers.push(marker);
  map.flyTo({ center: [lng, lat], zoom: 12 });
};

const showMapAndCoordinates = (userInput) => {
  // TODO #3: Construct the URL (with apiKey & userInput)
  // and make the fetch request to the mapbox API
  const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${userInput}&access_token=pk.eyJ1Ijoic2Nvb3Rlci1zY29vdGVyIiwiYSI6ImNtZGlmMWxtcDA4d2syaXBrN3Q2YjF0cjkifQ.1FEe7X5iXo2uiUy0bDy8mg`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // TODO #4: Extract the coordinates from the parsed JSON response (longitude, latitude)
      const coordinates = data.features[0].properties.coordinates;
      const location = data.features[0].properties.name_preferred;
      // Use these coordinates to call the displayCoordinates and injectMap functions
      displayCoordinates(coordinates.longitude, coordinates.latitude);
      injectMap(coordinates.longitude, coordinates.latitude);
      fetchWeather(coordinates.longitude, coordinates.latitude, location);
    });
};

// ### ### ### ### ###
// ### START HERE! ###
// ### ### ### ### ###
// TODO #1: Select the form element
const form = document.querySelector("form.d-flex.my-5");
// TODO #2: Add event listener to the form that:
form.addEventListener("submit", (event) => {
  // - Prevents the default form submission behavior
  event.preventDefault();
  // - Gets the user input
  const address = form.querySelector("#address").value;
  // - Calls the showMapAndCoordinates function with the userInput (it should be a string!) as an argument
  showMapAndCoordinates(address);
});

const fetchWeather = (lon, lat, location) => {
  // TODO: Replace the following line with the correct url
  // TODO: prevent default behavior of the form
  const url = `https://api.openweathermap.org/data/3.0/onecall?units=metric&lat=${lat}&lon=${lon}&appid=4ca58a82617699e13ed0a3397f28b1d9`;

  const card = document.querySelector("div.card");
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      card.querySelector("#body").classList.remove("d-none");
      card.querySelector("#placeholder").classList.add("d-none");
      card.querySelector("#city").innerText = location;
      card.querySelector("#date").innerText = formatDate(data.timezone_offset);
      card.querySelector("#temperature").innerText = `${data.current.temp} ℃`;
      card.querySelector("#description").innerText =
        data.current.weather[0].description;
      card.querySelector(
        "#icon"
      ).attributes.src.value = `https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`;
    });
};

const formatDate = (timezone) => {
  const today = new Date();
  const localOffset = timezone + today.getTimezoneOffset() * 60;
  console.log(today.setUTCSeconds(localOffset));
  const localDate = new Date(today.setUTCSeconds(localOffset));
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formattedDate = localDate.toLocaleDateString("en-US", options);
  return formattedDate;
};

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2Nvb3Rlci1zY29vdGVyIiwiYSI6ImNtZGlmMWxtcDA4d2syaXBrN3Q2YjF0cjkifQ.1FEe7X5iXo2uiUy0bDy8mg";
map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v9",
  center: [139.692526, 35.68882],
  zoom: 12,
});
