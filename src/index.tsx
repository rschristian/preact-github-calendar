import { Fragment, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import PreactHint from 'preact-hint';

import './style.css';

// The relationships betwen a font size and the necessary space required on the graph.
const VERTICAL_SPACING = 1.5;
const HORIZONTAL_SPACING = 2.57;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

type Contribution = {
    date: string;
    count: number;
    intensity: 0 | 1 | 2 | 3 | 4;
};

type Options = {
    contributionColorArray: [string, string, string, string, string];
    labelFontSize: number;
    showLabels: boolean;
    showTooltip: boolean;
};

const blockMargin = 4,
    blockSize = 10,
    combinedBlockSize = blockSize + blockMargin;

export function GitHubCalendar(props: { username: string; options?: Partial<Options> }) {
    const { contributionColorArray, labelFontSize, showLabels, showTooltip }: Options =
        Object.assign(
            {
                contributionColorArray: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                labelFontSize: 14,
                showLabels: true,
                showTooltip: true,
            },
            props.options,
        );

    const truncateSvg = window.matchMedia('(max-width: 800px)').matches,
        verticalOffset = labelFontSize * VERTICAL_SPACING,
        horizontalOffset = labelFontSize * HORIZONTAL_SPACING,
        svgWidth = 53 * combinedBlockSize + (showLabels ? horizontalOffset : 0),
        svgHeight = combinedBlockSize * 7 + (showLabels ? verticalOffset : 0);


    const [total, setTotal] = useState(0);
    const [contributions, setContributions] = useState<Contribution[][] | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        setContributions(null);
        setError('');
        fetch(`https://gh-calendar.rschristian.dev/user/${props.username}`)
            .then((res) => res.json())
            .then((data) => {
                if ('message' in data) {
                    return setError(data.message);
                }
                setTotal(data.total);
                setContributions(data.contributions);
            })
            .catch(() => setError('Uknown Error'));
    }, [props.username]);

    const createCalendar = () => {
        const calendarContent = [];
        let previousMonth = -1;

        contributions.forEach((week, i) => {
            calendarContent.push(
                <g transform={`translate(${combinedBlockSize * i}, 0)`}>
                    {week.map((day, y) => (
                        <rect
                            x={showLabels ? verticalOffset : '0'}
                            y={combinedBlockSize * y}
                            width={blockSize}
                            height={blockSize}
                            fill={contributionColorArray[day.intensity]}
                            data-hint={showTooltip ? [day.count, day.date] : null}
                        />
                    ))}
                </g>
            );
            if (showLabels) {
                const month = +week[0].date.substring(5, 7) - 1;
                if (month !== previousMonth) {
                    previousMonth = month;
                    calendarContent.push(
                        <text
                            style={{ fontSize: labelFontSize }}
                            x={verticalOffset + combinedBlockSize * i}
                            y="-7"
                        >
                            {MONTHS[month]}
                        </text>,
                    );
                }
            }
        });

        if (showLabels) {
            // If second month label is 3 or less blocks away, skip the first label
            if (calendarContent[1].props.x - calendarContent[0].props.x <= combinedBlockSize * 3) {
                calendarContent.shift();
            }

            // Remove last month label if it's likely to clip off the right margin
            if (calendarContent[calendarContent.length - 1].props.x >= combinedBlockSize * 52) {
                calendarContent.pop();
            }

            ['Mon', 'Wed', 'Fri'].forEach((weekDay, i) =>
                calendarContent.push(
                    <text
                        style={{ fontSize: labelFontSize }}
                        x="-15"
                        y={
                            verticalOffset +
                            combinedBlockSize * ((i + 1) * 2 - 1) +
                            (blockSize - 1) -
                            22
                        }
                    >
                        {weekDay}
                    </text>,
                ),
            );
        }

        return calendarContent;
    }

    const createDateRange = (): string => {
        const maxWeekIndex = contributions.length - 1;
        const oldestDate = contributions[0][0].date.split('-');
        const newestDate =
            contributions[maxWeekIndex][contributions[maxWeekIndex].length - 1].date.split('-');
        return `${MONTHS[+oldestDate[1] - 1]} ${oldestDate[2]}, ${oldestDate[0]} - ${
            MONTHS[+newestDate[1] - 1]
        } ${newestDate[2]}, ${newestDate[0]}`;
    }

    return (
        <Fragment>
            {contributions !== null ? (
                <figure>
                    <div class="github-calendar__graph">
                        <PreactHint
                            template={(content: string) => {
                                const hintPieces = content.split(',');
                                const split = hintPieces[1].split('-');
                                const date = `${MONTHS[+split[1] - 1]} ${split[2]}, ${split[0]}`;
                                return (
                                    <Fragment>
                                        <strong>{hintPieces[0]} Contributions</strong> on {date}
                                    </Fragment>
                                );
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={truncateSvg ? svgWidth : '100%'}
                                height={truncateSvg && svgHeight}
                                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                            >
                                <g transform={showLabels && `translate(15, ${verticalOffset})`}>
                                    {createCalendar()}
                                </g>
                            </svg>
                        </PreactHint>
                        <div class="github-calendar__graph-footer">
                            <div>
                                Sum of pull requests, issues opened, and commits made by{' '}
                                <a href={`https://github.com/${props.username}`} target="blank">
                                    @{props.username}
                                </a>
                            </div>
                            <div>
                                Less
                                <span class="github-calendar__graph-legend">
                                    {contributionColorArray.map((color) => (
                                        <Fragment>
                                            <span
                                                style={{
                                                    backgroundColor: color,
                                                }}
                                            />{' '}
                                        </Fragment>
                                    ))}
                                </span>
                                More
                            </div>
                        </div>
                    </div>
                    <div class="github-calendar__footer">
                        Contributions in the last year
                        <div class="github-calendar__footer-count">
                            {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Total
                        </div>
                        {createDateRange()}
                    </div>
                </figure>
            ) : error && (
                <div class="github-calendar__error">{error}</div>
            )}
        </Fragment>
    );
}
