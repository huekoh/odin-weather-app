import "./styles/global.css";
import * as weather from "./weather";
import * as view from "./view";
import { getLocationDateTime, formatFullDateTime } from "./utility";

const init = () => {
  console.log("Hello to world from controller script");

  const backgroundVideo = document.getElementById("background-vid");
  backgroundVideo.playbackRate = 0.8;

  view.addHandlerGetLocationInput(getLocationInputHandler);

  // initial page load up
  weather
    .getWeatherData(weather.getCurrLocation())
    .then(() => updatePageDataHandler())
    .catch((error) => {
      console.log("Initial data fetch unsuccessful:", error);
    });
};

const getLocationInputHandler = async (location) => {
  try {
    weather.updateLocation(location);
    const data = await weather.getWeatherData(location);

    DataFetchSuccessHandler(data);
  } catch (error) {
    DataFetchErrorHandler(error);
  }
};

const DataFetchSuccessHandler = (data) => {
  console.log(data);
  view.hideFormError();
  weather.updateLocation(data.resolvedAddress);
  updatePageDataHandler();
};

const DataFetchErrorHandler = (error) => {
  console.log(error);
  view.showFormError(error);
};

const updatePageDataHandler = () => {
  const currLocation = weather.getCurrLocation();
  const currTimeZone = weather.getCurrTimeZone();
  const dateTime = getLocationDateTime(currTimeZone);
  const formattedDateTime = formatFullDateTime(dateTime);
  const currConditionsData = weather.getCurrConditionsData();
  const dayDescription = weather.getDayDescription();
  const currHumidity = weather.getCurrHumidityData();
  const currPrecip = weather.getPrecipData();
  const currUv = weather.getUvData();
  const currWind = weather.getWindData();

  const hourlyData = weather.getNextTwentyFourHourlyData();
  const daysData = weather.getDaysData();

  view.renderCurrConditionsData(
    currLocation,
    currConditionsData,
    formattedDateTime,
    dayDescription
  );
  view.renderHourlyData(hourlyData);
  view.renderDaysData(daysData);
  view.renderHumidityData(currHumidity);
  view.renderPrecipData(currPrecip);
  view.renderUvData(currUv);
  view.renderWindData(currWind);
};

init();
