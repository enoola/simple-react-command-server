export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/src/*.test.ts'],
    coveragePathIgnorePatterns: [
        '<rootDir>/src/myClasses'        // type definitions
      ],
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    collectCoverage: true,
    coverageDirectory: 'coverage',
  };