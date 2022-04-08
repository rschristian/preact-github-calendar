import dedent from 'dedent';

export const install = '$ yarn add preact-github-calendar';

export const generalUsage = dedent`
    import GitHubCalendar from 'preact-github-calendar';
    import 'preact-github-calendar/dist/style.css'

    export default function App() {
        return <GitHubCalendar username="rschristian" />
    }`;

export const optionBlockMargin =
    '<GitHubCalendar username="rschristian" options={{ blockMargin: 4 }} />';

export const optionBlockSize =
    '<GitHubCalendar username="rschristian" options={{ blockSize: 18 }} />';

export const optionContributionColorArray =
    '<GitHubCalendar username="rschristian" options={{ contributionColorArray: ["var(--calendar-day-0)", "#9ba1e9", "#4040c4", "#3030a1", "#21216e"] }} />';

export const optionLabelFontSize =
    '<GitHubCalendar username="rschristian" options={{ labelFontSize: 20 }} />';

export const optionShowTooltip =
    '<GitHubCalendar username="rschristian" options={{ showTooltip: false }} />';

export const optionShowWeekdaysLabels =
    '<GitHubCalendar username="rschristian" options={{ showWeekdaysLabels: true }} />';
