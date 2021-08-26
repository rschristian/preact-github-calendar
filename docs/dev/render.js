import { hydrate } from 'preact';
import { html } from 'htm/preact';
import GitHubCalendar from '../../src/index';

let username = 'rschristian';
document.getElementById('usernameInput').addEventListener('change', (e) => {
    username = e.target.value;
    // There's 4 child nodes for an attribute value, [=, ", <username>, "]
    document
        .querySelectorAll('.attr-value')
        .forEach((node) => (node.childNodes[2].nodeValue = username));
    render();
});

const Tile = (props) => html`<div class="p-5 bg-white rounded-md shadow-md">${props.content}<//>`;

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

function render() {
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

render();
