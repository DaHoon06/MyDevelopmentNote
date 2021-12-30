import React, { useCallback } from "react";
import Counter from "../components/Counter";
import { useDispatch, useSelector } from 'react-redux';
import { increase, decrease } from "../modules/counter";

const CounterContainer = () => {
    const number = useSelector(state => state.counter.number);
    const dispatch = useDispatch();
    const onIncrease = useCallback(() => dispatch(increase()),[dispatch]);
    const onDecrease = useCallback(() => dispatch(decrease()),[dispatch]);

    return (
        <Counter
            number={number}
            onIncrement={onIncrease()}
            onDecrement={onDecrease()}
        />
    );
};

export default CounterContainer;


//---------------  connect 함수를 사용  --------------
// // 함수를 미리 선언하지 않고 내부에 선언하여 사용
// export default connect(
//     state => ({
//         number: state.counter.number,
//     }),
//     // dispatch => ({
//     //     increase: () => dispatch(increase()),
//     //     decrease: () => dispatch(decrease()),
//     // }),
//     {
//                 increase,
//                 decrease
//                 }, // 객체 형태로 사용하면 connect 함수가 bindActionCreators 역할을 대신한다.
// )(CounterContainer);


// 함수를 미리 선언해서 사용하는 방법
// const mapStateToProps = state => ({
//     number: state.counter.number,
// });
// const mapDispatchToProps = dispatch => ({
//     increase: () => {
//         dispatch(increase());
//     },
//     decrease: () => {
//         dispatch(decrease());
//     },
// });
// /**
//  * mapStateToProps, mapDispatchToProps -> 반환하는 객체 내부의 값들이 컴포넌트의 props로 전달 됨.
//  *
//  * mapStateToProps : state룰 파라미터로 받아온다. -> 현재 스토어가 지니고 있는 상태값
//  * mapDispatchToProps : store의 내장 함수 dispatch를 파라미터로 받아온다.
//  */
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(CounterContainer);