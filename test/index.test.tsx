import { h } from 'preact';
import { shallow } from 'enzyme';
import fetchMock from 'jest-fetch-mock';
import 'regenerator-runtime/runtime';

import GitHubCalendar from '../src';
import * as mockContributionData from './__mock__/index.json';

// prettier-ignore
describe('Test of Calendar\'s base functionality', () => {
    fetchMock.mockResponse(JSON.stringify(mockContributionData));

    test('Calendar fully loads', (done) => {
        const wrapper = shallow(<GitHubCalendar username="rschristian" />);

        setImmediate(() => {
            expect(wrapper.update()).toMatchSnapshot();
            done();
        });
    });

    test('Error fallback', (done) => {
        fetchMock.resetMocks();
        fetchMock.once(JSON.stringify({ invalidJsonInput: 'hello world' }));

        const wrapper = shallow(<GitHubCalendar username="rschristian" />);

        setImmediate(() => {
            expect(wrapper.update()).toMatchSnapshot();
            done();
        });
    });
});
