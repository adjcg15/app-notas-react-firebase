import { finishLoading, setError, startLoading, unsetError } from '../../actions/ui';
import { types } from '../../types/types';

describe('Pruebas en ui-actions', () => {
    
    test('todas las acciones deben de funcionar', () => {
        
        const setErrorAction = setError('HELP!!!');
        expect(setErrorAction).toEqual({
            type: types.uiSetError,
            payload: 'HELP!!!'
        });

        const unsetErrorAction = unsetError();
        expect(unsetErrorAction).toEqual({
            type: types.uiRemoveError
        });

        const startLoadingAction = startLoading();
        expect(startLoadingAction).toEqual({
            type: types.uiStartLoading
        });

        const finishLoadingAction = finishLoading();
        expect(finishLoadingAction).toEqual({
            type: types.uiFinishLoading
        });
    });
    
});
