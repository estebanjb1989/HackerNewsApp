module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          src: './src',
          '@view': './src/view',
          '@store': './src/store',
          '@interfaces': './src/interfaces',
          '@img': './src/img',
          '@component': './src/component',
          '@lib': './src/lib',
        },
      },
    ],
  ],
};
