import { FunctionalComponent, h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec'];
const defaultContributionColors = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];

function applyStyles(): void {
    const link = document.createElement('style');
    link.textContent = `
        .calendar-graph {
          padding: 5px 0 0;
          text-align: center;
        }
        
        .calendar-graph text.wday,
        .calendar-graph text.month {
          font-size: 10px;
          fill: #aaa;
        }
        
        .contrib-footer {
          font-size: 11px;
          padding: 0 10px 12px;
          text-align: left;
          width: 100%;
          box-sizing: border-box;
          height: 26px;
        }
        
        .float-left.text-gray {
          float: left;
        }
        
        .contrib-legend {
          text-align: right;
          padding: 0 14px 10px 0;
          display: inline-block;
          float: right;
        }
        
        .contrib-legend .legend {
          display: inline-block;
          list-style: none;
          margin: 0 5px;
          position: relative;
          bottom: -1px;
          padding: 0;
        }
        
        .contrib-legend .legend li {
          display: inline-block;
          width: 10px;
          height: 10px;
        }
        
        .contrib-display {
          padding: 15px 10px;
          text-align: center;
          border-left: 1px solid #ddd;
          border-top: 1px solid #ddd;
          font-size: 11px;
          border-left: 0;
          display: flex;
          flex-direction: column;
          width: 100%;
          vertical-align: top;
        }
        
        .contrib-count {
          font-weight: 300;
          line-height: 1.3em;
          font-size: 24px;
          display: block;
          color: #333;
        }
    `;

    document.body.appendChild(link);
}

function setLabelColor(calendar: Element, labelColor: string): Element {
    calendar.querySelectorAll('text.month, text.wday').forEach((element) => {
        (element as HTMLElement).style.fill = labelColor;
    });
    return calendar;
}

function setContributionColorArray(calendar: Element, contributionColorArray: string[]): Element {
    defaultContributionColors.map((defaultColor, i) => {
        calendar
            .querySelectorAll(`li[style="background-color: ${defaultColor}"], rect[fill="${defaultColor}"]`)
            .forEach((element) => {
                (element as HTMLElement).style.fill = contributionColorArray[i];
                (element as HTMLElement).style.backgroundColor = contributionColorArray[i];
            });
    });
    return calendar;
}

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

    const applyStyleOptions = useCallback(
        (rawContributionContent: string) => {
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
            lastYear.setFullYear(lastYear.getFullYear() - 1, lastYear.getMonth(), lastYear.getDate() + 1);
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

            // Apply standard styles
            applyStyles();

            // Handle user options
            if (props.options.labelColor) calendar = setLabelColor(calendar, props.options.labelColor);
            if (props.options.contributionColorArray)
                calendar = setContributionColorArray(calendar, props.options.contributionColorArray);

            // Finalize
            setContributionContent(calendar.innerHTML);
        },
        [props],
    );

    useEffect(() => {
        fetch(`https://githubproxy.ryanchristian.dev/user/${props.username}`)
            .then(async (response) => {
                applyStyleOptions(await response.text());
            })
            .catch((response) => {
                console.log(response);
            });
    }, [props.username, applyStyleOptions]);

    return <div class={props.options.calendarClassName} dangerouslySetInnerHTML={{ __html: contributionContent }} />;
};

export default GitHubCalendar;
