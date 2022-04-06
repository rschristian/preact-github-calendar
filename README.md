<h1 align="center">Preact GitHub Calendar</h1>

<div align="center">
    <a href="https://github.com/rschristian/preact-github-calendar/blob/master/LICENSE">
        <img
            alt="NPM"
            src="https://img.shields.io/npm/l/preact-github-calendar?color=brightgreen"
        />
    </a>
</div>

<br />

`preact-github-calendar` is a small (1.3kb brotli) component library used for displaying [a user's contribution calendar from GitHub](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-graphs-on-your-profile/viewing-contributions-on-your-profile#contributions-calendar). This component comes with customization options that you can use for making the component better adhere to the style of your application. Requests for additional customization options are always welcome.

Try out [the demo](https://preact-hint.rschristian.dev/)!

## Install

```
$ yarn add preact-github-calendar
```

## Usage

```jsx
import GitHubCalendar from 'preact-github-calendar';
import 'preact-github-calendar/style.css';

export default function App() {
    return <GitHubCalendar username="rschristian" />;
}
```

## API

All options are entirely optional, no need to provide the `options` prop if you have no wish to customize anything. These only override the defaults; if you like the display, no need to change anything!

### blockMargin

Type: `number`<br/>
Default: `2`

Sets the margin to be used between the blocks in the component. This affects both the vertical and horizontal margins.

### blockSize

Type: `number`<br/>
Default: `12`

Sets the size of the blocks in the component. This affects both the vertical and horizontal dimensions.

### contributionColorArray

Type: `['<color>', '<color>', '<color>', '<color>', '<color>']`<br/>
Default: `['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']`

Changes the color spread in the calendar. The first item in the array replaces the color for least commits, and the last item replaces the color for most commits. Like the `labelColor` option, keywords, RGB(A) and HSL(A) values are all supported as valid colors. Default is GitHub's color scheme.

### labelFontSize

Type: `number`<br/>
Default: `14`

Changes the font size of the month and days of the week labels.

### showTooltip

Type: `boolean`<br/>
Default: `true`

Show a tooltip when hovering over calendar elements. Shows the number of contributions and the date for the element.

### showWeekdaysLabels

Type: `boolean`<br/>
Default: `false`

Add the week day labels to the left axis of the graph.

## License

MIT © Ryan Christian
