import { promises as fs } from 'fs';

(async function rewriteImports() {
    let module = await fs.readFile('docs/dev/preact-github-calendar.js', { encoding: 'utf-8' });
    module = module.replace(/(?<=from")(preact)/g, 'https://cdn.skypack.dev/preact');
    await fs.writeFile('docs/preact-github-calendar.js', module);

    let css = await fs.readFile('docs/dev/preact-github-calendar.css', { encoding: 'utf-8' });
    css = css.replace(/(?<=")(preact)/g, 'https://cdn.skypack.dev/preact');
    await fs.writeFile('docs/preact-github-calendar.css', css);
})();
