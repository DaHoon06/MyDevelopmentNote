import counter, { counterSaga } from "./counter";
import { all } from 'redux-saga/effects';
import { combineReducers } from "redux";
import sample, { sampleSaga } from "./sample";
import loading from "./loading";

const rootReducer = combineReducers({
    counter,
    sample,
    loading
});

export function* rootSaga() {
    // all -> Saga를 합쳐주는 역할
    yield all([
        counterSaga(),
        sampleSaga()
    ])
}

export default rootReducer;