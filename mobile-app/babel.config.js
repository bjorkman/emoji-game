module.exports = function babelConfig(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Reanimated plugin must be excluded in test env — it fails to load in Jest.
    plugins: process.env.NODE_ENV !== 'test' ? ['react-native-reanimated/plugin'] : [],
  };
};
