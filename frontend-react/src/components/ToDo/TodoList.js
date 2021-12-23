import TodoListItem from "./TodoListItem";
import  '../../css/ToDo/TodoList.scss'

const TodoList = () => {
    return(
        <div className='TodoList'>
            <TodoListItem />
            <TodoListItem />
            <TodoListItem />
        </div>
    )
}

export default TodoList;