import purgeCss from '@fullhuman/postcss-purgecss';
import nestedCss from 'postcss-nested';

export default {
    webpack(config, env, helpers) {
        const nonModuleStyleLoader = config.module.rules[5];
        nonModuleStyleLoader.sideEffects = true;

        const purgecss = purgeCss({
            content: ['src/**/*.tsx', 'node_modules/preact-hint/dist/*'],
            safelist: ['html', 'body'],
        });

        const postCss = helpers.getLoadersByName(config, 'postcss-loader')[0];
        postCss.loader.options.plugins.push(nestedCss);
        if (env.production) {
            config.output.publicPath = 'https://rschristian.github.io/preact-github-calendar';
            postCss.loader.options.plugins.push(purgecss);
        }
    },
};
