import { UI_ERROR, updateUIError } from "./index";


describe('', () => {
    it('should create an action to make a ui-error request', () => {
        const mockedMeta = {
            key: 'test-key',
            value: 'test_value'
        };

        const expectedAction = { 
            type: UI_ERROR,
            meta: { ...mockedMeta},
        };

        expect(updateUIError(mockedMeta.key, mockedMeta.value)).toEqual(expectedAction);
        expect(UI_ERROR).toEqual('@@ui/UI ERROR');
    });
});