import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import * as style from './index.css';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec'];

interface IProps {
    username: string;
    options?: {
        calendarClassName?: string;
        labelColor?: string;
        contributionColorArray?: [string, string, string, string, string];
    };
}

const GitHubCalendar: FunctionalComponent<IProps> = (props: IProps) => {
    const [contributionContent, setContributionContent] = useState<string>('');

    useEffect(() => {
        fetch(`https://githubproxy.ryanchristian.dev/user/${props.username}`)
            .then(async (response) => {
                const rawContent = new DOMParser().parseFromString(await response.text(), 'text/html');

                // Create root so content can be appended
                const root = document.createElement('div');
                root.appendChild(rawContent.body.getElementsByClassName('graph-before-activity-overview')[0]);

                // Description text directly below calendar
                root.getElementsByClassName('float-left text-gray')[0].innerHTML =
                    'Sum of pull requests, issues opened, and commits made by ' +
                    `<a href="https://github.com/${props.username}" target="blank">@${props.username}</a>`;

                // Bottom summary
                const contributionCount = rawContent.body
                    .getElementsByClassName('f4 text-normal mb-2')[0]
                    .innerHTML.trim()
                    .split(' ')[0];
                const lastYear = new Date();
                const today = new Date();
                lastYear.setFullYear(lastYear.getFullYear() - 1, lastYear.getMonth(), lastYear.getDate() + 1);
                // prettier-ignore
                root.insertAdjacentHTML(
                    'beforeend',
                    '<div class="contrib-display">' +
                              '<span class="text-muted">Contributions in the last year</span>' +
                              `<span class="contrib-count">${contributionCount} total</span>` +
                              '<span class="text-muted">' +
                                  `${months[lastYear.getMonth()]} ${lastYear.getDate()}, ${lastYear.getFullYear()} - ${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}` +
                              '</span>' +
                          '</div>',
                );

                // Make the component responsive
                const svg = root.getElementsByClassName('js-calendar-graph-svg')[0];
                svg.setAttribute('viewBox', `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`);
                svg.removeAttribute('height');
                svg.setAttribute('width', '100%');

                // Apply base styles
                const link = document.createElement('style');
                link.textContent = style.stylesheet;
                document.body.appendChild(link);

                // Handle user options
                if (props.options) {
                    if (props.options.labelColor) {
                        root.querySelectorAll('text.month, text.wday').forEach(
                            (element) => ((element as HTMLElement).style.fill = props.options.labelColor),
                        );
                    }
                    if (props.options.contributionColorArray) {
                        ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'].map((defaultColor, i) => {
                            // Set rects
                            root.querySelectorAll(`rect[fill="${defaultColor}"]`).forEach((element) =>
                                element.setAttribute('fill', props.options.contributionColorArray[i]),
                            );
                            // Set Legend
                            root.querySelectorAll(`li[style="background-color: ${defaultColor}"]`).forEach((element) =>
                                element.setAttribute(
                                    'style',
                                    `background-color: ${props.options.contributionColorArray[i]}`,
                                ),
                            );
                        });
                    }
                }

                root.querySelector('.contrib-legend').removeAttribute('title');

                // Finalize
                setContributionContent(root.innerHTML);
            })
            .catch((response) => {
                console.log(response);
            });
    }, [props]);

    return (
        <Fragment>
            {contributionContent ? (
                <div
                    class={props.options && props.options.calendarClassName ? props.options.calendarClassName : ''}
                    dangerouslySetInnerHTML={{ __html: contributionContent }}
                />
            ) : (
                <noscript>This component requires JS in order to function properly.</noscript>
            )}
        </Fragment>
    );
};

export default GitHubCalendar;
