import { createAction, handleActions } from "redux-actions";
import createRequestSaga,{ createRequestActionTypes } from "../lib/createRequestSaga";
import * as postAPI from '../lib/api/posts';
import { takeLatest } from "redux-saga/effects";

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FILED = 'write/CHANGE_FILED';
const [
    WRITE_POST,
    WRITE_SUCCESS,
    WRITE_FAILED,
] = createRequestActionTypes('write/WRITE_POST');

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FILED,({ key, value }) => ({
    key,
    value
}));
export const writePost = createAction(WRITE_POST,({ title, body, tags }) => ({
    title,
    body,
    tags
}));
const writePostSaga = createRequestSaga(WRITE_POST,postAPI.writePost);
export function* writeSaga() {
    yield takeLatest(WRITE_POST,writePostSaga);
}

const initialState = {
    title: '',
    body: '',
    tags: [],
    post: null,
    postError: null,
};

const write = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [CHANGE_FILED]: (state, { payload: { key,value } }) => ({
            ...state,
            [key]: value,
        }),
        [WRITE_POST]: state => ({
            ...state,
            post: null,
            postError: null,
        }),
        [WRITE_SUCCESS]: (state, { payload: post }) => ({
            ...state,
            post
        }),
        [WRITE_FAILED]: (state, { payload: postError }) => ({
            ...state,
            postError
        }),
    },
    initialState
);
export default write;


