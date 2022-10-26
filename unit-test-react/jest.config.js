module.exports = {
    testingIgnorePatterns: ["/node_modules"],
    setupFilesAfterEnv: [
        "<rootDir>/src/tests/setupTests.ts"
    ],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_module/babel-jest"
    },
    testingEnvironment: 'jsdom'
};
