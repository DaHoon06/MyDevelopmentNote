// ------------   테이블 행 임의 추가  ----------------------------
var row = $('tbody > tr', '.pure-table').length;
var num = 1;
for (var i = 0; i < row; i += 2) {
    $('tbody > tr:eq(' + i + ") > td:eq(" + 0 + ')', ".pure-table").attr('rowspan', 2)
    $('tbody > tr:eq(' + num + ") > td:eq(" + 0 + ')', ".pure-table").remove();
    num += 2;
}

//2번째 줄 tr 앞에 td추가
//first, last, even, odd
$('[question-name=Q15] table tbody tr:first').prepend("<td rowspan='1' style='width:20%;background-color: #fffff;font-weight:bold;font-size:13px;text-align:center'>'나트륨 50% 저감' 표시</td>");
$('.first-th').css('width', '50%');

$('[question-name=Q15] table thead .first-th').attr('colspan', '2');
$('[question-name=Q15] table thead .first-th').after('<th style="width: 30%">의미</th>');

for (var i = 1; i < 4; i++) {
    switch (i) {
        case 1:
            $('tbody > tr:eq(' + i + ")", '.pure-table').prepend('<td rowspan=\'1\' style=\'width:20%;background-color: #fffff;font-weight:bold;font-size:13px;text-align:center\'>\'무가당\' 표시</td>');
            break;
        case 2:
            $('tbody > tr:eq(' + i + ")", '.pure-table').prepend('<td rowspan=\'1\' style=\'width:20%;background-color: #fffff;font-weight:bold;font-size:13px;text-align:center\'>\'무설탕\' 표시</td>');
            break;
        case 3:
            $('tbody > tr:eq(' + i + ")", '.pure-table').prepend('<td rowspan=\'1\' style=\'width:20%;background-color: #fffff;font-weight:bold;font-size:13px;text-align:center\'>\'무가염\' 표시</td>');
            break;

    }
}


// 0 ~ 2 합치기
var row = $('tbody > tr', '.pure-table').length;
var num = 1;

for(var i = 0; i < row; i += 3) {
    $('tbody > tr:eq(' + i + ')', ".pure-table").attr('rowspan', 3)
    for (var j = 1; j < row; j++) {
        $('tbody > tr:eq(' + i + ") > td:eq(" + j + ')', ".pure-table").remove();
    }
    num += 3;
}

var size = $('.s-gradeclick').length;

for(var i = 0; i < size; i++){
    $('.answer-unit-box').eq(i).children().find('.value').text();
}

var akeyValue = ['8','21','','','','','','','',''];
//$('.s-gradeclick[akey="'+akeyValue[i]+'"]').children().find('span').val();







var count = AO['B0_2']; // 자녀 수 선택
count = count[1];

var A = ['A_1','A_2','A_3','A_4'];
var B = ['B_1','B_2','B_3','B_4'];

var result_a = [];
var result_b = [];

for(var i = 0; i < count; i++){
    // 필요한 값 B_1~x, C_1~x
    result_a = AO['B2'][A[i]];
    result_b = AO['B2'][B[i]];

    if(result_a === '1'){
        $('.check-value').eq(i).append('( 아들 /');
    } else if(result_a === '2'){
        $('.check-value').eq(i).append('( 딸 /');
    }
    //C
    if(result_b === '1'){
        $('.check-value').eq(i).append(' 0~9세 )');
    } else if(result_b === '2'){
        $('.check-value').eq(i).append(' 10~19세 )');
    } else if(result_b === '3') {
        $('.check-value').eq(i).append(' 20~29세 )');
    }
}

// --- 변경 전 ----
var A = ['A_1','A_2','A_3','A_4'];
var B = ['B_1','B_2','B_3','B_4'];
var C = ['C_1','C_2','C_3','C_4'];

var result_a = [];
var result_b = [];
var result_c = [];
var check = 0;

for(var i = 0; i < 4; i++){
    result_a = AO['B2'][A[i]];
    result_b = AO['B2'][B[i]];
    result_c = AO['B2'][C[i]];

    var isB3Value = AO['B3'][''+(i+1)]

    if(isB3Value){
        if(result_a === '1' && (result_c === '1' || result_c === '2' || result_c === '3')){

            if(result_b === '1'){
                $('tbody tr').eq(check).find('td').eq(0).append('( 아들 /');
            } else if(result_b === '2'){
                $('tbody tr').eq(check).find('td').eq(0).append('( 딸 /');
            }

            if(result_c === '1'){
                $('tbody tr').eq(check).find('td').eq(0).append(' 0~9세 )');
            } else if(result_c === '2'){
                $('tbody tr').eq(check).find('td').eq(0).append(' 10~19세 )');
            } else if(result_c === '3') {
                $('tbody tr').eq(check).find('td').eq(0).append(' 20~29세 )');
            }
            check++;
        }
    }
}

// ---- 변경 후 ----
var A = ['A_1','A_2','A_3','A_4'];
var B = ['B_1','B_2','B_3','B_4'];

var result_a = [];
var result_b = [];
var check = 0;

for(var i = 0; i < 4; i++){
    result_a = AO['B2'][A[i]];
    result_b = AO['B2'][B[i]];

    var isB3Value = AO['B3'][''+(i+1)]
    if(isB3Value){
            if(result_a === '1'){
                $('tbody tr').eq(check).find('td').eq(0).append('( 아들 /');
            } else if(result_a === '2'){
                $('tbody tr').eq(check).find('td').eq(0).append('( 딸 /');
            }

            if(result_b === '1'){
                $('tbody tr').eq(check).find('td').eq(0).append(' 0~9세 )');
            } else if(result_b === '2'){
                $('tbody tr').eq(check).find('td').eq(0).append(' 10~19세 )');
            } else if(result_b === '3') {
                $('tbody tr').eq(check).find('td').eq(0).append(' 20~29세 )');
            }
            check++;
    }
}

$('input[id^=B2_B_][hkey][vkey]').on('click change',function(){
    $('input[id^=B2_B_][hkey][vkey]').removeAttr('disabled').show();
    $('input[id^=B2_B_][hkey][vkey]:checked').each(function(){
        var vkey=Number($(this).attr('vkey'));
        var hkey=Number($('[id^=B2_B_][vkey="'+vkey+'"]:checked').attr('hkey'));
        $('input[id^=B2_B_][hkey][vkey]').each(function(){
            var targetHkey=Number($(this).attr('hkey'));
            var targetVkey=Number($(this).attr('vkey'));
            if(vkey<targetVkey){
                if(hkey<targetHkey){
                    $(this).attr('disabled','disabled').hide();
                    if($(this).prop('checked')){
                        $(this).prop('checked',false).trigger('change');
                    }
                }
            }
        });
    });
}).eq(0).trigger('change');



var count = AO['B0_2']; // 자녀 수 선택
count = count[1];

var A = ['A_1','A_2','A_3','A_4'];
var B = ['B_1','B_2','B_3','B_4'];

var result_a = [];
var result_b = [];

var check = 0;
for(var i = 0; i < count; i++) {
    result_a = AO['B2'][A[i]];
    result_b = AO['B2'][B[i]];

    if (result_b === '1' || result_b === '2' || result_b === '3'){
        if (result_a === '1') {
            $('.check-value').eq(check).append('( 아들 /');
        } else if (result_a === '2') {
            $('.check-value').eq(check).append('( 딸 /');
        }

    if (result_b === '1') {
        $('.check-value').eq(check).append(' 0~9세 )');
    } else if (result_b === '2') {
        $('.check-value').eq(check).append(' 10~19세 )');
    } else if (result_b === '3') {
        $('.check-value').eq(check).append(' 20~29세 )');
    }
    check++;
    }
}



$(document).ready(function(){
    $('.answer-unit-selected').find('input').click();
    var japanBrandList = ['16','17','18','19','20','21','28','29','30'];
    var ExceptList = ['22','23','24','25','26','27'];
    var SQ8_1_DATA = AO['SQ8X1'];
    var SQ8_DATA = AO['SQ8'];

//총 선택해야하는 수
    var SQ8_SELECT_CNT = getSQ8SelectCnt();
    var SQ8_1_SELECT_CNT = getSQ8_1_SelectCnt();

//문항별 값 배열
    var SQ8_DATA_ARR = getSelectSQ8_Data();
    var SQ8_1_DATA_ARR = getSelectSQ8_1_Data();


// SQ8_1 에서 선택된 일본브랜드의 개수
    var japanLength_SQ8_1 = japanBrandList.filter(function(a){
        return SQ8_1_DATA[a];
    }).length;


// 기본으로 선택되어야 하는 일본 브랜드에 대한 배열
    var defaultSelectBrand = japanBrandList.filter(function(a){
        return SQ8_1_DATA[a];
    });

    var defaultSelectBrandSQ8 = japanBrandList.filter(function(a){
        return SQ8_DATA[a];
    });

    var result = [];
    if(SQ8_1_SELECT_CNT>=6){
        // SQ8_1에서만 다 선택
        // 일본 브랜드 개수 확인 후 조건
        if(japanLength_SQ8_1>=6){
            // 일본 브랜드를 6개 다 구매시 진행 로직
            // defaultSelectBrand
            // 일본 브랜드 중 6개 선택 ;
            while(result.length < 6){
                var randomResult = Math.floor(Math.random()*defaultSelectBrand.length);
                var randomValue = defaultSelectBrand[randomResult];
                if(result.indexOf(randomValue) === -1) result.push(randomValue);
            }
            console.log(result.sort())
        }else{
            // 일본 브랜드6개 미만,  타브랜드로 채우기용
            // SQ8_1의 나머지 브랜드 중에서 일부 채우기
            var result = defaultSelectBrand;
            var INNER_SQ8_1 = SQ8_1_DATA_ARR;
            while(result.length < 6){
                var randomResult = Math.floor(Math.random()*INNER_SQ8_1.length);
                var randomValue = INNER_SQ8_1[randomResult];
                if(result.indexOf(randomValue) === -1)  result.push(randomValue);
            }
            console.log(result.sort());
        }
    }else{
        if(SQ8_SELECT_CNT>=6){
            //6개 이상으로 선택시 실행
            // 1. SQ8_1에서 선택한 값 전부 선택
            // 2. 6-SQ8_1_CNT의 개수를 SQ8에서 랜덤으로 선택
            // 주의 : SQ8_1에서 중복되지 않은값으로 선택필요
            var extraJapanBrandLength = SQ8_1_DATA_ARR.length+(defaultSelectBrandSQ8.length-defaultSelectBrand.length);

            if(extraJapanBrandLength>=6){
                // SQ8_1 6개 미만 선택
                // SQ8의 선택된 일본브랜드를 합쳐서 6개 이상이 될 때
                result = SQ8_1_DATA_ARR;
                var INNER_SQ8 = defaultSelectBrandSQ8;

                while(result.length < 6){
                    var randomResult = Math.floor(Math.random()*INNER_SQ8.length);
                    var randomValue = INNER_SQ8[randomResult]
                    if(result.indexOf(randomValue) === -1) result.push(INNER_SQ8[randomResult]);
                }
            }else{
                // SQ8_1 6개 미만
                // SQ8의 선택된 일본브랜드 합쳐도 6개가 되지 않을때
                result = SQ8_1_DATA_ARR;
                INNER_SQ8 = SQ8_DATA_ARR;
                defaultSelectBrandSQ8.filter(function(a){
                    if(defaultSelectBrand.indexOf(a) === -1) result.push(a);
                    return true;
                });

                while(result.length < 6){
                    var randomResult = Math.floor(Math.random()*INNER_SQ8.length);
                    var randomValue = INNER_SQ8[randomResult]
                    if(result.indexOf(randomValue) === -1) result.push(INNER_SQ8[randomResult]);
                }
            }

        }else{
            result = SQ8_DATA_ARR;
            console.log('d')
            console.log(result)
        }
    }
//초기 값
function getSQ8SelectCnt(){
    var result = 0;
    for(var i=1; i<=30; i++){
        if(ExceptList.indexOf(i+'') === -1){
            if(SQ8_DATA[i]) result++;
        }
    }
    return result;
}
function getSQ8_1_SelectCnt(){
    var result = 0;
    for(var i=1; i<=30; i++){
        if(ExceptList.indexOf(i+'') === -1){
            if(SQ8_1_DATA[i]) result++;
        }
    }
    return result;
}

function getSelectSQ8_Data(){
    var result = [];
    for(var i=1; i<=30; i++){
        if(ExceptList.indexOf(i+'') === -1){
            if(SQ8_DATA[i]) result.push(''+i);
        }
    }
    return result;
}

function getSelectSQ8_1_Data(){
    var result = [];
    for(var i=1; i<=30; i++){
        if(ExceptList.indexOf(i+'') === -1){
            if(SQ8_1_DATA[i]) result.push(''+i);
        }
    }
    return result;
}

result.filter(function(value){
    $('input[akey='+value+']').click();
    return true;
})

Save.next();

})



//--------------------------------------------------------

$(document).ready(function(){
    $('.answer-unit-selected').find('input').click();
    var japanBrandList = ['16','17','18','19','20','21','28','29','30'];
    var ExceptList = ['22','23','24','25','26','27'];
    var SQ8_1_DATA = AO['SQ8X1'];
    var SQ8_DATA = AO['SQ8'];

//총 선택해야하는 수
    var SQ8_SELECT_CNT = getSQ8SelectCnt();
    var SQ8_1_SELECT_CNT = getSQ8_1_SelectCnt();

//문항별 값 배열
    var SQ8_DATA_ARR = getSelectSQ8_Data();
    var SQ8_1_DATA_ARR = getSelectSQ8_1_Data();

// SQ8_1 에서 선택된 일본브랜드의 개수
    var japanLength_SQ8_1 = japanBrandList.filter(function(a){
        return SQ8_1_DATA[a];
    }).length;

// 기본으로 선택되어야 하는 일본 브랜드에 대한 배열
    var defaultSelectBrand = japanBrandList.filter(function(a){
        return SQ8_1_DATA[a];
    });

    var defaultSelectBrandSQ8 = japanBrandList.filter(function(a){
        return SQ8_DATA[a];
    });

    var result = [];
    if(SQ8_1_SELECT_CNT>=6){
        // SQ8_1에서만 다 선택
        // 일본 브랜드 개수 확인 후 조건
        if(japanLength_SQ8_1>=6){
            // 일본 브랜드를 6개 다 구매시 진행 로직
            // defaultSelectBrand
            // 일본 브랜드 중 6개 선택 ;
            while(result.length < 6){
                var randomResult = Math.floor(Math.random()*defaultSelectBrand.length);
                var randomValue = defaultSelectBrand[randomResult];
                if(result.indexOf(randomValue) === -1) result.push(randomValue);
            }
            console.log(result.sort())
        }else{
            // 일본 브랜드6개 미만,  타브랜드로 채우기용
            // SQ8_1의 나머지 브랜드 중에서 일부 채우기
            result = defaultSelectBrand;
            var INNER_SQ8_1 = SQ8_1_DATA_ARR;
            while(result.length < 6){
                var randomResult = Math.floor(Math.random()*INNER_SQ8_1.length);
                var randomValue = INNER_SQ8_1[randomResult];
                if(result.indexOf(randomValue) === -1)  result.push(randomValue);
            }
            console.log(result.sort());
        }
    }else{
        if(SQ8_SELECT_CNT>=6){
            //6개 이상으로 선택시 실행
            // 1. SQ8_1에서 선택한 값 전부 선택
            // 2. 6-SQ8_1_CNT의 개수를 SQ8에서 랜덤으로 선택
            // 주의 : SQ8_1에서 중복되지 않은값으로 선택필요
            var extraJapanBrandLength = SQ8_1_DATA_ARR.length+(defaultSelectBrandSQ8.length-defaultSelectBrand.length);

            if(extraJapanBrandLength>=6){
                // SQ8_1 6개 미만 선택
                // SQ8의 선택된 일본브랜드를 합쳐서 6개 이상이 될 때
                result = SQ8_1_DATA_ARR;
                var INNER_SQ8 = defaultSelectBrandSQ8;

                while(result.length < 6){
                    var randomResult = Math.floor(Math.random()*INNER_SQ8.length);
                    var randomValue = INNER_SQ8[randomResult]
                    if(result.indexOf(randomValue) === -1) result.push(INNER_SQ8[randomResult]);
                }
            }else{
                // SQ8_1 6개 미만
                // SQ8의 선택된 일본브랜드 합쳐도 6개가 되지 않을때
                result = SQ8_1_DATA_ARR;
                INNER_SQ8 = SQ8_DATA_ARR;
                defaultSelectBrandSQ8.forEach(function(a){
                    if(defaultSelectBrand.indexOf(a) === -1) result.push(a);
                });

                while(result.length < 6){
                    var randomResult = Math.floor(Math.random()*INNER_SQ8.length);
                    var randomValue = INNER_SQ8[randomResult]
                    if(result.indexOf(randomValue) === -1) result.push(INNER_SQ8[randomResult]);
                }
            }

        }else{
            result = SQ8_DATA_ARR;
            console.log('d')
            console.log(result)
        }
    }


//초기 값
    function getSQ8SelectCnt(){
        var result = 0;
        for(var i=1; i<=30; i++){
            if(ExceptList.indexOf(i+'') === -1){
                if(SQ8_DATA[i]) result++;
            }
        }
        return result;
    }

    function getSQ8_1_SelectCnt(){
        var result = 0;
        for(var i=1; i<=30; i++){
            if(ExceptList.indexOf(i+'') === -1){
                if(SQ8_1_DATA[i]) result++;
            }
        }
        return result;
    }

    function getSelectSQ8_Data(){
        var result = [];
        for(var i=1; i<=30; i++){
            if(ExceptList.indexOf(i+'') === -1){
                if(SQ8_DATA[i]) result.push(''+i);
            }
        }
        return result;
    }

    function getSelectSQ8_1_Data(){
        var result = [];
        for(var i=1; i<=30; i++){
            if(ExceptList.indexOf(i+'') === -1){
                if(SQ8_1_DATA[i]) result.push(''+i);
            }

        }
        return result;
    }

    result.forEach(function (value){
        $('input[akey='+value+']').click();
    })
    Save.next();

})

var allValue = AO['SQ15'].NUMBER_1;

$('.s-answer').find('tr').eq(7).find('th').eq(1).append('<span class="span-remain">(<span style="color:red;">남은값</span>: 만원)</span>');

$('.inp-sum').on('change',function(){
    var sumValue = 0;

    $('.inp-sum').each(function(idx,value){
        sumValue += Number($(value).val());
    });

    var mValue = (allValue-sumValue).toFixed(1);

    var message = '(<span style="color:red;">남은 값</span>:'+mValue+'만원)';

    $('.span-remain').html(message);
})


$(document).ready(function(){
    var AODATA = AO['D1'];
    var watchPerData = [0.0325,0.0204,0.0135,0.017,0.0215,0.0161,0.0207,0.015,0.0204,0.0307,0.012,0.0186,0.038,0.0104,0.0107,0.0001];
    var checkArr = [];

    for(var i=1; i<=16; i++){
        var watchIdx = i-1;
        if(AODATA[i]==='1'){
            checkArr.push({
                idx : i,
                watchPercent : watchPerData[watchIdx]
            })
        }
    }

    var sortChecking = checkArr.sort(function(a,b){
        return a.watchPercent<b.watchPercent?-1:1
    });

    for(var i=0; i<=5; i++){
        if(sortChecking[i]){
            $('input[akey='+sortChecking[i].idx+']').click();
        }
    }

    Save.next();
    $(document).ready(function(){})




module.exports = async({ req, res, next, mongo }) => {
    function validateFail(message){
        return {
            result: false,
            message
        }
    }
    function validateSuccess(user) {
        return {
            user,
            result: true,
        }
    }

    function answerDQ4(DATA) {
        return DATA.filter((v) => {
            const DQ4_1List = ['DQ4'];
            const DQ4X = DQ4_1List.find((vv) => {
                return vv === v.NAME
            });
            return !!DQ4X;
        });
    }
    function answerDQ5_1(DATA) {
        return DATA.filter((v) => {
            const DQ5_1Lists = ['DQ5X1'];
            const DQ5X1 = DQ5_1Lists.find((vv) => {
                return vv === v.NAME && v['1'] === '1'
            });
            return !!DQ5X1;
        });
    }


    try {
        const SEND_MESSAGE ={
            NOT_EXIST_KEY: '존재하지 않는 인증번호 입니다.',
            COMPLETE_KEY: '설문이 종료 된 인증번호 입니다.',
            NOT_ELIGIBLE: '설문 대상자가 아닙니다.',
        }

        const { body, params } = req;
        const { password } = body;
        const { projectId } = params;

        const user = await mongo.db('getData').collection('LIST_'+projectId).findOne({
            UID: password,
        });

        if (!user) {
            return validateFail(SEND_MESSAGE.NOT_EXIST_KEY);
        } else {
            const { COMPLETE, JOIN_HISTORY } = user;
            req.session.userInfo = user;

            if (COMPLETE && JOIN_HISTORY) {
                const dataLists = await mongo.db('getData').collection('ANSWER').findOne({ SNUM: +projectId, UID: password });
                const { DATA } = dataLists;
                // 로그인 이력만 있고 설문에 대한 응답이 없을 경우
                if (JOIN_HISTORY.length && !COMPLETE) {
                    return validateSuccess(user);
                } else {
                    // 설문을 완료 했을 경우 -> DQ4 / DQ5_1 : 2 응답시 -> 설문 종료 메세지지
                    if (COMPLETE === 'COMPLETE') {
                        const DQ4 = answerDQ4(DATA);
                        if (DQ4.length) return validateFail(SEND_MESSAGE.COMPLETE_KEY);
                        // DQ5_1 : 1 응답 -> 설문조사 재참여 가능 ( 아직 조리 하지 않은 제품으로 설문 재참여 )
                        const DQ5_1 = answerDQ5_1(DATA);
                        if (DQ5_1.length) {
                            const ANSWER = await mongo.db('getData').collection('ANSWER').findOne({ SNUM: +projectId, UID: password });
                            const SQ6List = ['SQ6X1','SQ6X2','SQ6X3'];
                            const SQ6 = ANSWER.DATA.filter( v=> SQ6List.includes(v.NAME));

                            const emptyList = ['1', null];
                            const surveyToDo = SQ6.filter( v => !emptyList.includes(v['1'])).length;
                            // 조리하지 않은 제품 리스트 중에서 설문을 완료한 리스트는 제외
                            let surveyCompleteCnt = 0;
                            const surveyA = await mongo.db('getData').collection('ANSWER').findOne({ SNUM: 1787, UID: password, COMPLETE: 'COMPLETE' });
                            const surveyB = await mongo.db('getData').collection('ANSWER').findOne({ SNUM: 1788, UID: password, COMPLETE: 'COMPLETE' });
                            const surveyC = await mongo.db('getData').collection('ANSWER').findOne({ SNUM: 1789, UID: password, COMPLETE: 'COMPLETE' });

                            if (!!surveyA) surveyCompleteCnt++;
                            if (!!surveyB) surveyCompleteCnt++;
                            if (!!surveyC) surveyCompleteCnt++;

                            if (surveyToDo === surveyCompleteCnt) return validateFail(SEND_MESSAGE.COMPLETE_KEY);
                            return validateSuccess(user);
                        }
                    } else if (COMPLETE === 'OUT') {
                        return validateFail(SEND_MESSAGE.NOT_ELIGIBLE);
                    }
                    return validateSuccess(user);
                }
            } else {
                return validateSuccess(user);
            }
        }


        if (user === null){
            console.log(user)
            return {
                result: false,
                message: '존재하지 않는 인증번호 입니다.',
            };
        } else {
            req.session.userInfo = user;
            // 위가 통과 되면 존재하는 인증 번호이므로 조건 검사
            const { COMPLETE, JOIN_HISTORY } = user;
            // 1. 첫 로그인일 경우
            if (COMPLETE && JOIN_HISTORY) {
                if (JOIN_HISTORY.length) {
                    const dataLists = await mongo.db('getData').collection('ANSWER').findOne({ SNUM: +projectId, UID: password });
                    const { DATA } = dataLists;
                    // 설문 재참여 O
                    if (COMPLETE === 'COMPLETE') {
                        const DQ5_1 = DATA.filter((v) => {
                            const DQ5_1Lists = ['DQ5X1'];
                            const DQ5X1 = DQ5_1Lists.find((vv) => {
                                return vv === v.NAME && v['1'] === '1'
                            });
                            return !!DQ5X1;
                        });
                        const DQ4 = DATA.filter((v) => {
                            const DQ4_1List = ['DQ4'];
                            const DQ4X = DQ4_1List.find((vv) => {
                                return vv === v.NAME
                            });
                            return !!DQ4X;
                        });
                        if (DQ4.length) {
                            return {
                                result: false,
                                message: '설문이 종료 된 인증번호 입니다.',
                            };
                        }
                        // 구매는 하였지만 아직 조리하지 않은 제품 리스트
                        if (DQ5_1.length) {
                            const ANSWER = await mongo.db('getData').collection('ANSWER').findOne({ SNUM: +projectId, UID: password });
                            const SQ6List = ['SQ6X1','SQ6X2','SQ6X3'];
                            const sq6 = ANSWER.DATA.filter( v=> SQ6List.includes(v.NAME));

                            const emptyList = ['1', null];
                            const surveyToDo = sq6.filter( v => !emptyList.includes(v['1'])).length
                            // 조리하지 않은 제품 리스트 중에서 설문을 완료한 리스트는 제외
                            let surveyCompleteCnt = 0;
                            const surveyA = await mongo.db('getData').collection('ANSWER').findOne({ SNUM: 1787, UID: password, COMPLETE: 'COMPLETE' });
                            const surveyB = await mongo.db('getData').collection('ANSWER').findOne({ SNUM: 1788, UID: password, COMPLETE: 'COMPLETE' });
                            const surveyC = await mongo.db('getData').collection('ANSWER').findOne({ SNUM: 1789, UID: password, COMPLETE: 'COMPLETE' });

                            if (!!surveyA) surveyCompleteCnt++;
                            if (!!surveyB) surveyCompleteCnt++;
                            if (!!surveyC) surveyCompleteCnt++;

                            if (surveyToDo === surveyCompleteCnt){
                                return {
                                    result: false,
                                    message: '설문이 종료 된 인증번호 입니다.',
                                };
                            }
                        }
                        return {
                            user,
                            result: true,
                        };
                    } else {
                        if (JOIN_HISTORY.length) {
                            return {
                                user,
                                result: true,
                            };
                        } else {
                            return {
                                result: false,
                                message: '설문이 종료 된 인증번호 입니다.',
                            };
                        }
                    }
                } else if (COMPLETE === 'OUT') {
                    return {
                        result: false,
                        message: '설문 대상자가 아닙니다.',
                    };
                } else {
                    return {
                        user,
                        result: true,
                    };
                }
            } else {
                return {
                    user,
                    result: true,
                };
            }
        }
    } catch (e) {
        return {
            result: false,
            message: e.message,
        }
    }
}

    $(document).ready(function(){
        var none = AO['C_3']['NOA_99'];
        if
            AO['C_3'][1] = 23;
    });

//.answer-unit-selected
    document.querySelector("body > div.main-container > div.pure-g.can-join > div.main-div.pure-u-4-5 > div.question-container > div.create-complete > div.s-answer.no-border > table > tbody > tr:nth-child(2) > td.answer-td.text-left > div > div.answer-unit-box.pointer.pure-u-1.u-md-1-2 > div")


$(document).ready(function(){
    $('input[name="NOA_C_3_99"]').off('click').on('click', function() {
        var youtube = $('div[akey="23"]').clone();
        var isCheck = $('input:checkbox[name="NOA_C_3_99"]').is(':checked');
        if (isCheck) {
            youtube.addClass('selected');
            $('div[akey="23"] > .grade-box').data('data-current-grade') === '1';
            $('input:checkbox[name="NOA_C_3_99"]').after(youtube)
        } else {
            $('div[akey="23"]').parent().removeClass('answer-unit-selected');
        }   youtube.removeClass('selected');
    });
})
    $(document).ready(function(){
        $('input[name="NOA_C_3_99"]').remove();
        var input = '<input type="checkbox" class="youtubeCheck" />';
        $('label.pure-checkbox').prepend(input);
        var grade = $("div.create-complete");
        $('.youtubeCheck').on('click', function() {
            var isCheck = $('input.youtubeCheck').is(':checked');

            if (isCheck === true) {
                $('div.grade-box').empty();
                $('span.grade-body').empty();
                $('div.answer-unit-box').removeClass('answer-unit-selected');
                $('div.s-gradeclick').removeClass('selected');
                $('div.grade-box[data-current-grade]').removeAttr('data-current-grade');

                grade.removeData('data-min_grade');
                grade.removeData('data-max_grade');
                grade.removeData('max-grade');
                grade.removeData('min-grade');
                grade.attr('data-min_grade','0');
                grade.attr('data-max_grade','0');
                grade.attr('max-grade','0');
                grade.attr('min-grade','0');

                var yb1 = `<div class="answer-unit-box pointer pure-u-1 u-md-1-2 answer-unit-selected"><div class="s-gradeclick selected" qname="C_3" akey="23" data-single="false" data-last data-max><div class="grade-box" data-current-grade="1"></div><span class="value text-hover">유튜브</span></div></div>`
                $('div[akey="23"]').parent().replaceWith(yb1);
            } else {
                $('td').eq(2)
                var yb2 = `<div class="answer-unit-box pointer pure-u-1 u-md-1-2"><div class="s-gradeclick" qname="C_3" akey="23" data-single="false" data-last data-max><div class="grade-box" ></div><span class="value text-hover">유튜브</span></div></div>`
                $('div[akey="23"]').parent().replaceWith(yb2);
                grade.removeData('data-min_grade');
                grade.removeData('data-max_grade');
                grade.removeData('max-grade');
                grade.removeData('min-grade');
                grade.attr('data-min_grade','3');
                grade.attr('data-max_grade','3');
                grade.attr('max-grade','3');
                grade.attr('min-grade','3');

                $('div.grade-box').empty();
                $('span.grade-body').empty();
                $('div.answer-unit-box').removeClass('answer-unit-selected');
                $('div.s-gradeclick').removeClass('selected');
                $('div.grade-box[data-current-grade]').removeAttr('data-current-grade');
            }
        })
    });


