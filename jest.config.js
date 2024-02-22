module.exports = {
  testEnvironment: "jest-environment-jsdom",
  // setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.jsx?$': ['babel-jest', {
      presets: ["@babel/preset-env", "@babel/preset-react"]
    }]
  }
};
