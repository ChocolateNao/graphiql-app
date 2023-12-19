module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/mock/fileMock.js',
    '\\.(css|less|scss)$': '<rootDir>/tests/mock/styleMock.js',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^layouts/(.*)$': '<rootDir>/src/layouts/$1',
    '^ui/(.*)$': '<rootDir>/src/components/ui/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
    '^api/(.*)$': '<rootDir>/src/api/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^models/(.*)$': '<rootDir>/src/models/$1',
    '^shared/(.*)$': '<rootDir>/src/shared/$1',
    '^store/(.*)$': '<rootDir>/src/store/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  coverageThreshold: {
    global: {
      statements: 80,
    },
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/main.tsx',
    '!tests/mock/*.ts',
  ],
  coverageReporters: ['text'],
};