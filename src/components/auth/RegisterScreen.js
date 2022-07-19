import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { setError, unsetError } from '../../actions/ui';
import { startRegister } from '../../actions/auth';

export const RegisterScreen = () => {
    const dispatch = useDispatch();
    const {msgError} = useSelector(state => state.ui);
    
    const [formValues, handleInputChange] = useForm({
        name: 'john',
        email: 'example@example.com',
        password: '123456',
        password2: '123456'
    });

    const {name, email, password, password2} = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if ( isFormValid() ) {
            dispatch(startRegister(email, password, name));
        }
    }

    const isFormValid = () => {
        
        if( name.trim().length === 0 ) {
            dispatch(setError('Name is required'));
            return false;
        } else if ( !validator.isEmail(email) ) {
            dispatch(setError('Email is not valid'));
            return false;
        } else if (password !== password2 || password.length < 5) {
            dispatch(setError('Password whould be at least 6 characters and match'));
            return false;
        }

        dispatch(unsetError());
        return true;
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
                        <h3 className="auth__title">Sign up</h3>
                        <form onSubmit={handleRegister}>
                            <div>
                                {
                                    msgError &&
                                    <div className='auth__alert-error'>
                                        {msgError}
                                    </div>
                                }
                                
                                <label
                                    className="auth__form-label"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    name="name"
                                    value={name}
                                    className="auth__input"
                                    autoComplete="off"
                                    onChange={handleInputChange}
                                />
                            </div>

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
                                    value={email}
                                    className="auth__input"
                                    autoComplete="off"
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
                                    value={password}
                                    className="auth__input"
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label
                                    className="auth__form-label"
                                    htmlFor="password2"
                                >
                                    Confirm your password
                                </label >
                                <input
                                    id="password2"
                                    type="password"
                                    placeholder="Confirm password"
                                    name="password2"
                                    value={password2}
                                    className="auth__input"
                                    onChange={handleInputChange}
                                />
                            </div>

                            <button
                                type="submit"
                                className="primary-button auth__submit"
                            >
                                Register
                            </button>
                        </form>
                    </div>
                    <p className='auth__signchange'>
                        Already registered?{' '}
                        <Link 
                            className='link'
                            to="/auth/login"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>

            <div className='auth__greeting'>
                <p>Welcome!</p>
            </div>
        </div>
    )
}
