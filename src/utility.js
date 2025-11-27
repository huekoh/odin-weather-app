export const getLocationDateTime = (timeZone) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const dateTime = formatter.formatToParts(new Date());
  return dateTime;
};

export const formatFullDateTime = (dateTime) => {
  const weekday = dateTime.find((p) => p.type === "weekday")?.value || "";
  const day = dateTime.find((p) => p.type === "day")?.value || "";
  const month = dateTime.find((p) => p.type === "month")?.value || "";
  const hour = dateTime.find((p) => p.type === "hour")?.value || "";
  const minute = dateTime.find((p) => p.type === "minute")?.value || "";

  return `${weekday} ${day} ${month}, ${hour}:${minute}`;
};
