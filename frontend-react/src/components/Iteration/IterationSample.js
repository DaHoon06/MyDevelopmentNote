import React,{useState} from "react";

const IterationSample = () => {
    const [name,setName] = useState([
        {id: 1, text: '봄'},
        {id: 2, text: '여름'},
        {id: 3, text: '가을'},
        {id: 4, text: '겨울'},
    ]);
    const [inputText,setInputText] = useState('');
    const [nextId,setNextId] = useState(5);

    const nameList = name.map(name => <li key={name.id}>{name.text}</li>)
    return (
        <div>
            <ul>
                <li>{nameList}</li>
            </ul>
        </div>
    );
};

export default IterationSample;