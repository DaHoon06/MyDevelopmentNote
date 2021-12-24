import { MdAdd } from "react-icons/all";
import '../../css/ToDo/TodoInsert.scss'
import {useCallback, useState} from "react";

const TodoInsert = () => {
    const [value,setValue] = useState('');

    //useCallback -> 해당 함수를 한번 사용하고 버리는게 아니라 재사용하기 위해 useCallback Hook 사용
    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);
    return(
        <form className='TodoInsert'>
            <input placeholder='할 일을 입력하세요.' value={value} onChange={onChange} />
            <button type='submit'>
                <MdAdd />
            </button>
        </form>
    );
};

export default TodoInsert;