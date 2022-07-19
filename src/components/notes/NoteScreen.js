import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import { activateNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

import '/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { finishEditingNote, startEditingNote } from '../../actions/ui';

export const NoteScreen = () => {
    const dispatch = useDispatch();
    const { active: activeNote } = useSelector(state => state.notes);
    const { editing } = useSelector(state => state.ui);

    const [formValues, handleInputChange, reset] = useForm(activeNote);
    const [body, setBody] = useState(activeNote.body);
    const { title } = formValues;

    const activeId = useRef(activeNote.id);

    const [editorState, setEditorState] = React.useState(
        () => EditorState.createWithContent(convertFromRaw(JSON.parse(body)))
    );

    const changeEditorState = (newEditorState) => {
        const contentState = newEditorState.getCurrentContent();
        
        setBody(JSON.stringify(convertToRaw(contentState)));
        setEditorState(newEditorState);
    }

    useEffect(() => {
        if(activeNote.id !== activeId.current) {
            reset(activeNote);
            setBody(activeNote.body);
            dispatch(finishEditingNote());

            if(!activeNote.title) {
                dispatch(startEditingNote());
            };

            setEditorState(
                () => EditorState.createWithContent(convertFromRaw(JSON.parse(activeNote.body)))
            )
            activeId.current = activeNote.id;
        }
    }, [activeNote, reset, dispatch]);

    useEffect(() => {
        dispatch(activateNote(formValues.id, {...formValues, body}));
    }, [formValues, dispatch, body]);

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Title"
                    className={`notes__title-input ${editing && 'active'}`}
                    autoComplete="off"
                    name="title"
                    disabled={ !editing && 'disabled'}
                    value={ title }
                    onChange={ handleInputChange }
                />

                <Editor
                    readOnly={ !editing }
                    toolbarHidden={ !editing }
                    editorState={ editorState }
                    onEditorStateChange={ changeEditorState }
                    wrapperClassName={`notes__editor ${editing && 'active'}`}
                    toolbarClassName="notes__toolbar"
                    editorClassName="notes__area"
                    placeholder="Write your note..."
                />
            </div>
        </div>
    )
}
