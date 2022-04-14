// accuweather api key
const key = "ENTER API KEY HERE";

//get city api call
const getCity = async (city) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const cityData = await response.json();
  return cityData[0];
};

// get current weather based on location key
const getWeather = async (locationKey) => {
  const base = `http://dataservice.accuweather.com/currentconditions/v1/`;
  const query = `${locationKey}?apikey=${key}`;

  const response = await fetch(base + query);
  const weatherData = await response.json();
  return weatherData[0];
};
