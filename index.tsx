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

    const applyStyleOptions = useCallback(() => {
        const dom = new DOMParser().parseFromString(rawContributionContent, 'text/html');
        dom.body.getElementsByClassName('float-left text-gray')[0].remove();

        if (props.options.labelColor)
            dom.body.querySelectorAll('text.month, text.wday').forEach((element) => {
                (element as HTMLElement).style.fill = props.options.labelColor;
            });

        if (props.options.contributionColorArray) {
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
        }
        setContributionContent(dom.body.innerHTML);
    }, [props.options, rawContributionContent]);

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
