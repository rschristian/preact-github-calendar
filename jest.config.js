const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
    preset: 'jest-preset-preact',
    automock: false,
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.test.json',
        },
    },
    setupFiles: ['<rootDir>/test/setup.ts'],
    transform: {
        ...tsjPreset.transform,
    },
};
