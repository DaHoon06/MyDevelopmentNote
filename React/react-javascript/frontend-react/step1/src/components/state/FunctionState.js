import React, {useState} from "react";

const FunctionState = () => {
    const [msg, setMsg] = useState('빈 문자열');
    const onClickEnter = () => setMsg('함수형 State 설정');

    const [color, setColor] = useState('BLACK');
    const onClickColor = () => setColor('RED');

    return(
        <div>
            <button onClick={onClickEnter}>버튼</button>
            <p>{msg}</p>
            <button onClick={onClickColor}>빨강</button>
            <p>{color}</p>
        </div>
    );
}

export default FunctionState;