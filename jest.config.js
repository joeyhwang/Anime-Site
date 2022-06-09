/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.jest.json',
    }
  },
  roots: [
    "<rootDir>",
    // "/home/some/path/"
  ],
  modulePaths: [
    "<rootDir>",
    // "/home/some/other/path"
  ],
  moduleDirectories: [
    "node_modules"
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(scss|sass|css)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ['./jest.setup.ts']
};