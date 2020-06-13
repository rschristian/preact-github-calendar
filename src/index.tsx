import { FunctionalComponent, h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';

import './style.css';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec'];
const defaultContributionColors = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];

const setLabelColor = (calendar: Element, labelColor: string): Element => {
    calendar.querySelectorAll('text.month, text.wday').forEach((element) => {
        (element as HTMLElement).style.fill = labelColor;
    });
    return calendar;
};

const setContributionColorArray = (calendar: Element, contributionColorArray: string[]): Element => {
    for (let i = 0; i < 5; i++) {
        calendar
            .querySelectorAll(
                `li[style="background-color: ${defaultContributionColors[i]}"], rect[fill="${defaultContributionColors[i]}"]`,
            )
            .forEach((element) => {
                (element as HTMLElement).style.fill = contributionColorArray[i];
                (element as HTMLElement).style.backgroundColor = contributionColorArray[i];
            });
    }
    return calendar;
};

interface IProps {
    username: string;
    options?: {
        calendarClassName?: string;
        labelColor?: string;
        contributionColorArray?: [string, string, string, string, string];
    };
}

const GitHubCalendar: FunctionalComponent<IProps> = (props: IProps) => {
    const [rawContributionContent, setRawContributionContent] = useState<string>('');
    const [contributionContent, setContributionContent] = useState<string>('');

    const applyStyleOptions = useCallback(() => {
        const dom = new DOMParser().parseFromString(rawContributionContent, 'text/html');

        // Removes the activity overview section that outlines what projects you've contributed to
        const userActivity = dom.getElementById('user-activity-overview');
        if (!userActivity) return;
        userActivity.remove();

        let calendar = dom.body.getElementsByClassName('js-yearly-contributions')[0];

        // Description text directly below calendar
        const learnHowWeCountContributions = calendar.getElementsByClassName('float-left text-gray')[0];
        learnHowWeCountContributions.innerHTML = `Sum of pull requests, issues opened, and commits made by
                <a href="https://github.com/${props.username}" target="blank">@${props.username}</a>`;

        // Bottom summary
        const contributionCountElement: Element = calendar.getElementsByClassName('f4 text-normal mb-2')[0];
        const contributionCount = contributionCountElement.innerHTML.trim().split(' ')[0];
        contributionCountElement.remove();
        const lastYear = new Date();
        const today = new Date();
        lastYear.setDate(lastYear.getDate() + 1);
        lastYear.setFullYear(lastYear.getFullYear() - 1);
        calendar.insertAdjacentHTML(
            'beforeend',
            `<div class="contrib-display">
                       <span class="text-muted">Contributions in the last year</span>
                       <span class="contrib-count">${contributionCount} total</span>
                       <span class="text-muted">
                           ${months[lastYear.getMonth()]} ${lastYear.getDate()}, ${lastYear.getFullYear()} -
                           ${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}
                       </span>
                   </div>
        `,
        );

        // Make the component responsive
        const svg = calendar.getElementsByClassName('js-calendar-graph-svg')[0];
        svg.setAttribute('viewBox', `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`);
        svg.removeAttribute('height');
        svg.setAttribute('width', '100%');

        // Handle user options
        if (props.options?.labelColor) calendar = setLabelColor(calendar, props.options.labelColor);
        if (props.options?.contributionColorArray)
            calendar = setContributionColorArray(calendar, props.options.contributionColorArray);

        // Finalize
        setContributionContent(calendar.innerHTML);
    }, [props, rawContributionContent]);

    useEffect(() => {
        fetch(`https://githubproxy.ryanchristian.dev/user/${props.username}`)
            .then(async (response) => {
                setRawContributionContent(await response.text());
                applyStyleOptions();
            })
            .catch((response) => {
                console.log(response);
            });
    }, [props.username, applyStyleOptions]);

    return <div class={props.options?.calendarClassName} dangerouslySetInnerHTML={{ __html: contributionContent }} />;
};

export default GitHubCalendar;
