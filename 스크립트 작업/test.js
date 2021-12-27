// SQ18
$(document).ready(function() {
    // 버튼이 클릭될때마다 카운트를 새로 갱신
    $('button#next').unbind("click").on("click", function () {
        var SQ17 = +AO['SQ17'].NUMBER_1; // SQ17의 입력값에 따라 달라짐 1 ~ 5
        var none = AO['SQ17'].NOA_99;   // 99가 찍힘

        var selectedCnt = $('.answer-unit-selected').length;
        var result = false;
        var message = '선택하신 개수에 맞게 응답해주세요. ( 가지고 있는 명품 개수 : '+selectedCnt+' )';

        // 1. 선택한 값이 없을 경우 -> 5개의 값
        // 2. 선택한 보다 초과했을 경우
        // 3. 선택한 값이 있을 경우 -> 0은 false
        if(none && SQ17 >= selectedCnt && selectedCnt) {
            result = true;
        }
        if(result){
            $('.main-warning').html('');
            $('.main-warning').css('display','none');
            $('button#next').unbind("click").on("click", Save.next);
            Save.next()
        }else{
            $('.main-warning').html(message);
            $('.main-warning').css('display','block');
        }
    });
});

//SQ19
$(document).ready(function() {
    // 임시 CSS
    $('input[qname=SQ19]').css('width','120px');
    $('span[type=TEXT]').css('margin-right','2px');
    $('span[type=TEXT]').css('margin-left','2px');

    var SQ18 = AO['SQ18'];          // 선택한 카테고리만 정렬
    var SQ17 = AO['SQ17'].NUMBER_1; // 선택한 값에 따라서 개수 조절
    var none = AO['SQ17'].NOA_99;   // "없음" 일 경우 5개 까지 체크 가능

    // 함수 실행
    function init(){
        listShowAndHide();

    }

    function nextBtn () {
        var result = validation();
        var isOk = result.success;
        var message = result.message;

        if(isOk){
            $('.main-warning').html('');
            $('.main-warning').css('display','none');
            $('button#next').unbind("click").on("click", Save.next);
            Save.next()
        }else{
            $('.main-warning').html(message);
            $('.main-warning').css('display','block');
        }
    }
    function listShowAndHide () {
        var tr = $("body > div.main-container > div.pure-g.can-join > div.main-div.pure-u-4-5 > div.question-container > div.create-complete > div.s-answer > div > table > tbody > tr").length;
        $('button#next').unbind("click").on("click",nextBtn);
        $('input[qname=SQ19]').on('change',disabledInput);
        // tr 전체를 숨김
        $('.s-answer').find('tr').hide();
        // 선택한 카테고리가 있다면
        if(SQ17){

        }

    }

    function disabledInput () {

    }
    // 유효 체크
    function validation () {


        return {
            success: '',
            message: '',
        }
    }

    init();




});

