export const state = {
  location: "",
  data: {},
};

export const getWeatherData = async (location) => {
  try {
    const apiKey = process.env.API_KEY;
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=days%2Ccurrent%2Chours&key=${apiKey}&contentType=json`;

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
