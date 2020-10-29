import { h } from 'preact';
import { shallow } from 'enzyme';
import fetchMock from 'jest-fetch-mock';
import 'regenerator-runtime/runtime';

import GitHubCalendar from '../src';
import * as mockContributionData from './__mock__/index.json';

describe('Fully testing API options', () => {
    fetchMock.mockResponse(JSON.stringify(mockContributionData));

    test('blockMargin', (done) => {
        const wrapper = shallow(
            <GitHubCalendar
                username="rschristian"
                options={{
                    blockMargin: 4,
                }}
            />,
        );

        setImmediate(() => {
            wrapper.update();
            const svg = wrapper.find('svg');
            expect(svg).toMatchSnapshot();
            // Expecting 16 as default block size is 12 + 4 on the new margin (2 by default)
            expect(svg.html()).toContain('<g transform="translate(16, 0)">');
            done();
        });
    });

    test('blockSize', (done) => {
        const wrapper = shallow(
            <GitHubCalendar
                username="rschristian"
                options={{
                    blockSize: 14,
                }}
            />,
        );

        setImmediate(() => {
            wrapper.update();
            const graph = wrapper.find('.github-calendar__graph');
            expect(graph).toMatchSnapshot();
            expect(graph.html()).toContain(
                '<rect x="0" y="37" width="14" height="14" fill="#9be9a8" data-preact-hint="6,2020-08-03"></rect>',
            );
            done();
        });
    });

    test('contributionColorArray', (done) => {
        const legendItems = [
            '<li style="background-color: #ededed">',
            '<li style="background-color: #62A197">',
            '<li style="background-color: #428892">',
            '<li style="background-color: #296887">',
            '<li style="background-color: #274969">',
        ];

        const wrapper = shallow(
            <GitHubCalendar
                username="rschristian"
                options={{
                    contributionColorArray: ['#ededed', '#62A197', '#428892', '#296887', '#274969'],
                }}
            />,
        );

        setImmediate(() => {
            wrapper.update();
            const legend = wrapper.find('.github-calendar__graph-legend');
            expect(legend).toMatchSnapshot();
            for (const legendItem in legendItems) {
                expect(legend.html()).toContain(legendItem);
            }
            done();
        });
    });

    test('labelFontSize', (done) => {
        const wrapper = shallow(
            <GitHubCalendar
                username="rschristian"
                options={{
                    labelFontSize: 16,
                    showWeekdaysLabels: true,
                }}
            />,
        );

        setImmediate(() => {
            wrapper.update();
            const svg = wrapper.find('svg');
            expect(svg).toMatchSnapshot();
            expect(svg.html()).toContain(
                '<text class="github-calendar__graph-label" style="font-size: 16px;" x="0" y="49">Mon</text>',
            );
            expect(svg.html()).toContain(
                '<text class="github-calendar__graph-label" style="font-size: 16px;" x="33.6" y="16">Aug</text>',
            );
            done();
        });
    });

    test('showWeekdaysLabels', (done) => {
        const wrapper = shallow(
            <GitHubCalendar
                username="rschristian"
                options={{
                    showWeekdaysLabels: true,
                }}
            />,
        );

        setImmediate(() => {
            wrapper.update();
            const svg = wrapper.find('svg');
            expect(svg).toMatchSnapshot();
            expect(svg.html()).toContain(
                '<text class="github-calendar__graph-label" style="font-size: 14px;" x="0" y="46">Mon</text>',
            );
            done();
        });
    });
});
