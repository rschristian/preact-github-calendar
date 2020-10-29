module.exports = {
    preset: 'jest-preset-preact',
    automock: false,
    collectCoverageFrom: ['src/*.tsx'],
    setupFiles: ['<rootDir>/test/setup.ts'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
};
