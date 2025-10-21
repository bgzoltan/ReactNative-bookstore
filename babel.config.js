module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // ⚠️ THIS MUST BE THE LAST PLUGIN IN THE ARRAY
      "react-native-reanimated/plugin",
    ],
  };
};
