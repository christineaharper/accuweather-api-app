// form elements
const input = document.querySelector("#place-input");
const submitBtn = document.querySelector("#submit");

// card elements
const card = document.querySelector("#card");
const cardImg = document.querySelector("#card-img");
const cardIcon = document.querySelector("#card-icon");
const cardLocation = document.querySelector("#card-location");
const cardConditions = document.querySelector("#card-conditions");
const cardTemp = document.querySelector("#card-temp");
const error = document.querySelector(".error");

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weatherDetails = await getWeather(cityDetails.Key);
  return {
    cityDetails,
    weatherDetails,
  };
};

const displayWeather = (data) => {
  // remove display none class from card & add to error if not already there
  card.classList.remove("d-none");
  error.classList.add("d-none");

  const { cityDetails, weatherDetails } = data;

  // show day or night image depending on time of day for location searched
  weatherDetails.IsDayTime
    ? (cardImg.src = "./images/day.svg")
    : (cardImg.src = "./images/night.svg");

  // use the icon information to display weather icon
  cardIcon.src = `./images/icons/${weatherDetails.WeatherIcon}.svg`;

  // set text content for viewing weather details in card
  cardLocation.textContent = cityDetails.LocalizedName;
  cardConditions.textContent = weatherDetails.WeatherText;
  cardTemp.textContent = weatherDetails.Temperature.Metric.Value;
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = input.value.trim();
  input.value = "";

  updateCity(city)
    .then((data) => {
      displayWeather(data);
    })
    .catch((err) => {
      card.classList.add("d-none");
      error.classList.remove("d-none");
    });
});
