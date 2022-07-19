import React from 'react'
import image from '../../assets/commercial.png';

export const HomeCommercial = () => {
    return (
        <section className='home__section section'>
            <div className='container'>
                <div>
                    <h3>Lose no more</h3>
                    <p>
                        Don't waste your time writing notes in that notebook that banisses when you need it the most.
                    </p>
                    <p>
                        Make it safer, easier, faster, make it smart.
                    </p>
                </div>

                <div>
                    <img src={ image } alt="easy to use" />
                </div>
            </div>
        </section>
    )
}
