import { createAction, handleActions } from 'redux-actions';

//action type 정의
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// redux-actions 사용하기전
// export const increase = () => ({type: INCREASE});
// export const decrease = () => ({type: DECREASE});

// redux-actions 사용해서 생성
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

const initialState = {
    number: 0,
};
// handleActions 를 사용하면 switch~case 문을 사용하지 않아도 된다.
const counter = handleActions(
    {
        [INCREASE]: (state, action) => ({ number: state.number + 1}),
        [DECREASE]: (state, action) => ({ number: state.number - 1}),
    },
    initialState,
)
//
// function counter(state = initialState, action) {
//     switch (action.type){
//         case INCREASE:
//             return {
//                 number: state.number + 1
//             };
//         case DECREASE:
//             return {
//                 number: state.number - 1
//             }
//         default:
//             return state;
//     }
// }

export default counter;