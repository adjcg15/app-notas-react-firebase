import React from 'react'
import { Link } from 'react-router-dom'
import line1 from '../../assets/line-1.png'
import line2 from '../../assets/line-2.png'

export const HomeBanner = () => {
    return (
        <section className='home__banner section'>
            <h3>Don't waste your time or <br/>notes anymore!</h3>
            <Link to="/auth/register">
                <button className='primary-button'>
                    <p>Start Now</p>
                </button>
            </Link>
            <div className='dec1'>
                <img src={ line1 } alt="decorative line"/>
            </div>
            <div className='dec2'>
                <img src={ line2 } alt="decorative line 2"/>
            </div>
        </section>
    )
}
