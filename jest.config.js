module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/index.tsx'
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  setupFilesAfterEnv: [
    '<rootDir>/scripts/setupTests.ts'
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx$': 'ts-jest',
    '^.+\\.ts$': 'ts-jest'
  }
}
