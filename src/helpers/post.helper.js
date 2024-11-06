const getPostTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  const diffInDays = Math.floor(diffInSeconds / 86400);

  if (diffInDays > 7) {
    const options = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options).replace(",", " at");
  }

  const units = [
    { name: "year", seconds: 31536000 },
    { name: "month", seconds: 2592000 },
    { name: "day", seconds: 86400 },
    { name: "hour", seconds: 3600 },
    { name: "minute", seconds: 60 },
    { name: "second", seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(diffInSeconds / unit.seconds);
    if (interval >= 1) {
      if (unit.name === "second" && interval < 60) {
        return interval === 1 ? "just now" : `${interval} seconds ago`;
      }
      if (interval === 1) {
        return `one ${unit.name} ago`;
      }
      return `${interval} ${unit.name}s ago`;
    }
  }

  return "just now";
};

export { getPostTime };
