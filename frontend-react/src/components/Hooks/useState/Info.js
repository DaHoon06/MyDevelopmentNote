import React,{useState, useEffect} from "react";

const Info = () => {
    const [name, setName] = useState('');
    const [nickName, setNickName] = useState('');

    useEffect(() => {
        console.log('렌더링이 완료되었습니다.');
        console.log({name,nickName});
        return() => {
            console.log('clean');
        }
    },[name]);

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const onChangeNick = (e) => {
        setNickName(e.target.value);
    };

    return(
        <div>
            <div>
                <input type='text' value={name} onChange={onChangeName} />
                <input type='text' value={nickName} onChange={onChangeNick} />
            </div>
            <div>
                <p>이름 : {name}</p>
                <p>닉네임 : {nickName}</p>
            </div>
        </div>
    )
}

export default Info;