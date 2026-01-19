import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

// Cache the api data for some time to reduce network requests
const prefix = "cache";
// Stale time
const expiry = 2; // minutes

function isExpired(item) {
  // Date format: 2020-01-19T04:52:23.408Z
  const date1 = dayjs(Date.now());
  const date2 = dayjs(item.timeStamp);

  // Check if the difference in minutes is greater than expiry time
  const isExpired = Math.abs(date2.diff(date1, "minutes")) > expiry;
  return isExpired;
}

// Store data in cache with timestamp
async function store(key, value) {
  try {
    const item = {
      value,
      timeStamp: Date.now(),
    };

    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (err) {
    console.log("Cache error", err);
  }
}

// Retrieve data from cache if not expired
async function get(key) {
  try {
    const result = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(result);

    if (!item) {
      return null;
    }
    if (isExpired(item)) {
      // Command Query Separation is violated!!! but in this case it is not a big issue
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }
    return item.value;
  } catch (err) {}
}

// For debugging: Get all cached items
const getAll = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    console.log("Async storage dump >>>>", result);
  } catch (err) {
    console.log("Error", err);
  }
};

export default {
  store,
  get,
  getAll,
};
