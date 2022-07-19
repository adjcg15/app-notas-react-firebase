import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { activateNote, startSaveNote } from '../../actions/notes';
import Swal from 'sweetalert2';
import { finishEditingNote } from '../../actions/ui';

export const JournalEntry = ({ id, date, title, body, url }) => {
    const dispatch = useDispatch();
    const { editing } = useSelector(state => state.ui);
    const { active } = useSelector(state => state.notes);

    const [isActive, setIsActive] = useState(false);

    const activeNoteId = active?.id;
    const noteId = useRef(id);
    
    const noteDate = moment(date);

    useEffect(() => {
        if(noteId.current === activeNoteId) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [activeNoteId]);

    const handleEntryClick = () => {
        if(editing) {
            Swal.fire({
                width: 450,
                title: 'Unsaved changes!',
                text: 'You\'re editing a note and haven\'t saved your changes yet',
                icon: 'warning',
                iconColor: '#F76E11',
                color: '#1B1A17',
                showCancelButton: true,
                cancelButtonText: 'Discard changes',
                confirmButtonText: 'Save changes',
                confirmButtonColor: '#F76E11'
            }).then((result) => {
                if(result.isConfirmed) {
                    dispatch(startSaveNote(active));
                    dispatch(finishEditingNote());
                }
            })
        } else {
            dispatch(
                activateNote(id, {
                    date, title, body, url
                })
            );
        }
        
    }
    
    return (
        <div 
            className={`journal__entry pointer ${isActive && 'active'}`}
            onClick={ handleEntryClick }
        >
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { title }
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{ noteDate.format('MMMM') }</span>
                <h4>{ noteDate.format('Do') }</h4>
            </div>
        </div>
    )
}
