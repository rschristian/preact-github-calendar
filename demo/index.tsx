import { VNode } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import GitHubCalendar from 'preact-github-calendar';
import withTwind from '@twind/wmr';
import { debounce } from 'ts-debounce';

import { Hero } from './components/core/Hero';
import { Footer } from './components/core/Footer';
import { Shields } from './components/Shields';
import { CodeBlock } from './components/CodeBlock';
import { Tile } from './components/Tile';
import { UsageOption } from './components/UsageOption';
import twindConfig from './twind.config';

import 'preact-github-calendar/dist/calendar.css';
import 'preact-hint/dist/hint.css';

export function App(): VNode {
    const [username, setUsername] = useState<string>('rschristian');
    const debouncedSetUsername = debounce((value: string) => setUsername(value), 650);

    useEffect(() => {
        username === '' && setUsername('rschristian');
    }, [username]);

    return (
        <>
            <Hero />
            <div id="main-content" class="py-12 px-6">
                <div class="max-w-4xl mx-auto">
                    <h3 class="text(3xl green)">Preact GitHub Calendar</h3>
                    <Shields />
                    <div class="mt-2 mb-6">
                        Preact-GitHub-Calendar is a lightweight and extensible component for{' '}
                        <a href="https://preactjs.com">Preact</a>. It was designed to be a more
                        lightweight alternative to the existing React implementations.
                    </div>
                    <input
                        class="py-2 px-3 rounded border(1 solid steel-dim) focus:(outline-none border-green-light ring(2 green-light opacity-40))"
                        type="text"
                        placeholder="Enter a GitHub username"
                        onInput={(e) => debouncedSetUsername((e.target as HTMLInputElement).value)}
                    />
                    <Tile
                        content={
                            <GitHubCalendar
                                username={username}
                                options={{ showWeekdaysLabels: true }}
                            />
                        }
                    />
                    <h4 class="text(2xl green) mt-5 mb-2">Installation</h4>
                    <CodeBlock content="yarn add preact-github-calendar" />
                    <h4 class="text(2xl green) mt-5 mb-2">General Usage</h4>
                    <CodeBlock
                        content={`import GitHubCalendar from 'preact-github-calendar';
import 'preact-github-calendar/calendar.css';

export default function App() {
    return <GitHubCalendar username="${username}" options={{ ... }} />
}`}
                    />
                    <hr class="my-6" />
                    <div id="options">
                        <h4 class="text(2xl green) mt-5 mb-4">Options</h4>
                        <UsageOption
                            label="blockMargin"
                            usage={`<GitHubCalendar username="${username}" options={{ blockMargin: 4 }} />`}
                            calendar={
                                <GitHubCalendar username={username} options={{ blockMargin: 4 }} />
                            }
                        />
                        <UsageOption
                            label="blockSize"
                            usage={`<GitHubCalendar username="${username}" options={{ blockSize: 16 }} />`}
                            calendar={
                                <GitHubCalendar username={username} options={{ blockSize: 16 }} />
                            }
                        />
                        <UsageOption
                            label="contributionColorArray"
                            usage={`<GitHubCalendar username="${username}" options={{ contributionColorArray: ["#ededed", "#9ba1e9", "#4040c4", "#3030a1", "#21216e"] }} />`}
                            calendar={
                                <GitHubCalendar
                                    username={username}
                                    options={{
                                        contributionColorArray: [
                                            '#ededed',
                                            '#9ba1e9',
                                            '#4040c4',
                                            '#3030a1',
                                            '#21216e',
                                        ],
                                    }}
                                />
                            }
                        />
                        <UsageOption
                            label="labelFontSize"
                            usage={`<GitHubCalendar username="${username}" options={{ labelFontSize: 20 }} />`}
                            calendar={
                                <GitHubCalendar
                                    username={username}
                                    options={{ labelFontSize: 20 }}
                                />
                            }
                        />
                        <UsageOption
                            label="showTooltip"
                            usage={`<GitHubCalendar username="${username}" options={{ showTooltip: false }} />`}
                            calendar={
                                <GitHubCalendar
                                    username={username}
                                    options={{ showTooltip: false }}
                                />
                            }
                        />
                        <UsageOption
                            label="showWeekdaysLabels"
                            usage={`<GitHubCalendar username="${username}" options={{ showWeekdaysLabels: true }} />`}
                            calendar={
                                <GitHubCalendar
                                    username={username}
                                    options={{ showWeekdaysLabels: true }}
                                />
                            }
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

const { hydrate, prerender } = withTwind(twindConfig, () => <App />);

hydrate(<App />);

export { prerender };
