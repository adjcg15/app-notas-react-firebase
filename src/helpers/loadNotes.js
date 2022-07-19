import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const loadNotes = async (uid) => {
    const notesSnap = await getDocs(query(collection(db, `${uid}/journal/notes`)));
    const notes = [];

    notesSnap.forEach(note => {
        notes.push({
            id: note.id,
            ...note.data()
        });
    });

    return notes;
}