import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

const prefix = "cache";
// Stale time
const expiry = 5;

function isExpired(item) {
  const date1 = dayjs(Date.now);
  const date2 = dayjs(item.timeStamp);
  const isExpired = date2.diff(date1, "minutes") > expiry;
  return isExpired;
}

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
