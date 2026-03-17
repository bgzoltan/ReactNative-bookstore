function hasOneDayPassed(timestamp) {
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in 1 day
  const now = new Date().getTime(); // current time in ms
  const time = new Date(timestamp).getTime(); // timestamp in ms

  return now - time >= oneDay;
}

export default function getTheTime(timestamp) {
  const date = new Date(timestamp);
  const minutes = date.getMinutes().toString();
  const time = date.getHours() + ":" + minutes.padStart(2, "0");
  const day = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  if (hasOneDayPassed(timestamp)) {
    return day + " " + time;
  } else {
    return time;
  }
}
