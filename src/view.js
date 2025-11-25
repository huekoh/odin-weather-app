import { getLocationDateTime } from "./utility";

export const addHandlerGetLocationInput = (handler) => {
  const form = document.getElementById("searchbar");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = document.getElementById("location-input").value;
    handler(location);
    form.reset();
  });
};

export const showFormError = (error) => {
  const msg = document.getElementById("error-msg");

  if (error.message.includes("400")) {
    msg.innerText = "Location not found. Please try another.";
  } else if (error.message.includes("403")) {
    msg.innterText = "API key invalid.";
  } else {
    msg.innerText = "Unable to fetch weather. Please try again.";
  }

  msg.style.display = "block";
};

export const hideFormError = () => {
  const error = document.getElementById("error-msg");
  error.style.display = "none";
};

export const renderCurrConditionsData = (location, data, timezone) => {
  const locationText = document.getElementById("location-text");
  const formattedLocation =
    location.charAt(0).toUpperCase() + location.slice(1);
  locationText.innerText = formattedLocation;

  const currTemp = document.getElementById("temp-text");
  currTemp.innerText = data.temp + "°C";

  const currTime = document.getElementById("curr-time");
  const formattedDateTime = getLocationDateTime(timezone);
  currTime.innerText = formattedDateTime;

  const currCondition = document.getElementById("conditions-text");
  currCondition.innerText = data.conditions;

  const currIcon = document.getElementById("curr-icon");
  currIcon.src = `./assets/icons/weather/${data.icon}.png`;

  const currSunrise = document.getElementById("sunrise-text");
  const formattedSunrise = data.sunrise.split(":");
  currSunrise.innerText = `Sunrise: ${formattedSunrise[0]}:${formattedSunrise[1]}`;

  const currSunset = document.getElementById("sunset-text");
  const formattedSunset = data.sunset.split(":");
  currSunset.innerText = `Sunset: ${formattedSunset[0]}:${formattedSunset[1]}`;
};
