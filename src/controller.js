import "./styles/global.css";
import * as weather from "./weather";
import * as view from "./view";

const init = () => {
  console.log("Hello to world from controller script");

  const backgroundVideo = document.getElementById("background-vid");
  backgroundVideo.playbackRate = 0.8;

  // initialise handlers
  view.addHandlerGetLocationInput(getLocationInputHandler);
};

const getLocationInputHandler = (location) => {
  const currWeather = weather.getCurrLocation();
  if (location === currWeather) {
    return;
  }
  weather.updateLocation(location);
  weather
    .getWeatherData(location)
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};

init();
