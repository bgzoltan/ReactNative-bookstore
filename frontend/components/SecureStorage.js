import * as SecureStore from "expo-secure-store";

export async function saveToken(token) {
  await SecureStore.setItemAsync("accessToken", token);
}

export async function getToken() {
  return await SecureStore.getItemAsync("accessToken");
}

export async function deleteToken() {
  await SecureStore.deleteItemAsync("accessToken");
}
