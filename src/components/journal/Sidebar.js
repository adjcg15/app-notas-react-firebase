import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {
    const dispatch = useDispatch();
    const { name } = useSelector(state => state.auth);
    
    const handleLogout = () => {
        dispatch(startLogout());
    }

    const handleAddNew = () => {
        dispatch(startNewNote());
    }
    
    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3>
                    Hi, { name }
                </h3>

                <button 
                    className="ternary-button"
                    onClick={ handleLogout }
                >
                    <p>Logout</p>
                </button>
            </div>

            <div 
                className="journal__new-entry"
            >
                <button  
                    onClick={ handleAddNew }
                >
                    <i className="fas fa-plus fa-5x"/>
                    <p>
                        Create new note
                    </p> 
                </button>
            </div>

            <JournalEntries />
        </aside>
    )
}
