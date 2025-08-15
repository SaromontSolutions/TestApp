// metro.config.cjs
const { getDefaultConfig } = require('@expo/metro-config');
const config = getDefaultConfig(__dirname);

// Stub loadAsync if missing (required for SDK 49+)
if (!config.loadAsync) {
  config.loadAsync = async () => config;
}

module.exports = config;