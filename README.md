<div align="center">
  <img src="https://github.com/ryanchristian4427/preact-github-calendar/blob/master/media/carbon.svg?raw=true" alt="Preact GitHub Calendar" width="600" />
</div>

<h1 align="center">Preact GitHub Calendar</h1>

<div align="center">
    <a href="https://github.com/RyanChristian4427/preact-github-calendar/blob/master/LICENSE">
        <img alt="NPM" src="https://img.shields.io/npm/l/preact-github-calendar?color=brightgreen">
    </a>
    <a href="https://bundlephobia.com/result?p=preact-github-calendar">
        <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/preact-github-calendar">
    </a>
</div>

<br />

Preact GitHub Calendar is a component library used for displaying a user's contribution calendar from GitHub in a Preact application. This component comes with customization options that you can use for making the component better adhere to the style of your application. Requests for additional customization options are always welcome. 

## Install

```
$ yarn add preact-github-calendar
```

## Usage

```jsx
import GitHubCalendar from "preact-github-calendar";
import 'preact-github-calendar/dist/index.css'

export default function App() {
    return <GitHubCalendar username="rschristian" />
}
```

## API

This library offers a few options now, with more to come in the future. All are entirely optional, no need to provide the `options` prop if you have no wish to customize anything. These only override the defaults; if you like the display, no need to change anything!

### blockMargin
Type: `number`<br/>
Default: `2`

Sets the margin to be used between the blocks in the component. This affects both the vertical and horizontal margins.

### blockSize
Type: `number`<br/>
Default: `12`

Sets the size of the blocks in the component. This affects both the vertical and horizontal dimensions.

### calendarClassName
Type: `string`<br/>
Default: `undefined`

Sets the class name of the root calendar element.

### contributionColorArray
Type: `['<color>', '<color>', '<color>', '<color>', '<color>']`<br/>
Default: `['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']`

Changes the color spread in the calendar. The first item in the array replaces the color for least commits, and the last item replaces the color for most commits. Like `labelColor`, keywords, RGB(A) and HSL(A) values are all supported as valid colors. Default is GitHub's color scheme.

### labelFontSize
Type: `number`<br/>
Default: `14`

Changes the font size of the month and days of the week labels. Takes any number.

### showTooltip
Type: `boolean`<br/>
Default: `true`

Show a tooltip when hovering over calendar elements. Shows the number of contributions and the date for the element.

### showWeekdaysLabels
Type: `boolean`<br/>
Default: `false`

Add the week day labels to the left y-axis of your graph. Disabled by default.

## Styles

<details>
  <summary>Styling is (mostly) customizable by using the stylesheet this library exports. Below is the full CSS file prettified. If you want to customize the tooltip's styling in any way, such as changing the background color, the <a href="https://github.com/rschristian/preact-hint">documentation can be found here</a>.</summary><br />

```
@import '~preact-hint/dist/index.css';

.github-calendar__graph {
  padding: 0.5rem;
}

.github-calendar__graph rect {
  outline: 1px solid rgba(27, 31, 35, 0.04);
  outline-offset: -1px;
}

.github-calendar__graph-label {
  fill: #000;
}

.github-calendar__graph-footer {
  font-size: 11px;
  overflow-y: auto;
}

.github-calendar__graph-legend {
  display: inline-block;
  margin: 0 5px;
  position: relative;
  padding-left: 0;
  bottom: -1px;
}

.github-calendar__graph-legend-item {
  display: inline-block;
  box-shadow: inset 0 0 0 1px rgba(27, 31, 35, 0.04);
  border-radius: 2px;
}

.github-calendar__graph-legend-item:not(:last-child) {
  margin-right: 0.17rem;
}

.github-calendar__footer {
  padding: 15px 10px;
  text-align: center;
  border-top: 1px solid #ddd;
  font-size: 11px;
}

.github-calendar__footer-contribution-count {
  font-weight: 300;
  line-height: 1.3em;
  font-size: 24px;
  display: block;
}

.github-calendar__error {
  text-align: center;
}
```
</details>

## License

MIT © Ryan Christian
