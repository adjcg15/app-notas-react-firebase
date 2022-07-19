import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if(user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);

                dispatch(startLoadingNotes(user.uid));
            } else {
                setIsLoggedIn(false);
            }

            setChecking(false);
        });

    }, [dispatch, setChecking, setIsLoggedIn]);

    if(checking) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <Router>
            <Routes>
                <Route path="/*" element= {
                    <PublicRoute auth={ isLoggedIn }>
                        <AuthRouter />
                    </PublicRoute>
                } />
                
                <Route path="/journal" element={ 
                    <PrivateRoute auth={ isLoggedIn }>
                        <JournalScreen />
                    </PrivateRoute>
                } />
                
            </Routes>
        </Router>
    )
}
