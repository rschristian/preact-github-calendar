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

export default function App() {
    return <GitHubCalendar username="ryanchristian4427" />
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

### contributionCountFontSize
Type: `number`<br/>
Default: `26`

Changes the font size of the total contribution count text. Takes any number.

### fontSize
Type: `number`<br/>
Default: `11`

Changes the font size of the less important text; the link to your profile, the date ranges, etc. Takes any number.

### labelColor
Type: `<color>`<br/>
Default: `#000`

Changes the font color of the month and days of the week labels. Takes any string representation of [`<color>`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). Keywords, RGB(A) and HSL(A) values are all supported.

### labelFontSize
Type: `number`<br/>
Default: `14`

Changes the font size of the month and days of the week labels. Takes any number.

### showWeekdaysLabels
Type: `boolean`<br/>
Default: `false`

Add the week day labels to the left y-axis of your graph. Disabled by default.

## License

MIT © Ryan Christian
