import './App.css';
import React, {useState} from "react";
import Info from "./components/Hooks/useState/Info";
import Counter from "./components/Hooks/useReducer/Counter";
import InfoReducer from "./components/Hooks/useReducer/InfoReducer";
import Average from "./components/Hooks/useMemo/Average";
import SassComponent from "./components/CssSample/SassComponent";

const App = () => {
    const [visible, setVisible] = useState(false);
    return (
        <div className="App">
            <button onClick={() => {
                setVisible(!visible);
            }}>{visible ? '숨기기' : '보이기'}</button>
            <hr />
            {visible && <Info />}
            <InfoReducer />
            <br/><br/><br/>
            <Average />
            <br/><br/><br/>
            <SassComponent />
        </div>
    );
}

export default App;
