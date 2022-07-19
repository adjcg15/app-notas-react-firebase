import { types } from '../types/types';

export const setError = (err) => ({
    type: types.uiSetError,
    payload: err
});

export const unsetError = () => ({
    type: types.uiRemoveError
});

export const startLoading = () => ({
    type: types.uiStartLoading
});

export const finishLoading = () => ({
    type: types.uiFinishLoading
});

export const startEditingNote = () => ({
    type: types.uiStartEditing
});

export const finishEditingNote = () => ({
    type: types.uiFinishEditing
});