import "./styles/global.css";
import * as weather from "./weather";
import * as view from "./view";

const init = () => {
  console.log("Hello to world from controller script");
  weather
    .getWeatherData("London")
    .then((data) => console.log(data))
    .catch((error) => console.error(error));

  const backgroundVideo = document.getElementById("background-vid");
  backgroundVideo.playbackRate = 0.8;
};

init();
