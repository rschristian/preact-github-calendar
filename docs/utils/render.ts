// @ts-nocheck
import { render } from 'preact';
import { html } from 'htm/preact';
import { GitHubCalendar } from '../../src/index';

let username = 'rschristian';

const contributionColorArray = {
    contributionColorArray: [
        'var(--cal-0)',
        'var(--cal-1)',
        'var(--cal-2)',
        'var(--cal-3)',
        'var(--cal-4)',
    ],
};

const examples = [
    {
        id: 'calendar-demo',
        options: {
            showWeekdaysLabels: true,
        },
    },
    {
        id: 'usage-contributionColorArray',
        options: {
            contributionColorArray: ['var(--cal-0)', '#9ba1e9', '#4040c4', '#3030a1', '#21216e'],
        },
    },
    {
        id: 'usage-labelFontSize',
        options: {
            labelFontSize: 20,
        },
    },
    {
        id: 'usage-showLabels',
        options: {
            showLabels: false,
        },
    },
    {
        id: 'usage-showTooltip',
        options: {
            showTooltip: false,
        },
    },
];

// WMR requires we load the widget first, but this render script
// expects to find certain elements. We need to lazily initialize it.
(async function () {
    if (typeof document !== 'undefined') {
        if (import.meta.env.NODE_ENV !== 'production') {
            while (!document.querySelector('#calendar-demo')) {
                await new Promise((r) => setTimeout(r, 250));
            }
        }

        document.getElementById('usernameInput').addEventListener('change', (e) => {
            username = e.target.value ? e.target.value : 'rschristian';

            // Updates the username in all the usage code blocks
            document
                .querySelectorAll('.attr-value')
                .forEach((node) => (node.childNodes[2].nodeValue = username));

            renderWidgets();
        });
        renderWidgets();
    }
})();

function renderWidgets() {
    //render(
    //    html`<${GitHubCalendar}
    //        username=${username}
    //        options=${Object.assign({}, contributionColorArray, examples[0].options)}
    //    />`,
    //    document.getElementById(examples[0].id),
    //);

    for (const example of examples) {
        render(
            html`<${GitHubCalendar}
                username=${username}
                options=${Object.assign({}, contributionColorArray, example.options)}
            />`,
            document.getElementById(example.id),
        );
    }
}
