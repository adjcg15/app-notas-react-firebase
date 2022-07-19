import React from 'react'

export const HomeServices = () => {
    return (
        <section className='home__services section'>
            <div className='container'>
                <h3>Personalize your notes</h3>
                <ul>
                    <li>
                        <i className="fa-solid fa-align-left"></i>
                        <b>Text format</b>
                        <p>
                            Apply inline styles to your text, such as bold, italics, underlines, etc.
                        </p>
                    </li>

                    <li>
                        <i className="fa-solid fa-text-height"></i>
                        <b>The size matters</b>
                        <p>
                            Resize your text and use titles to reach a better organization in your notes.
                        </p>
                    </li>

                    <li>
                        <i className="fa-solid fa-code"></i>
                        <b>Add code blocks</b>
                        <p>
                            You can add blocks of codeto enrich your notes and give them a better format.
                        </p>
                    </li>

                    <li>
                        <i className="fa-solid fa-font"></i>
                        <b>Change fonts</b>
                        <p>
                            Apply inline styles to your text, such as bold, italics, underlines, etc.
                        </p>
                    </li>
                </ul>
            </div>
        </section>
    )
}
