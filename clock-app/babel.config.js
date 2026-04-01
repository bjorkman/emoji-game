module.exports = function babelConfig(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: process.env.NODE_ENV !== 'test' ? ['react-native-reanimated/plugin'] : [],
  };
};
