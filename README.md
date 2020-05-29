# Preact-Github-Calendar
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

<p align="center">
  <img src="https://github.com/ryanchristian4427/preact-github-calendar/blob/master/media/carbon.svg?raw=true">
</p>
<br/><br/>

This is a component to display the GitHub contribution calendar for any given user. The calendar comes with some customization options for making the component better adhere to the style of your application.

## Getting Started

These instructions will get you up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software:

```
Node
NPM/Yarn
```

To install the library, simply run `npm install preact-github-calendar` or `yarn add preact-github-calendar`.

### Running

This library has a single export, that being the component. To display the calendar without any customization, add the follow to your Preact component:

```
<GitHubCalendar username="ryanchristian4427" />
```

`username` is a required prop that is a string of the profile you want to retrieve the calendar for. 

### Options

This library offers a few options now, with more to come in the future. All are entirely optional, no need to provide the `options` prop if you have no wish to customize anything. The defaults match what GitHub displays.

```
{
    labelColor: 'rgba(0, 255, 0, 1)',
    contributionColorArray: ['#ededed', '#62A197', '#428892', '#296887', '#253746'],
}
```

- Label Color
    - `labelColor: '<color>'`
        - Changes the color of the month and days of the week labels. Takes any string representation of `<color>`, the documentation of which can be found [here](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). In short, keywords, RGB(A) and HSL(A) values are all supported.

- Contribution Color Array
    - `contributionColorArray: ['<color>', '<color>', '<color>', '<color>', '<color>']`
        - Changes the color spread in the calendar. The first item in the array replaces the color for least commits, and the last item replaces the color for most commits. Like `labelColor`, keywords, RGB(A) and HSL(A) values are all supported as valid colors.
        

If you have any other options you want to see, let me know.
