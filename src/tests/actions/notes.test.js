/**
 * @jest-environment node
*/

import { deleteDoc, disableNetwork, doc, getDoc } from 'firebase/firestore';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { fileUpload } from '../../helpers/fileUpload';
import * as fs from 'fs';
import { types } from '../../types/types';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: '2WQqau2FJ2jQlruydZem',
            title: 'Hola',
            body: 'Mundo'
        }
    }
}

let store = mockStore(initialState);

describe('Pruebas en las acciones de notas', () => {
    beforeEach(() => {
        store = mockStore(initialState);
    })
    
    afterAll(() => {
        disableNetwork(db);
    });

    test('debe de crear una nueva nota startNewNote', async() => {
        await store.dispatch(startNewNote());

        const actions = store.getActions();
        // console.log(actions);

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        const docId = actions[0].payload.id;
        await deleteDoc(doc(db, `/TESTING/journal/notes/${docId}`));
    });

    test('startLoadingNote debe cargar las notas', async() => {
        await store.dispatch(startLoadingNotes('TESTING'));
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }

        expect(actions[0].payload[0]).toMatchObject(expected);
    });

    test('startSaveNote debe actualizar la nota', async() => {
        const note = {
            id: '2WQqau2FJ2jQlruydZem',
            title: 'titulo',
            body: 'body'
        }

        await store.dispatch(startSaveNote(note));

        const actions = store.getActions();
        expect(actions[0].type).toBe(types.notesUpdated);

        const docRef = await getDoc(doc(db, `/TESTING/journal/notes/${note.id}`));
        expect(docRef.data().title).toBe(note.title);
    });

    test('startUploading debe de actualizar el URL del entry', async() => {
        fileUpload.mockReturnValue('https://hola-mundo.com');
        fs.writeFileSync('foto.jpg', '');
        const file = fs.readFileSync('foto.jpg');
        await store.dispatch(startUploading(file));

        const docRef = await getDoc(doc(db, `/TESTING/journal/notes/2WQqau2FJ2jQlruydZem`));
        expect(docRef.data().url).toBe('https://hola-mundo.com');
    });
    
});