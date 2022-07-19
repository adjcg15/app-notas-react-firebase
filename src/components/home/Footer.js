import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
    return (
        <footer>
            <div>
                <p>&copy; Ángel García, all rights reserved 2022</p>
                <nav>
                    <Link to="/auth/login">
                        <button style={{marginRight: '17px'}} className='secondary-button white'>
                            Login
                        </button>
                    </Link>
                    <Link to="/auth/register">
                        <button className='secondary-button'>
                            Sign up
                        </button>
                    </Link>
                </nav>
            </div>
        </footer>
    )
}
