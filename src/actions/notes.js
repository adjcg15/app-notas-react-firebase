import Swal from 'sweetalert2';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';
import { fileUpload } from '../helpers/fileUpload';

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '{"blocks":[{"key":"bnen1","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
            date: new Date().getTime()
        }

        try {
            const doc = await addDoc(collection(db, `${ uid }`, "journal/notes"), newNote);

            dispatch(activateNote(doc.id, newNote));
            dispatch(addNewNote(doc.id, newNote));
        } catch(error) {
            console.log(error);
        }
    }
}

export const activateNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id, 
        ...note
    }
});

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = (note) => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;

        if(!note.url) {
            delete note.url
        }

        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        await updateDoc(doc(db, `${uid}/journal/notes/${note.id}`), noteToFirestore);
        
        dispatch(refreshNote(note.id, note));
        
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
          
        Toast.fire({
            icon: 'success',
            title: 'Note saved!',
            iconColor: '#F76E11',
        })
    }
}

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});

export const startUploading = (file) => {
    return async(dispatch, getState) => {
        const { active:activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading()
            }
        })

        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;

        dispatch(startSaveNote(activeNote));

        Swal.close();
    }
}

export const startDeleting = (id) => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;

        Swal.fire({
            width: 450,
            title: 'Are you sure you want to delete this note?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            iconColor: '#F76E11',
            color: '#1B1A17',
            showCancelButton: true,
            cancelButtonText: 'Keep note',
            confirmButtonText: 'Yes, delete',
            confirmButtonColor: '#F76E11'
        }).then((result) => {
            if(result.isConfirmed) {
                deleteDoc(doc(db, `${uid}/journal/notes/${id}`));
                dispatch(deleteNote(id));
                Swal.fire(
                    'Deleted!',
                    'Your note has been deleted.',
                    'success'
                )
            }
        })
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});