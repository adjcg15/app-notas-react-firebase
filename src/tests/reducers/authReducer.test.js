import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Pruebas en authReducer', () => {
    test('debe modificar el estado para el login', () => {

        const action = {
            type: types.login,
            payload: {
                uid: 'SAS12899KSK8388NMS19',
                displayName: 'Ángel'
            }
        }

        const newState = authReducer({}, action);
        
        expect(newState).toEqual({
            name: 'Ángel',
            uid: 'SAS12899KSK8388NMS19'
        })
        
    });

    test('debe modificar el estado para el logout', () => {

        const action = {
            type: types.logout
        }

        const newState = authReducer({
            name: 'Ángel',
            uid: 'SAS12899KSK8388NMS19'
        }, action);

        expect(newState).toEqual({})
        
    });

    test('no debe mutar el estado si no existe el tipo', () => {

        const action = {
            type: '[Auth] Hola mundo'
        }

        const newState = authReducer({
            name: 'Ángel',
            uid: 'SAS12899KSK8388NMS19'
        }, action);

        expect(newState).toEqual({
            name: 'Ángel',
            uid: 'SAS12899KSK8388NMS19'
        });
        
    });
});
