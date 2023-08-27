module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './app/components/index.ts',
          '@screens': './app/screens/index.ts',
          '@navigators': './app/navigators/index.ts',
          '@utils': './app/utils/index.ts',
        },
      },
    ],
  ],
};
