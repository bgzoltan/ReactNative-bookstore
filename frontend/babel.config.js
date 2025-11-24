module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
          // ⚠️ THIS MUST BE THE LAST PLUGIN IN THE ARRAY
          // "react-native-reanimated/plugin",
        },
      ],
    ],
  };
};
