function hasOneDayPassed(timestamp) {
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in 1 day
  const now = new Date().getTime(); // current time in ms
  const time = new Date(timestamp).getTime(); // timestamp in ms

  return now - time >= oneDay;
}

export default function getTheTime(timestamp) {
  const date = new Date(timestamp);
  const time = date.getHours() + ":" + date.getMinutes();
  const day = date.getDay() + 1 + "." + date.getMonth();
  console.log(time, day, timestamp);

  if (hasOneDayPassed(timestamp)) {
    return day;
  } else {
    return time;
  }
}
