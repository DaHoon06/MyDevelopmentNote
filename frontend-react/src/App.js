import './App.css';
import React, {useState} from "react";
import Info from "./components/Hooks/useState/Info";
import Counter from "./components/Hooks/useReducer/Counter";
import InfoReducer from "./components/Hooks/useReducer/InfoReducer";
import Average from "./components/Hooks/useMemo/Average";
import SassComponent from "./components/CssSample/SassComponent";
import CSSModule from "./components/CssSample/CSSModule";
import StyledComponent from "./components/CssSample/StyledComponent";

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
            <br/><br/><br/>
            <CSSModule />
            <br/><br/><br/>
            <StyledComponent />
        </div>
    );
}

export default App;
