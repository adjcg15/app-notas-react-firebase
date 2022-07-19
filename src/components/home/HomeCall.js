import React from 'react'
import { Link } from 'react-router-dom';
import image from '../../assets/first-section.png';

export const HomeCall = () => {
    return (
        <section className='home__section section'>
            <div className='container'>
                <div>
                    <img src={ image } alt="easy to use" />
                </div>
                <div>
                    <h3><span>Easy</span> to use</h3>
                    <p>
                        Create a new account or associate your Google one to start creating notes.
                    </p>
                    <p>
                        One click away from being able to create and save your notes, without effort, without losses, easy and free!
                    </p>
                    <Link to="/auth/register">
                        <button className='secondary-button'>
                            <p>Create account</p>
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
