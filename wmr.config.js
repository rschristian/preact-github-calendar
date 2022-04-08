import { defineConfig } from 'wmr';

export default defineConfig({
    public: 'docs',
    out: 'build',
    alias: {
        // src is watched by default, and unfortunately
        // Prefresh will trigger a refresh on every file write
        // which is rather obnoxious. We need to break the alias
        // to stop a double refresh (once from write,
        // another from Microbundle output)
        'src/*': 'foo/bar/baz',
    },
});
