import { pathsToModuleNameMapper } from 'ts-jest/utils';
// import { compilerOptions } from './tsconfig.json';
// Sync object
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  modulePaths: ['src'],
  moduleNameMapper: pathsToModuleNameMapper({
    '/*': ['/*'],
  }),
};
export default config;
