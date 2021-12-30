import {createStore} from "redux";

const divToggle = document.querySelector('.toggle');
const count = document.querySelector('h2');
const incrementBtn = document.querySelector('#increment');
const decrementBtn = document.querySelector('#decrement');

const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const toggle_switch = () => ({
    type: TOGGLE_SWITCH,
});
const increment = difference => ({
    type: INCREMENT,difference
});
const decrement = () => ({
    type: DECREMENT,
});

const initState = {
    toggle: false,
    count: 0
};

function reducer(state = initState,action){
    switch (action.type){
        case 'TOGGLE_SWITCH': {
            return {
                ...state,
                toggle: !state.toggle
            };
        }
        case 'INCREMENT': {
            return {
                ...state,
                count: state.count + action.difference
            };
        }
        case 'DECREMENT': {
            return {
                ...state,
                count: state.count - 1
            };
        }
        default: {
            return state;
        }
    }
}

const store = createStore(reducer);

const render = () => {
    const state = store.getState();

    if(state.toggle) {
        divToggle.classList.add('active');
    } else {
        divToggle.classList.remove('active');
    }
    count.innerText = state.count;
};

render();
store.subscribe(render);

divToggle.onclick = () => {
    store.dispatch(toggle_switch());
};
incrementBtn.onclick = () => {
    store.dispatch(increment(1));
};
decrementBtn.onclick = () => {
    store.dispatch(decrement());
};