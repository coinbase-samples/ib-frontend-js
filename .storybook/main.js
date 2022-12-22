module.exports = {
  stories: [],
  addons: ['@storybook/addon-essentials'],
  typescript: {
    reactDocgen: false
  }
  // uncomment the property below if you want to apply some webpack config globally
  // webpackFinal: async (config, { configType }) => {
  //   // Make whatever fine-grained changes you need that should apply to all storybook configs

  //   // Return the altered config
  //   return config;
  // },
  ,

  docs: {
    docsPage: 'automatic'
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  }
};