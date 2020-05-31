import { FunctionalComponent, h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';

import './index.css';

interface IProps {
    username: string;
    options?: {
        labelColor?: string;
        contributionColorArray?: [string, string, string, string, string];
    };
}

const defaultContributionColors = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];

const GitHubCalendar: FunctionalComponent<IProps> = (props: IProps) => {
    const [rawContributionContent, setRawContributionContent] = useState<string>(null);
    const [contributionContent, setContributionContent] = useState<string>(null);

    const setLabelColor = useCallback(
        (dom: Document): Document => {
            dom.body.querySelectorAll('text.month, text.wday').forEach((element) => {
                (element as HTMLElement).style.fill = props.options.labelColor;
            });
            return dom;
        },
        [props.options],
    );

    const setContributionColorArray = useCallback(
        (dom: Document): Document => {
            for (let i = 0; i < 5; i++) {
                dom.body
                    .querySelectorAll(
                        `li[style="background-color: ${defaultContributionColors[i]}"], rect[fill="${defaultContributionColors[i]}"]`,
                    )
                    .forEach((element) => {
                        (element as HTMLElement).style.fill = props.options.contributionColorArray[i];
                        (element as HTMLElement).style.backgroundColor = props.options.contributionColorArray[i];
                    });
            }
            return dom;
        },
        [props.options.contributionColorArray],
    );

    const applyStyleOptions = useCallback(() => {
        let dom = new DOMParser().parseFromString(rawContributionContent, 'text/html');

        const learnHowWeCountContributions = dom.body.getElementsByClassName('float-left text-gray')[0];
        if (!learnHowWeCountContributions) return;

        learnHowWeCountContributions.innerHTML = `Summary of pull requests, issues opened, and commits made by
                <a href="https://github.com/${props.username}" target="blank">@${props.username}</a>`;

        // Make the component responsive
        const svg = dom.body.getElementsByClassName('js-calendar-graph-svg')[0];
        svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('width') + ' ' + svg.getAttribute('height'));
        svg.removeAttribute('height');
        svg.setAttribute('width', '100%');

        dom.getElementById('user-activity-overview').remove();

        // Handle user options
        if (props.options.labelColor) dom = setLabelColor(dom);
        if (props.options.contributionColorArray) dom = setContributionColorArray(dom);

        // Finalize
        setContributionContent(dom.body.innerHTML);
    }, [props, rawContributionContent, setContributionColorArray, setLabelColor]);

    useEffect(() => {
        fetch(`https://githubproxy.ryanchristian.dev/${props.username}`)
            .then(async (response) => {
                setRawContributionContent(await response.text());
                applyStyleOptions();
            })
            .catch((response) => {
                console.log(response);
            });
    }, [props.username, applyStyleOptions]);

    return <div dangerouslySetInnerHTML={{ __html: contributionContent }} />;
};

export default GitHubCalendar;
