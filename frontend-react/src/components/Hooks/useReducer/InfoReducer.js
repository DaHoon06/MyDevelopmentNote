import React,{useReducer} from "react";

function reducer(state,action) {
    return {
        ...state,
        [action.name]: action.value,
    }
}

const InfoReducer = () => {
    const [state, dispatch] = useReducer(reducer,{
        name: '',
        nickName: '',
    });

    const { name, nickName } = state;
    const onChange = (e) => { dispatch(e.target); };

    return(
        <div>
            <div>
                <input type='text' name='name' value={name} onChange={onChange} />
                <input type='text' name='nickName' value={nickName} onChange={onChange} />
            </div>
            <div>
                <p>이름 : {name}</p>
                <p>닉네임 : {nickName}</p>
            </div>
        </div>
    )
}

export default InfoReducer;