import { Fragment, h, VNode } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import 'bulma/css/bulma.css';

import GitHubCalendar from '../src';
import { Tile } from './Components/Tile';
import { UsageOption } from './Components/UsageOption';
import { useDebouncedCallback } from './debounce';
import './style.css';

export default function App(): VNode {
    const [username, setUsername] = useState<string>('rschristian');
    const debouncedSetUsername = useDebouncedCallback((value: string) => setUsername(value), 650);

    useEffect(() => username === '' && setUsername('rschristian'), [username]);

    return (
        <div id="app">
            <section class="hero">
                <div class="hero-body">
                    <div class="container has-text-centered">
                        <h2 class="is-size-2 has-text-weight-bold">preact-github-calendar</h2>
                        <h6 class="is-size-6">
                            Lightweight and extensible component to display the contribution calendar for a GitHub user
                        </h6>
                        <a class="button" href="https://github.com/rschristian/preact-github-calendar">
                            Check it out on GitHub
                        </a>
                    </div>
                </div>
            </section>
            <div class="section main-content">
                <div class="container">
                    <h3 class="is-size-3">Preact GitHub Calendar</h3>
                    <div class="shields mt-1">
                        <a href="https://github.com/rschristian/preact-github-calendar/blob/master/LICENSE">
                            <img
                                alt="NPM"
                                src="https://img.shields.io/npm/l/preact-github-calendar?color=brightgreen"
                            />
                        </a>
                        <a href="https://bundlephobia.com/result?p=preact-github-calendar">
                            <img
                                alt="npm bundle size"
                                src="https://img.shields.io/bundlephobia/minzip/preact-github-calendar?color=brightgreen"
                            />
                        </a>
                        <a href="https://npmjs.org/package/preact-github-calendar">
                            <img
                                alt="TS Support"
                                src="https://img.shields.io/npm/types/preact-github-calendar?color=brightgreen"
                            />
                        </a>
                    </div>
                    <div class="mt-2 mb-5">
                        Preact-GitHub-Calendar is a lightweight and extensible component for{' '}
                        <a href="https://preactjs.com">Preact</a>. It was designed to be a more lightweight alternative
                        to the existing React implementations.
                    </div>
                    <input
                        className="input is-success"
                        type="text"
                        placeholder="Enter a GitHub username"
                        onInput={(e): void => debouncedSetUsername((e.target as HTMLInputElement).value)}
                    />
                    <Tile
                        content={
                            <Fragment>
                                <GitHubCalendar username={username} options={{ showWeekdaysLabels: true }} />
                            </Fragment>
                        }
                    />
                    <h4 class="is-size-4 mt-5 mb-2">Installation</h4>
                    <pre>
                        <code>yarn add preact-github-calendar</code>
                    </pre>
                    <h4 class="is-size-4 mt-5 mb-2">General Usage</h4>
                    <pre>
                        <code>{`import GitHubCalendar from "preact-github-calendar";
import 'preact-github-calendar/dist/index.css'

export default function App() {
    return <GitHubCalendar username="${username}" options={{ ... }} />
}`}</code>
                    </pre>
                    <hr class="divider" />
                    <div id="options">
                        <h4 class="is-size-4 mt-5 mb-4">Options</h4>
                        <UsageOption
                            label="blockMargin"
                            usage={`<GitHubCalendar username="${username}" options={{ blockMargin: 4 }} />`}
                            calendar={<GitHubCalendar username={username} options={{ blockMargin: 4 }} />}
                        />
                        <UsageOption
                            label="blockSize"
                            usage={`<GitHubCalendar username="${username}" options={{ blockSize: 14 }} />`}
                            calendar={<GitHubCalendar username={username} options={{ blockSize: 14 }} />}
                        />
                        <UsageOption
                            label="contributionColorArray"
                            usage={`<GitHubCalendar username="${username}" options={{ contributionColorArray: ["#ededed", "#9ba1e9", "#4040c4", "#3030a1", "#21216e"] }} />`}
                            calendar={
                                <GitHubCalendar
                                    username={username}
                                    options={{
                                        contributionColorArray: ['#ededed', '#9ba1e9', '#4040c4', '#3030a1', '#21216e'],
                                    }}
                                />
                            }
                        />
                        <UsageOption
                            label="labelFontSize"
                            usage={`<GitHubCalendar username="${username}" options={{ labelFontSize: 20 }} />`}
                            calendar={<GitHubCalendar username={username} options={{ labelFontSize: 20 }} />}
                        />
                        <UsageOption
                            label="showTooltip"
                            usage={`<GitHubCalendar username="${username}" options={{ showTooltip: false }} />`}
                            calendar={<GitHubCalendar username={username} options={{ showTooltip: false }} />}
                        />
                        <UsageOption
                            label="showWeekdaysLabels"
                            usage={`<GitHubCalendar username="${username}" options={{ showWeekdaysLabels: true }} />`}
                            calendar={<GitHubCalendar username={username} options={{ showWeekdaysLabels: true }} />}
                        />
                    </div>
                </div>
            </div>
            <footer class="footer">
                <div class="container has-text-centered">
                    <span>&copy; 2020 Ryan Christian</span>
                </div>
            </footer>
        </div>
    );
}
