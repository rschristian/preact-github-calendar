import dedent from 'dedent';

import { Header } from './core/Header';
import { Footer } from './core/Footer';
import { CodeBlock } from './CodeBlock';
import { Option } from './Option';

import { GitHubCalendar } from '../preact-github-calendar.js';

export function App() {
    return (
        <div class="flex(& col) h-full px-5 text-content(& dark:dark) bg(light:[#f8f8f8] dark:[#272a27])">
            <Header />
            <main class="w-full lg:max-w-4xl flex-1 mb(16 md:32 lg:48) mx-auto">
                <h1 class="mb-2 text(primary(& dark:light) 5xl center lg:left)">
                    Preact GitHub Calendar
                </h1>
                <div class="flex justify(center lg:left) mb-12">
                    <a
                        class="mr-1"
                        href="https://github.com/rschristian/preact-github-calendar/blob/master/LICENSE"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            alt="License: MIT"
                            src="https://img.shields.io/npm/l/preact-github-calendar?color=%2340bf6a"
                            loading="lazy"
                        />
                    </a>
                    <a
                        href="https://npm.im/preact-github-calendar"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            alt="Types: TS"
                            src="https://img.shields.io/npm/types/preact-github-calendar?color=%2340bf6a"
                            loading="lazy"
                        />
                    </a>
                </div>
                <p class="mb-6 text(xl center lg:left)">
                    Preact-GitHub-Calendar is a lightweight and extensible component for{' '}
                    <a
                        class="text-primary(& dark:light hover:hover) underline"
                        href="https://preactjs.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        preact
                    </a>
                    . It was designed to be a more lightweight alternative to the existing React
                    implementations.
                </p>
                <input
                    id="usernameInput"
                    class="w(full lg:2/6) mb-2 p-2 bg-code(& dark:dark) rounded-lg shadow outline-none ring-primary focus:ring"
                    placeholder="Enter a GitHub username"
                />
                <div
                    id="calendar-demo"
                    class="min-h-72 p-5 bg-code(& dark:dark) rounded-md shadow-md"
                >
                </div>

                <h2 class="mt-6 mb-4 text-2xl text-primary">Installation</h2>
                <CodeBlock content="$ yarn add preact-github-calendar" lang="bash" />

                <h2 class="mt-6 mb-4 text-2xl text-primary">General Usage</h2>
                <CodeBlock
                    content={dedent`
                        import GitHubCalendar from 'preact-github-calendar';
                        import 'preact-github-calendar/dist/style.css'
                        export default function App() {
                            return <GitHubCalendar username="rschristian" />
                        }`}
                    lang="jsx"
                />
                <hr class="h-0.5 my-6" />

                <h2 class="mt-6 mb-4 text(primary(& dark:light) 2xl)">API Options</h2>

                <Option
                    name="contributionColorArray"
                    type="['<color>', '<color>', '<color>', '<color>', '<color>']"
                    default="['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']"
                    description="Changes the color spread in the calendar. The first item in the array replaces the color for least commits, and the last item replaces the color for most commits. Like the labelColor option, keywords, RGB(A) and HSL(A) values are all supported as valid colors. Default is GitHub's color scheme."
                    code="<GitHubCalendar username='rschristian' options={{ contributionColorArray: ['var(--calendar-day-0)', '#9ba1e9', '#4040c4', '#3030a1', '#21216e'] }} />"
                    id="usage-contributionColorArray"
                />

                <Option
                    name="labelFontSize"
                    type="number"
                    default="14"
                    description="Changes the font size of the month and days of the week labels."
                    code="<GitHubCalendar username='rschristian' options={{ labelFontSize: 20 }} />"
                    id="usage-labelFontSize"
                />

                <Option
                    name="showLabels"
                    type="boolean"
                    default="true"
                    description="Add calendar month and weekday labels to the axis"
                    code="<GitHubCalendar username='rschristian' options={{ showLabels: false }} />"
                    id="usage-showLabels"
                />

                <Option
                    name="showTooltip"
                    type="boolean"
                    default="true"
                    description="Show a tooltip when hovering over calendar elements. Shows the number of contributions and the date for the element."
                    code="<GitHubCalendar username='rschristian' options={{ showTooltip: false }} />"
                    id="usage-showTooltip"
                />
            </main>
            <Footer />
        </div>
    );
}
