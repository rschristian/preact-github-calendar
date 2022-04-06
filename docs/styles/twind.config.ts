import type { Configuration } from 'twind';

const config: Configuration = {
    theme: {
        extend: {
            fontSize: {
                '2xl': '1.5rem',
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
        },
        colors: {
            primary: {
                dark: '#206035',
                DEFAULT: '#40bf6a',
                light: '#9fdfb5',
                hover: '#b3ffc7',
            },
            content: {
                DEFAULT: '#24292f',
                dark: '#ddd',
            },
            card: {
                DEFAULT: '#f3f1f0',
                dark: '#3a4634',
            },
            code: {
                DEFAULT: '#fff',
                inline: '#99a1b3',
                dark: '#181b18',
            },
            white: {
                muted: '#999',
                DEFAULT: '#ffffff',
            },
        },
    },
    variants: {
        light: '@media (prefers-color-scheme:light)',
    },
};

export default config;
