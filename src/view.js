export const addHandlerGetLocationInput = (handler) => {
  const form = document.getElementById("searchbar");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = document.getElementById("location-input").value;
    handler(location);
    form.reset();
  });
};

export const showFormError = () => {
  const error = document.getElementById("error-msg");
  error.style.display = "block";
};

export const hideFormError = () => {
  const error = document.getElementById("error-msg");
  error.style.display = "none";
};
