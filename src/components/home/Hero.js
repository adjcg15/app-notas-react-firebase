import React from 'react'
import { Link } from 'react-router-dom';
import hero from '../../assets/hero.png';

export const Hero = () => {
    return (
        <section className='home__hero'>
            <div className='home__container'>
                <nav>
                    <Link to="/auth/login">
                        <button style={{marginRight: '17px'}} className='secondary-button white'>
                            <p>Login</p>
                        </button>
                    </Link>
                    <Link to="/auth/register">
                        <button className='primary-button'>
                            <p>Sign up</p>
                        </button>
                    </Link>
                </nav>

                <div className='home__hero-content'>
                    <div>
                        <h2>Bring <br />your notes <br />to the web</h2>
                        <p className='home__hero-text'>
                            Choose the cloud over the notebooks. Create and save your notes online.
                        </p>
                        <Link to="/auth/register">
                            <button className='ternary-button'>
                                <p>Get Started</p>
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </Link>
                    </div>

                    <div>
                        <img src={ hero } alt="hero"/>
                    </div>
                </div>
            </div>

            <div className='hero__lines'></div>
        </section>
    )
}
