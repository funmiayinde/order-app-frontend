import _ from 'lodash';
import { navigateTo } from '../ui-navigation';
import { UI_NAVIGATION } from './index';

describe('ui-initializer Action', () => {
    it ('Should create an action to make a ui-navigate ', () => {
        const mockedMeta = {
            type: UI_NAVIGATION,
            payload: 'apps'
        };
        expect(navigateTo(_.get(mockedMeta, ['payload', 'app']))).toEqual(mockedMeta);
    });
});
