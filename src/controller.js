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

  weather.updateLocation(location);
  weather
    .getWeatherData(location)
    .then((data) => {
      console.log(data);
      view.hideFormError();
    })
    .catch((error) => {
      console.log(error);
      view.showFormError();
    });
};

init();
