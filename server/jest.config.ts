/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/src/__tests__/dotenv-config.ts'],
  testMatch: ['<rootDir>/src/__tests__/*.test.ts'],
  verbose: true,
  forceExit: true,
  // clearMocks: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
