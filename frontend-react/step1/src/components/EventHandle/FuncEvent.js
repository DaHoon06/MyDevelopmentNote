import React, { useState } from "react";

const FuncEvent = () => {
    const [username, setUsername] = useState('');
    const [message,setMessage] = useState('');

    const onClickUserName = (e) => {
        setUsername(e.target.value);
    }
    const onClickMessage = (e) => {
        setMessage(e.target.value);
    }
    const onClick = () => {
        alert(username, message);
        setUsername('');
        setMessage('');
    }

    return(
        <div>
            <h2>이벤트 핸들링</h2>
            <input type='text' name='username' placeholder='사용자명' onChange={
                onClickUserName
            } value={username}/>
            <input type='text' name='message' placeholder='아무거나' value={message} onChange={this.handleChange} />
            <button onClick={onClick}>확인</button>
        </div>
    )
}