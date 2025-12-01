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
  currTemp.innerText = data.temp + "°C";

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
      precipprobText.innerText = `${value[2]}%`;
      component.appendChild(precipprobText);
      component.classList.add("gap-0p2");
    }

    const tempText = document.createElement("p");
    tempText.classList.add("cream");
    tempText.innerText = `${value[3]}°C`;

    component.appendChild(tempText);

    section.appendChild(component);
  });
};
