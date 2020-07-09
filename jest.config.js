const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
    preset: 'jest-preset-preact',
    automock: false,
    setupFiles: ['<rootDir>/tests/setup.js'],
    transform: {
        ...tsjPreset.transform,
    },
};
