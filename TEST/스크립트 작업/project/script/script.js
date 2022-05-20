//SAMPLE DATA
let SQ8_RawData = {1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10', 11: '11', 12: '12', 13: '13', 14: '14', 15: '15', 16: '16', 17: '17', 18: '18', 19: '19', 20: '20', 21: '21', 22: '22', 23: '23', 24: '24', 25: '25', 26: '26', 27: '27', 28: '28', 29: '29', 30: '30', RANDOM_RESULT: '29,12,19,26,17,4,11,2,3,22,18,20,21,16,6,14,5,28,13,1,9,10,30,27,7,23,15,25,8,24,99', NAME: 'SQ8', SEQ: 2};
let SQ8X1_RawData = {7:'7',8: '8',10:'10',11:'11',18:'18',20: '20', 21: '21', 22: '22', 23: '23', RANDOM_RESULT: '13,7,26,25,30,6,27,10,16,15,28,9,12,8,3,19,4,23,22,29,1,11,18,5,21,17,2,20,24,14,99', NAME: 'SQ8X1', DT: '2021-11-24T04:12:05.523Z', SEQ: 3}
let japanBrand = ['16','17','18','19','20','21','28','29','30'];
let notSelected = ['22','23','24','25','26','27'];

let SQ8 = SQ8_DATA();
let SQ8X1 = SQ8X1_DATA();
//일본 브랜드 리스트
let SQ8_JapanBrand_List = SQ8_JAPAN();
let SQ8X1_JapanBrand_List = SQ8X1_JAPAN();

let result = [];



//초기값 설정 -> 예외인 값을 애초에 처리
const SQ8_DATA = () => {
    for(let i = 1; i <= 30; i++){
        if(notSelected.indexOf(SQ8_RawData[i] === -1)){
            if(SQ8_RawData[i]){
                SQ8.push(SQ8_RawData[i]);
            }
        }
    }
    return SQ8;
}
const SQ8X1_DATA = () => {
    for(let i = 1; i <= 30; i++){
        if(notSelected.indexOf(SQ8X1_RawData[i] === -1)){
            if(SQ8X1_RawData[i]){
                SQ8X1.push(SQ8X1_RawData[i]);
            }
        }
    }
    return SQ8X1;
}



//일본 브랜드 리스트
const SQ8_JAPAN = () => {
    return japanBrand.filter((value) => {
        return SQ8_RawData[value];
    })
}
const SQ8X1_JAPAN = () => {
    return japanBrand.filter((value) => {
        return SQ8X1_RawData[value];
    })
}
