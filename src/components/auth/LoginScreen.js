import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.ui);
    
    const [formValues, handleInputChange] = useForm({
        email: 'example@example.com',
        password: '123456'
    });

    const {email, password} = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        
        dispatch(startLoginEmailPassword(email, password));
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }
    
    return (
        <div className='auth'>
            <div className='auth__main'>
                <div className='auth__main-container'>
                    <Link to="/">
                        <button className='auth__homebtn'>
                            <i className="fa-solid fa-house"></i>
                        </button>
                    </Link>
                    <div>
                        <h3 className="auth__title">Login</h3>
                        <form onSubmit={handleLogin}>
                            <div>
                                <label
                                    className="auth__form-label"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    placeholder="example@example.com"
                                    name="email"
                                    className="auth__input"
                                    autoComplete="off"
                                    value={email}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label
                                    className="auth__form-label"
                                    htmlFor="password"
                                >
                                    Password
                                </label >
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    className="auth__input"
                                    value={ password }
                                    onChange={ handleInputChange }
                                />
                            </div>

                            <button
                                type="submit"
                                className="primary-button auth__submit"
                                disabled={ loading }
                            >
                                Login
                            </button>
                            
                            <div className="auth__social-networks">
                                <p>Login with social networks</p>
                                <div
                                    className="google-btn"
                                    onClick={ handleGoogleLogin }
                                >
                                    <div className="google-icon-wrapper">
                                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                                    </div>
                                    <p>
                                        Sign in with Google
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                    <p className='auth__signchange'>
                        Don&apos;t have an account?{' '}
                        <Link 
                            className='link'
                            to="/auth/register"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

            <div className='auth__greeting'>
                <p>Welcome back!</p>
            </div>
        </div>
    )
}
