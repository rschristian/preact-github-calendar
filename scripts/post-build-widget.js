import { promises as fs } from 'node:fs';

// WMR cannot handle CSS imports (@import) from node_modules
// so we have to strip that out.
(async function removeCssImport() {
    let css = await fs.readFile('docs/preact-github-calendar.css', 'utf-8');
    css = css.replace(/@[^;]*;/, '');
    await fs.writeFile('docs/preact-github-calendar.css', css);
})();
