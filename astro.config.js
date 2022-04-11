import { defineConfig } from 'astro/config';
import astroPreactTwind from '@rschristian/astro-preact-twind';

// https://astro.build/config
export default defineConfig({
    integrations: [
        astroPreactTwind(),
    ],
    publicDir: './docs/assets',
    srcDir: './docs',
    outDir: './build',
    vite: {
        plugins: [myPlugin()],
    }
});

function myPlugin() {
    return {
        name: 'myPlugin',
        transform(code, id) {
            console.log(id);
        }
    }
}
