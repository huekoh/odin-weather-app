import "./styles/global.css";
import * as weather from "./weather";
import * as view from "./view";

const init = () => {
  console.log("Hello to world from controller script");
  weather
    .getWeather("Singapore")
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};

init();
