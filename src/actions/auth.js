import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebaseConfig';
import Swal from 'sweetalert2';

import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());

        const auth = getAuth();

        return signInWithEmailAndPassword(auth, email, password)
            .then( ({user}) => {
                dispatch(
                    login(user.uid, user.displayName)
                );

                dispatch(finishLoading());
            })
            .catch( e => {
                
                dispatch(finishLoading());

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'User not found, wrong email or password'
                });
            });
    }
}

export const startRegister = (email, password, name) => {
    return (dispatch) => {
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then( async({user}) => {
                await updateProfile(user, {displayName:name});

                dispatch(
                    login(user.uid, user.displayName)
                );
            })
            .catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Email already registered or the password don\'t match'
                });
            })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth();

        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) => {
                dispatch(login(user.uid, user.displayName));
            })
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

export const startLogout = () => {
    return async(dispatch) => {
        const auth = getAuth();
        await signOut(auth);

        dispatch(logout());
        dispatch(noteLogout());
    }
}

export const logout = () => ({
    type: types.logout
})