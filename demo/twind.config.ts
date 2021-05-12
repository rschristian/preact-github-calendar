/** @type {import('twind').Configuration} */
export default {
    props: {
        tw: false,
        css: false,
        className: true,
    },
    theme: {
        colors: {
            code: {
                block: '#ddd',
                border: '#aaa',
            },
            green: {
                light: '#48c774',
                DEFAULT: '#40c463',
            },
            steel: {
                dimmer: '#b5b5b5',
                dim: '#ddd',
                DEFAULT: '#ededed',
            },
            white: '#ffffff',
        },
        fontSize: {
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.5rem',
        },
    },
};
