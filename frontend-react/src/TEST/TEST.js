/*
* immer 핵심 -> 불변성에 신경 쓰지않는 것처럼 코드를 작성하지만 불변성 관리를 제대로 해주는 것!!!
* */
import produce from "immer";
import {useCallback, useState} from "react";

/*
* 첫번째 파라미터 : 수정하고 싶은 상태
* 두번째 파라미터 : 어떻게 업데이트할지 정의하는 함수
* */
const originalState = [
    {
        id: 1,
        todo: 'TEST',
        checked: true
    },
    {
        id: 1,
        todo: 'TEST',
        checked: true
    }
];

const nextState = produce(originalState, draft => {
    const todo = draft.find(t => t.id === 2);
    todo.checked = true;

    draft.push({
        id: 3,
        todo: 'TEST3',
        checked: false,
    });

    draft.splice(draft.findIndex(t => t.id === 1),1);
})

/**
 * useState 의 함수형 업데이트와 immer
 */
const [number,setNumber] = useState(0);
const onIncrease = useCallback(
    () => setNumber(prevNumber => prevNumber + 1),[],
);

const update = produce(draft => {
    draft.value = 2;
});
const originalState = {
    value: 1,
    foo: 'bar',
};
const nextState = update(originalState);
console.log(nextState);
