module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/index.tsx'
  ],
  coverageReporters: [
    'clover',
    'json',
    'lcov',
    ['text', { 'skipFull': true }]
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100
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
