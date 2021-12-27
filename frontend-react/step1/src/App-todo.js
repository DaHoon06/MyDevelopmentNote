import React, {useCallback, useRef, useState} from "react";
import './index.css'
import TodoTemplate from "./components/ToDo/TodoTemplate";
import TodoInsert from "./components/ToDo/TodoInsert";
import TodoList from "./components/ToDo/TodoList";

const AppTodo = () => {
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: 'React 기초',
            checked: true,
        },
        {
            id: 2,
            text: 'Vue 기초',
            checked: false,
        },
        {
            id: 3,
            text: 'Node 기초',
            checked: false,
        }
    ]);
    const nextId = useRef(4);
    const onInsert = useCallback(
        text => {
            const todo = {
                id: nextId.current,
                text,
                checked: false,
            };
            setTodos(todos.concat(todo));
            nextId.current += 1;
        },
        [todos],
    );
    const onRemove = useCallback(
        id => {
            setTodos(todos.filter(todo => todo.id !== id));
        },[todos],
    );
    const onToggle = useCallback(
        id => {
            setTodos(
                todos.map(todo => todo.id === id ? { ...todo,checked: !todo.checked } : todo),
            );
        },
        [todos]
    );

    return (
        <TodoTemplate>
            <TodoInsert onInsert={ onInsert } />
            <TodoList todos={ todos } onRemove={onRemove} onToggle={onToggle} />
        </TodoTemplate>
    );
};

export default AppTodo;
