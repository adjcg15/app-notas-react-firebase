import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';

import { startDeleting, startSaveNote } from '../../actions/notes';
import { finishEditingNote, startEditingNote } from '../../actions/ui';

export const NotesAppBar = React.memo(() => {
    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes);
    const { editing } = useSelector(state => state.ui);

    const noteDate = moment(active.date);
    
    const handleSave = () => {
        dispatch(startSaveNote(active));
        dispatch(finishEditingNote());
    }

    const handleEdit = () => {
        dispatch(startEditingNote());
    }

    const handleDelete = () => {
        dispatch(startDeleting(active.id));
    }
    
    return (
        <div className="notes__appbar">
            <span>{ `Created on ${noteDate.format('MMMM Do YYYY')}` }</span>

            <div>
                {
                    editing 
                    ?
                        <button 
                            className='secondary-button white'
                            onClick={ handleSave }
                        >
                            Save
                        </button>
                    :
                        <button 
                            className='secondary-button white'
                            onClick={ handleEdit }
                        >
                            Edit note
                        </button>
                }

                <button 
                    className='secondary-button white danger'
                    onClick={ handleDelete }
                    style={{marginLeft: '15px'}}
                >
                    Delete
                </button>
            </div>
        </div>
    )
});
