<div align="center">
  <img src="https://github.com/ryanchristian4427/preact-github-calendar/blob/master/media/carbon.svg?raw=true" alt="Preact GitHub Calendar" width="600" />
</div>

<h1 align="center">Preact GitHub Calendar</h1>

<div align="center">
    <a href="https://bundlephobia.com/result?p=preact-github-calendar">
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

```js
import GitHubCalendar from "preact-github-calendar";

export default function App() {
    return <GitHubCalendar username="ryanchristian4427" />
}
```

## API

This library offers a few options now, with more to come in the future. All are entirely optional, no need to provide the `options` prop if you have no wish to customize anything. These only override the defaults set by GitHub; if you like the display, no need to change anything!

### Calendar Class Name
Type: `string`<br/>
Default: `undefined`

Sets the class of the root calendar element

### Label Color
Type: `<color>`

Changes the font color of the month and days of the week labels. Takes any string representation of [`<color>`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). Keywords, RGB(A) and HSL(A) values are all supported.

### Show Week Days Label
Type: `boolean`

Stop your calendar from adding week day labels to your graph. Enabled by default.

### Contribution Color Array
Type: `['<color>', '<color>', '<color>', '<color>', '<color>']`

Changes the color spread in the calendar. The first item in the array replaces the color for least commits, and the last item replaces the color for most commits. Like `labelColor`, keywords, RGB(A) and HSL(A) values are all supported as valid colors.

## License

MIT © Ryan Christian
