import React, {useState} from "react";
import './index.css'
import TodoTemplate from "./components/ToDo/TodoTemplate";
import TodoInsert from "./components/ToDo/TodoInsert";
import TodoList from "./components/ToDo/TodoList";

const App = () => {
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
    ])
    return (
        <TodoTemplate>
            <TodoInsert />
            <TodoList todos={todos} />
        </TodoTemplate>
    );
}

export default App;
