import { h } from 'preact';
import { shallow } from 'enzyme';
import fetchMock from 'jest-fetch-mock';
import 'regenerator-runtime/runtime';

import GitHubCalendar from '../src/index';
import { mockContributionData } from './__mock__/fetch.js';
import { noScript, processedColors, processedFooter, processedLabels } from './images/calendar';

describe('Initial Test of the Calendar', () => {
    test('Calendar loads', (done) => {
        fetchMock.mockResponseOnce(mockContributionData);
        const mockUsername = 'ryanchristian4427';

        const wrapper = shallow(<GitHubCalendar username={mockUsername} />);

        setImmediate(() => {
            expect(wrapper.html()).toContain(processedFooter);
            done();
        });
    });
    test('Class name setting works', (done) => {
        fetchMock.mockResponseOnce(mockContributionData);

        const mockUsername = 'ryanchristian4427';
        const mockClassName = 'my-calendar-class-name';

        const wrapper = shallow(
            <GitHubCalendar
                username={mockUsername}
                options={{
                    calendarClassName: mockClassName,
                }}
            />,
        );

        setImmediate(() => {
            expect(wrapper.hasClass(mockClassName)).toBe(true);
            done();
        });
    });
    test('Label Color Swap Works', (done) => {
        fetchMock.mockResponseOnce(mockContributionData);

        const mockUsername = 'ryanchristian4427';

        const wrapper = shallow(
            <GitHubCalendar
                username={mockUsername}
                options={{
                    labelColor: '#000',
                }}
            />,
        );

        setImmediate(() => {
            for (const label in processedLabels) {
                expect(wrapper.html()).toContain(label);
            }
            done();
        });
    });
    test('Color Gradient Swap Works', (done) => {
        fetchMock.mockResponseOnce(mockContributionData);

        const mockUsername = 'ryanchristian4427';

        const wrapper = shallow(
            <GitHubCalendar
                username={mockUsername}
                options={{
                    contributionColorArray: ['#ededed', '#62A197', '#428892', '#296887', '#253746'],
                }}
            />,
        );

        setImmediate(() => {
            for (const legendItem in processedColors) {
                expect(wrapper.html()).toContain(legendItem);
            }
            done();
        });
    });
    test('No-Script fallback works (at least initially)', () => {
        fetchMock.mockResponseOnce(mockContributionData);

        const mockUsername = 'ryanchristian4427';

        const wrapper = shallow(<GitHubCalendar username={mockUsername} />);

        expect(wrapper.html()).toBe(noScript);
    });
});
