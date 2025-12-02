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

export const renderCurrConditionsData = (
  location,
  data,
  formattedDateTime,
  description
) => {
  const locationText = document.getElementById("location-text");
  const formattedLocation =
    location.charAt(0).toUpperCase() + location.slice(1);
  locationText.innerText = formattedLocation;

  const currTemp = document.getElementById("temp-text");
  currTemp.innerText = Math.round(data.temp) + "°C";

  const currTime = document.getElementById("curr-time");
  currTime.innerText = formattedDateTime;

  const currCondition = document.getElementById("conditions-text");
  currCondition.innerText = description;

  const currIcon = document.getElementById("curr-icon");
  currIcon.src = `./assets/icons/weather/${data.icon}.png`;

  const currSunrise = document.getElementById("sunrise-text");
  const formattedSunrise = data.sunrise.split(":");
  currSunrise.innerText = `Sunrise: ${formattedSunrise[0]}:${formattedSunrise[1]}`;

  const currSunset = document.getElementById("sunset-text");
  const formattedSunset = data.sunset.split(":");
  currSunset.innerText = `Sunset: ${formattedSunset[0]}:${formattedSunset[1]}`;
};

export const renderHourlyData = (data) => {
  const section = document.getElementById("hours-data-cards");
  section.innerHTML = "";
  Object.values(data).forEach((value, index) => {
    const component = document.createElement("div");
    component.classList.add("hour-component");

    const hourText = document.createElement("p");
    hourText.classList.add("cream");
    if (index === 0) {
      hourText.innerText = "Now";
    } else {
      const hour = value[0];

      if (hour < 12) {
        hourText.innerText = `${hour === 0 ? 12 : hour}AM`;
      } else {
        const formattedHour = hour - 12;
        hourText.innerText = `${formattedHour === 0 ? 12 : formattedHour}PM`;
      }
    }

    component.appendChild(hourText);

    const iconDiv = document.createElement("div");
    iconDiv.classList.add("icon-div-med");
    const icon = document.createElement("img");
    icon.classList.add("icon");
    icon.src = `./assets/icons/weather/${value[1]}.png`;
    icon.alt = "weather icon";
    iconDiv.appendChild(icon);

    component.appendChild(iconDiv);

    if (value[2] !== 0 && !value[1].includes("clear")) {
      const precipprobText = document.createElement("p");
      precipprobText.classList.add("blue");
      precipprobText.classList.add("text-sm");
      precipprobText.innerText = `${Math.round(value[2])}%`;
      component.appendChild(precipprobText);
      component.classList.add("gap-0p2");
    }

    const tempText = document.createElement("p");
    tempText.classList.add("cream");
    tempText.innerText = `${Math.round(value[3])}°C`;

    component.appendChild(tempText);

    section.appendChild(component);
  });
};

export const renderHumidityData = (data) => {
  const humidityText = document.getElementById("humidity-text");
  const dewText = document.getElementById("dew-text");

  humidityText.innerText = `${Math.round(data[0])}%`;
  dewText.innerText = `The dew point is now ${data[1]}°`;
};

export const renderPrecipData = (data) => {};

export const renderDaysData = (data) => {
  const section = document.getElementById("day-data-cards");
  section.innerHTML = "";

  const days = data[0];
  days.forEach((day, index) => {
    const component = createDayComponent(day, index);
    section.appendChild(component);
  });
};

const createDayComponent = (data, index) => {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const component = document.createElement("div");
  component.classList.add("day-component");

  const date = new Date(data.date);
  const dayOfWeek = date.getDay();
  const dayText = document.createElement("p");
  dayText.classList.add(
    "cream",
    "text-med",
    "weight-med",
    "width-55px",
    "text-center"
  );
  dayText.innerText = index === 0 ? "Today" : `${dayNames[dayOfWeek]}`;

  const iconDiv = document.createElement("div");
  iconDiv.classList.add("icon-div-small");
  const icon = document.createElement("img");
  icon.classList.add("icon");
  icon.src = `./assets/icons/weather/${data.icon}.png`;
  icon.alt = "weather icon";
  iconDiv.appendChild(icon);

  const tempDisplay = document.createElement("div");
  tempDisplay.classList.add("temp-display", "flex", "gap-0p6", "align-center");

  const tempBar = document.createElement("div");
  tempBar.classList.add("temp-bar");
  const bar = document.createElement("div");
  bar.classList.add("bar");
  tempBar.appendChild(bar);
  const minTemp = document.createElement("p");
  minTemp.classList.add(
    "cream-95",
    "text-med",
    "weight-med",
    "width-55px",
    "text-center"
  );
  minTemp.innerText = `${Math.round(data.minTemp)}°C`;
  const maxTemp = document.createElement("p");
  maxTemp.classList.add(
    "cream-95",
    "text-med",
    "weight-med",
    "width-55px",
    "text-center"
  );
  maxTemp.innerText = `${Math.round(data.maxTemp)}°C`;

  tempDisplay.append(minTemp, tempBar, maxTemp);

  component.append(dayText, iconDiv, tempDisplay);
  return component;
};
