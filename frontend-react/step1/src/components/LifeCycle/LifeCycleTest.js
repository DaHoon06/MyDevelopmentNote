import React, {Component} from "react";

class LifeCycleTest extends Component {
    state = {
        number: 0,
        color: null,
    }

    myRef = null;

    constructor(props) {
        super(props);
        console.log('생성자');
    }
    /*
    * getDerivedStateFromProps
    * props로 받아온 값을 state로 동기화 시키는 용도
    *
    * 컴포넌트가 업데이트 및 마운트 될 때 호출됨.
    * */
    static getDerivedStateFromProps(nextProps,prevState){
        console.log('getDerivedStateFromProps');
        if(nextProps.color !== prevState.color){
            return {color: nextProps.color};
        }
        return null;
    }
    // 컴포넌트를 만들고 첫 렌더링을 끝마친 후에 실행
    componentDidMount() {
        console.log('componentDidMount')
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log('shouldComponentUpdate')
        return nextState.number % 10 !== 4;
    }
    // 컴포넌트를 DOM에서 제거할 때 실행된다.
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    clickEvent = () => {
        this.setState({
            number: this.state.number + 1,
        });
    }
    // 렌더링 된 후 실제 값들이 화면에 보여주기 직전에 사용된다.
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('getSnapshotBeforeUpdate');
        if(prevProps.color !== this.props.color){
            return this.myRef.style.color;
        }
        return null;
    }
    // 렌더링 중에 에러가 발생했을 경우 UI에 에러를 보여줌
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate',prevProps,prevState);
        if(snapshot){
            console.log('업데이트 직전 색상',snapshot);
        }
    }

    render() {
        console.log('rendering...')
        const style = {
            color: this.props.color,
        }
        return (
            <div>
                <h3 style={style} ref={ref => this.myRef=ref}>{this.state.number}</h3>
                <p>color : {this.state.color}</p>
                <button onClick={this.clickEvent}>더하기</button>
            </div>
        );
    }
}

export default LifeCycleTest;