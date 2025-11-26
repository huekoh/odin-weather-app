export const state = {
  location: "Singapore",
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

export const getNextTwentyFourHourlyData = () => {
  const hourlyData = {};
  // get the current hour (convert to int)
  const currHour = +state.data.currentConditions.datetime.split(":")[0];

  let counter = 0;
  // retrieve data of the hours left of today that is within the next 24h
  for (let h = currHour; h <= 23; h++) {
    const hourData = state.data.days[0].hours[h];
    const icon = hourData.icon;
    const preciProb = hourData.preciprob;
    const temp = hourData.temp;

    hourlyData[counter] = [h, icon, preciProb, temp];
    counter++;
  }

  // retrieve data of the hours left of tomorrow that is within the next 24h
  for (let h = 0; h <= currHour; h++) {
    const hourData = state.data.days[1].hours[h];
    const icon = hourData.icon;
    const preciProb = hourData.preciprob;
    const temp = hourData.temp;

    hourlyData[counter] = [h, icon, preciProb, temp];
    counter++;
  }

  console.log(hourlyData);
  return hourlyData;
};
