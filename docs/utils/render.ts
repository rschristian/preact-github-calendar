// @ts-nocheck
import { hydrate } from 'preact';
import { html } from 'htm/preact';
import GitHubCalendar from '../../src/index';

let username = 'rschristian';

const Tile = (props: any) =>
    html`<div class="p-5 bg-code(& dark:dark) rounded-md shadow-md">${props.content}<//>`;

const examples = [
    {
        id: 'calendar-demo',
        options: { showWeekdaysLabels: true },
    },
    {
        id: 'usage-blockMargin',
        options: { blockMargin: 4 },
    },
    {
        id: 'usage-blockSize',
        options: { blockSize: 18 },
    },
    {
        id: 'usage-contributionColorArray',
        options: {
            contributionColorArray: ['#ededed', '#9ba1e9', '#4040c4', '#3030a1', '#21216e'],
        },
    },
    {
        id: 'usage-labelFontSize',
        options: { labelFontSize: 20 },
    },
    {
        id: 'usage-showTooltip',
        options: { showTooltip: false },
    },
    {
        id: 'usage-showWeekdaysLabels',
        options: { showWeekdaysLabels: true },
    },
];

async function hydrateWidget() {
    if (typeof document !== 'undefined') {
        // preact-github-calendar needs to be loaded first as WMR expects
        // last script have a prerender, but this means we need
        // to wait for WMR to hydrate the DOM in dev
        if (import.meta.env.NODE_ENV !== 'production') {
            while (!document.querySelector('#calendar-demo')) {
                await new Promise((r) => setTimeout(r, 250));
            }
        }

        document.getElementById('usernameInput').addEventListener('change', (e) => {
            username = (e.target as HTMLInputElement).value;
            // There's 4 child nodes for an attribute value, [=, ", <username>, "]
            document
                .querySelectorAll('.attr-value')
                .forEach((node) => (node.childNodes[2].nodeValue = username));
            hydrateWidget();
        });

        for (const example of examples) {
            hydrate(
                html`<${Tile}
                    content=${html`<${GitHubCalendar}
                        username=${username}
                        options=${example.options}
                    />`}
                />`,
                document.getElementById(example.id),
            );
        }
    }
}

hydrateWidget();
