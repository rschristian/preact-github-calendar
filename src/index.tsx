import { h, VNode } from 'preact';

import GitHubCalendar from './Calendar';

export default function App(): VNode {
    return (
        <div class="preview">
            <GitHubCalendar username="ryanchristian4427" />
        </div>
    );
}
