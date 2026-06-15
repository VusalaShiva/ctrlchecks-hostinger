module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  forceExit: true,
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts', '**/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: {
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        types: ['node', 'jest'],
      },
    }],
  },
};
