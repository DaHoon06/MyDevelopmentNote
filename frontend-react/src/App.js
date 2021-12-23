import React, {useState} from "react";
import './index.css'
import TodoTemplate from "./components/ToDo/TodoTemplate";
import TodoInsert from "./components/ToDo/TodoInsert";
import TodoList from "./components/ToDo/TodoList";

const App = () => {

    return (
        <TodoTemplate>
            <TodoInsert />
            <TodoList />
        </TodoTemplate>
    );
}

export default App;
