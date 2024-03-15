module.exports = {
  
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",
      "^.+\\.svg$": "jest-svg-transformer"
      // ".+.(css|scss|png|jpg|svg)$": "jest-transform-stub"
    },
    testEnvironment: 'jsdom',
    // testPathIgnorePatterns: ["client/cypress/"]
  };