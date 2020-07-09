import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import jestFetchMock from 'jest-fetch-mock';

configure({ adapter: new Adapter() });
jestFetchMock.enableMocks();
