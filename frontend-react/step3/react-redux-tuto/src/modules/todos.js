import { handleActions } from "redux-actions";

const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

export const changeInput = input => ({
    type: CHANGE_INPUT,
    input
});

let id = 3;
export const insert = text => ({
    type: INSERT,
    todo: {
        id: id++,
        text,
        done: false
    }
});

export const toggle = id => ({
    type: TOGGLE,
    id
});

export const remove = id => ({
    type: REMOVE,
    id
});

const initialState = {
    input: '',
    todos: [
        {
          id: 1,
          text: 'Basic redux',
          done: true,
        },
        {
            id: 2,
            text: 'Basic react',
            done: false,
        },
    ]
};
const todos = handleActions(
    {
        [CHANGE_INPUT]: (state, { payload: input }) => ({ ...state, input }),
        [INSERT]: (state, { payload: todo }) => ({
            ...state,
            todos: state.todos.concat(todo),
        }),
        [TOGGLE]: (state, { payload: id }) => ({
            ...state,
            todos: state.todos.map(
                todo => todo.id === id ? { ...todo, done: !todo.done } : todo
            ),
        }),
        [REMOVE]: (state, { payload: id}) => ({
            ...state,
            todos: state.todos.filter(todo => todo.id !== id)
        })
    }, initialState,);
export default todos;