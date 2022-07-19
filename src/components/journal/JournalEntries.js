import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {
    
    const { notes } = useSelector(state => state.notes);
    
    return (
        <div className="journal__entries">
            {   
                notes.length === 0
                ? 
                    <p style={{color: '#ffffff', textAlign: 'center'}}>Loading...</p>
                : 
                    notes
                    .sort((note1, note2) => note2.date - note1.date)
                    .map(note => (
                        <JournalEntry 
                            key={ note.id }
                            { ...note }
                        />
                    ))
            }
        </div>
    )
}
