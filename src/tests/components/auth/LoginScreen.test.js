import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { MemoryRouter } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    ui: {
        loading: false
    }
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
    </Provider>
);

describe('Pruebas en <LoginScreen />', () => {
    
    beforeEach(() => {
        store = mockStore(initialState);
        jest.clearAllMocks();
    });
    
    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    }); 

    test('debe de disparar la acción de startLoginScreen', () => {
       wrapper.find('.google-btn').prop('onClick')();

       expect(startGoogleLogin).toHaveBeenCalled();
    });
    
    test('debe de disparar el start login con los respectivos argumentos', () => {
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect(startLoginEmailPassword).toHaveBeenCalledWith('example@example.com', '123456');
    });
});
