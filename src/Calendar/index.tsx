import { Fragment, h, VNode } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import PreactHint from 'preact-hint';

import './styles.css';

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
        labelFontSize,
        showWeekdaysLabels,
        showTooltip,
    }: Options = Object.assign(
        {
            blockMargin: 2,
            blockSize: 12,
            calendarClassName: undefined,
            contributionColorArray: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
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
                        class="github-calendar__graph-label"
                        style={{ fontSize: labelFontSize }}
                        x={0}
                        y={
                            labelFontSize * VERTICAL_SPACING +
                            (blockSize + blockMargin) * ((i + 1) * 2 - 1) +
                            (blockSize - 1)
                        }
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
                            key={MONTHS[month]}
                            class="github-calendar__graph-label"
                            style={{ fontSize: labelFontSize }}
                            x={
                                (showWeekdaysLabels ? (blockSize + blockMargin) * HORIZONTAL_SPACING : 0) +
                                (blockSize + blockMargin) * i
                            }
                            y={labelFontSize}
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
            <ul class="github-calendar__graph-legend">
                {contributionColorArray.map((color) => (
                    <li
                        key={color}
                        class="github-calendar__graph-legend-item"
                        style={{
                            width: blockSize,
                            height: blockSize,
                            backgroundColor: color,
                        }}
                    />
                ))}
            </ul>
        );
    }

    function createDateRange(): string {
        const maxWeekIndex = graphData.contributions.length - 1;
        const lastYear = graphData.contributions[0][0].date.split('-');
        const today = graphData.contributions[maxWeekIndex][
            graphData.contributions[maxWeekIndex].length - 1
        ].date.split('-');
        // Parsing strings as JS Dates are weird. new Date('2020-09-15').getDate() == 15 in the UK TZ.
        // new Date('2020-09-15').getDate() == 14 in the US Central TZ. For "reasons".
        return `${MONTHS[Number(lastYear[1]) - 1]} ${+lastYear[2]}, ${lastYear[0]} - ${
            MONTHS[Number(today[1]) - 1]
        } ${+today[2]}, ${today[0]}`;
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
                    <div class="github-calendar__graph">
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
                        <div class="github-calendar__graph-footer">
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
                    <div class="github-calendar__footer">
                        <span>Contributions in the last year</span>
                        <span class="github-calendar__footer-contribution-count">
                            {graphData.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Total
                        </span>
                        <span>{createDateRange()}</span>
                    </div>
                </figure>
            ) : error ? (
                <div class="github-calendar__error">{error}</div>
            ) : (
                <noscript>This component requires JS in order to function properly.</noscript>
            )}
        </Fragment>
    );
}
