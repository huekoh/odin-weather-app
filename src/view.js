export const addHandlerGetLocationInput = (handler) => {
  const form = document.getElementById("searchbar");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = document.getElementById("location-input").value;
    handler(location);
    form.reset();
  });
};
