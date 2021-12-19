import useInputs from "./useInputs";
import React from "react";

const useCustomHook = () => {
    const [state, onChange] = useInputs({
        name: '',
        nickName: '',
    });
    const { name, nickName } = state;

    return(
        <div>
            <input name='name' value={name} onChange={onChange} />
            <input name='nickName' value={nickName} onChange={onChange} />
            <div>
                <p>이름 : {name}</p>
                <p>닉네임 : {nickName}</p>
            </div>
        </div>
    )
}

export default useCustomHook;