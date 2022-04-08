import dedent from 'dedent';

export const install = '$ yarn add preact-github-calendar';

export const generalUsage = dedent`
    import GitHubCalendar from 'preact-github-calendar';
    import 'preact-github-calendar/dist/style.css'

    export default function App() {
        return <GitHubCalendar username="rschristian" />
    }`;

export const optionContributionColorArray =
    '<GitHubCalendar username="rschristian" options={{ contributionColorArray: ["var(--calendar-day-0)", "#9ba1e9", "#4040c4", "#3030a1", "#21216e"] }} />';

export const optionLabelFontSize =
    '<GitHubCalendar username="rschristian" options={{ labelFontSize: 20 }} />';

export const optionShowLabels =
    '<GitHubCalendar username="rschristian" options={{ showLabels: false }} />';

export const optionShowTooltip =
    '<GitHubCalendar username="rschristian" options={{ showTooltip: false }} />';
