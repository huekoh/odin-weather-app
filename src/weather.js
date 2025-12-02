import { getLocationDateTime } from "./utility";

export const state = {
  location: "London",
  data: {},
};

export const getWeatherData = async (location) => {
  try {
    const apiKey = process.env.API_KEY;
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days%2Ccurrent%2Chours&key=${apiKey}&contentType=json`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    state.data = data;
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const getCurrLocation = () => {
  return state.location;
};

export const updateLocation = (location) => {
  state.location = location;
};

export const getCurrConditionsData = () => {
  return state.data.currentConditions;
};

export const getCurrTimeZone = () => {
  return state.data.timezone;
};

export const getDayDescription = () => {
  return state.data.days[0].description;
};

export const getNextTwentyFourHourlyData = () => {
  const hourlyData = {};

  const timezone = state.data.timezone; // sometimes visual crossing's datetime in curr conditions is not accurate to the hour
  const dateTime = getLocationDateTime(timezone);
  const currHour = +dateTime.find((p) => p.type === "hour")?.value;

  let counter = 0;
  // retrieve data of the hours left of today that is within the next 24h
  for (let h = currHour; h <= 23; h++) {
    const hourData = state.data.days[0].hours[h];
    const icon = hourData.icon;
    const preciProb = hourData.precipprob;
    const temp = hourData.temp;

    hourlyData[counter] = [h, icon, preciProb, temp];
    counter++;
  }

  // retrieve data of the hours left of tomorrow that is within the next 24h
  for (let h = 0; h <= currHour; h++) {
    const hourData = state.data.days[1].hours[h];
    const icon = hourData.icon;
    const preciProb = hourData.precipprob;
    const temp = hourData.temp;

    hourlyData[counter] = [h, icon, preciProb, temp];
    counter++;
  }

  return hourlyData;
};

export const getCurrHumidityData = () => {
  return [
    state.data.currentConditions.humidity,
    state.data.currentConditions.dew,
  ];
};

export const getDaysData = () => {
  const data = [];
  let minTemp = Infinity;
  let maxTemp = -Infinity;

  for (let i = 0; i < 10; i++) {
    minTemp = Math.min(state.data.days[i].tempmin, minTemp);
    maxTemp = Math.max(state.data.days[i].tempmax, maxTemp);

    const dayData = {
      date: state.data.days[i].datetime,
      minTemp: state.data.days[i].tempmin,
      maxTemp: state.data.days[i].tempmax,
      icon: state.data.days[i].icon,
      precipprob: state.data.days[i].precipprob,
    };

    data.push(dayData);
  }

  return [data, minTemp, maxTemp];
};
