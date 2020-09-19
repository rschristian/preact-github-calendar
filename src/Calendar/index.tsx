import { Fragment, h, VNode } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import PreactHint from 'preact-hint';
import 'preact-hint/dist/index.css';

const VERTICAL_SPACING = 1.5;
const HORIZONTAL_SPACING = 2.4;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface Contribution {
    date: string;
    count: number;
    intensity: 0 | 1 | 2 | 3 | 4;
}

interface Options {
    blockMargin?: number;
    blockSize?: number;
    calendarClassName?: string;
    contributionColorArray?: [string, string, string, string, string];
    contributionCountFontSize?: number;
    fontSize?: number;
    labelColor?: string;
    labelFontSize?: number;
    showWeekdaysLabels?: boolean;
    showTooltip?: boolean;
}

export default function GitHubCalendar(props: { username: string; options?: Options }): VNode {
    const {
        blockMargin,
        blockSize,
        calendarClassName,
        contributionColorArray,
        contributionCountFontSize,
        fontSize,
        labelColor,
        labelFontSize,
        showWeekdaysLabels,
        showTooltip,
    }: Options = Object.assign(
        {
            blockMargin: 2,
            blockSize: 12,
            calendarClassName: undefined,
            contributionColorArray: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
            contributionCountFontSize: 24,
            fontSize: 11,
            labelColor: '#000',
            labelFontSize: 14,
            showWeekdaysLabels: false,
            showTooltip: true,
        },
        props.options,
    );

    const [graphData, setGraphData] = useState<{ total: number; contributions: Contribution[][] }>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        async function getContributionData(): Promise<void> {
            try {
                const response = await (
                    await fetch(`https://githubapi.ryanchristian.dev/user/${props.username}`)
                ).json();
                if (!('total' in response) && !('contributions' in response)) throw 'Invalid response data';
                setGraphData(response);
            } catch {
                setError('Unknown Error');
            }
        }
        getContributionData().then();
    }, [props.username]);

    function createWeekDayLabels(): JSX.Element[] {
        if (showWeekdaysLabels) {
            const weekDays = ['Mon', 'Wed', 'Fri'];
            return weekDays.map((weekDay, i) => {
                return (
                    <text
                        key={weekDay}
                        x={0}
                        y={
                            labelFontSize * VERTICAL_SPACING +
                            (blockSize + blockMargin) * ((i + 1) * 2 - 1) +
                            (blockSize - 1)
                        }
                        style={{ fontSize: labelFontSize, fill: labelColor }}
                    >
                        {weekDay}
                    </text>
                );
            });
        }
    }

    function createMonthLabels(): JSX.Element[] {
        const weeks: Contribution[] = [];
        for (let i = 0; i < graphData.contributions.length - 1; i++) weeks.push(graphData.contributions[i][0]);
        let previousMonth = 0;

        const filtered = weeks
            .map((entry, i) => {
                const month = new Date(entry.date).getMonth();
                if (month !== previousMonth) {
                    previousMonth = month;
                    return (
                        <text
                            x={
                                (showWeekdaysLabels ? (blockSize + blockMargin) * HORIZONTAL_SPACING : 0) +
                                (blockSize + blockMargin) * i
                            }
                            y={labelFontSize}
                            style={{ fontSize: labelFontSize, fill: labelColor }}
                        >
                            {MONTHS[month]}
                        </text>
                    );
                }
            })
            .filter((element) => element !== undefined);

        // Might be a better way to do this, but I can't think of it at the moment
        if (filtered[1].props['x'] - filtered[0].props['x'] <= 28) filtered.shift();
        return filtered;
    }

    function createRects(): JSX.Element[] {
        return graphData.contributions
            .map((week) =>
                week.map((day, y) => (
                    <rect
                        key={day.date}
                        x="0"
                        y={labelFontSize * VERTICAL_SPACING + (blockSize + blockMargin) * y}
                        width={blockSize}
                        height={blockSize}
                        fill={contributionColorArray[day.intensity]}
                        data-preact-hint={[day.count, day.date]}
                    />
                )),
            )
            .map((week, x) => (
                <g
                    key={x}
                    transform={`translate(${
                        (showWeekdaysLabels ? (blockSize + blockMargin) * HORIZONTAL_SPACING : 0) +
                        (blockSize + blockMargin) * x
                    }, 0)`}
                >
                    {week}
                </g>
            ));
    }

    function createLegend(): JSX.Element {
        return (
            <ul
                style={{
                    display: 'inline-block',
                    margin: '0 5px',
                    position: 'relative',
                    paddingLeft: 0,
                    bottom: '-1px',
                }}
            >
                {contributionColorArray.map((color) => (
                    <Fragment key={color}>
                        <li
                            style={{
                                display: 'inline-block',
                                width: blockSize,
                                height: blockSize,
                                backgroundColor: color,
                            }}
                        />{' '}
                    </Fragment>
                ))}
            </ul>
        );
    }

    function createDateRange(): string {
        const maxWeekIndex = graphData.contributions.length - 1;
        const lastYear = new Date(graphData.contributions[0][0].date);
        const today = new Date(
            graphData.contributions[maxWeekIndex][graphData.contributions[maxWeekIndex].length - 1].date,
        );
        return `${MONTHS[lastYear.getMonth()]} ${lastYear.getDate()}, ${lastYear.getFullYear()} - ${
            MONTHS[today.getMonth()]
        } ${today.getDate()}, ${today.getFullYear()}`;
    }

    function createSvg(): JSX.Element {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox={`0 0 ${
                    53 * (blockSize + blockMargin) -
                    blockMargin +
                    (showWeekdaysLabels ? (blockSize + blockMargin) * HORIZONTAL_SPACING : 0)
                } ${(blockSize + blockMargin) * 7 - blockMargin + labelFontSize * VERTICAL_SPACING}`}
            >
                {createWeekDayLabels()}
                {createMonthLabels()}
                {createRects()}
            </svg>
        );
    }

    return (
        <Fragment>
            {graphData !== null ? (
                <figure class={calendarClassName}>
                    <div style={{ padding: '.5rem' }}>
                        {showTooltip ? (
                            <PreactHint
                                template={(content: string): VNode => {
                                    const contentPieces = content.split(',');
                                    function date(): string {
                                        const split = contentPieces[1].split('-');
                                        return `${MONTHS[Number(split[1]) - 1]} ${+split[2]}, ${split[0]}`;
                                    }
                                    return (
                                        <Fragment>
                                            <strong>{contentPieces[0]} Contributions</strong> on {date()}
                                        </Fragment>
                                    );
                                }}
                            >
                                {createSvg()}
                            </PreactHint>
                        ) : (
                            createSvg()
                        )}
                        <div
                            style={{
                                fontSize,
                                overflowY: 'auto',
                            }}
                        >
                            <div style={{ float: 'left' }}>
                                Sum of pull requests, issues opened, and commits made by{' '}
                                <a href={`https://github.com/${props.username}`} target="blank">
                                    @{props.username}
                                </a>
                            </div>
                            <div style={{ float: 'right' }}>
                                Less
                                {createLegend()}
                                More
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            padding: '15px 10px',
                            textAlign: 'center',
                            borderTop: '1px solid #ddd',
                            fontSize: fontSize,
                        }}
                    >
                        <span>Contributions in the last year</span>
                        <span
                            style={{
                                fontWeight: '300',
                                lineHeight: '1.3em',
                                fontSize: contributionCountFontSize,
                                display: 'block',
                            }}
                        >
                            {graphData.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Total
                        </span>
                        <span>{createDateRange()}</span>
                    </div>
                </figure>
            ) : error ? (
                <div style={{ textAlign: 'center' }}>{error}</div>
            ) : (
                <noscript>This component requires JS in order to function properly.</noscript>
            )}
        </Fragment>
    );
}
