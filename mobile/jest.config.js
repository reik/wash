const preset = require('jest-expo/jest-preset');

/** @type {import('jest').Config} */
module.exports = {
  ...preset,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: [
    '/node_modules/(?!(.pnpm|react-native|@react-native|@react-native-community|expo|@expo|@expo-google-fonts|react-navigation|@react-navigation|@sentry/react-native|native-base|standard-navigation|msw|@mswjs|until-async|outvariant|strict-event-emitter|headers-polyfill))',
    '/node_modules/react-native-reanimated/plugin/',
    '/node_modules/@react-native/babel-preset/',
  ],
};
