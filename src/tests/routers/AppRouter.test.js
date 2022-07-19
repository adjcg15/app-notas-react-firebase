import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { act } from '@testing-library/react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 'ABC',
        },
        notes: []
    }
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

describe('Pruebas en <AppRouter />', () => {
    test('Debe de llamar el login si estoy autenticado', async() => {
        
        let user;

        await act( async() => {

            const auth = getAuth();
            const userCred = await signInWithEmailAndPassword(auth, 'test@testing.com', '123456');
            user = userCred.user;

            const wrapper = mount(
                <Provider store={ store }>
                    <AppRouter />
                </Provider>
            );

        });

        expect(login).toHaveBeenCalledWith('Kj93ZIZ5vsMWWHLEsXUJhqCqh332', null);
    }); 
});
