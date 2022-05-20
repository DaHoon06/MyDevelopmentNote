import { combineReducers } from 'redux';
import counter from "./counter";
import todos from "./todos";

// createStore 를 통하여 reducer 를 만들경우에는 하나의 reducer 만 사용가능함으로 하나의 파일에 각각의 reducer 를 합쳐준다.

const rootReducer = combineReducers({
    counter,
    todos
});

export default rootReducer;