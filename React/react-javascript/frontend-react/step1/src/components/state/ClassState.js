import React, {Component} from "react";

class ClassState extends Component {
    // 1. 첫번째 초기값 설정 방법
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            fixedNumber: 21
        };
    }
    // 2. 두번째 초기값 설정 방법
    state = {
        number2: 0,
        fixedNumber2: 21,
    }
    render() {
        const { number, fixedNumber } = this.state;
        return (
            <div>
                <h1>{number}</h1>
                <button onClick={
                    () => {
                        this.setState({number: number + 1});
                    }
                }>+1</button>
                <p>바뀌지 않는 숫자 : {fixedNumber}</p>

            </div>
        );
    }
}
export default ClassState;