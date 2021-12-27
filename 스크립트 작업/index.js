// SQ18
$(document).ready(function(){
    var isCheck = +AO['SQ17'].NUMBER_1;
    var isNone = +AO['SQ17'].NOA_99;
    console.log(isCheck);
    if(!isNone){
        $('button#next').unbind("click").on("click", function () {
            var size = $('.answer-unit-selected').length;
            var result = false;
            var message = '선택하신 개수에 맞게 응답해주세요. ( 가지고 있는 명품 개수 : '+isCheck+' )';

            //선택한 값이 없을 경우
            if(isCheck && size && isCheck >= size){  //선택한 값이 존재할 경우
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
    }

});


// SQ19
$(document).ready(function(){
    // 임시 CSS
    $('input[qname=SQ19]').css('width','120px');
    $('span[type=TEXT]').css('margin-right','2px');
    $('span[type=TEXT]').css('margin-left','2px');

    var isNone = +AO['SQ17'].NOA_99;
    var cnt = +AO['SQ17'].NUMBER_1;
    var category = AO['SQ18'];
    var arrList = [];
    // 함수 실행
    addArrList();
    load();

    function nextBtnCheck(){
        var result = validate();

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
    // 다음 버튼 이벤트 제거거

    function validate(){
        var inValueList = []
        $('input[qname=SQ19]').each(function() {
            var value = $(this).val();
            if(value){
                inValueList.push(value);
            }
        })
        if(!isNone){
            if(!inValueList.length || cnt < inValueList.length){
                return {
                    success: false,
                    message: '입력한 제품을 다시 확인해주세요. ( 가지고 있는 명품 개수 : '+cnt+' )'
                }
            }
        }else{
            if(!inValueList.length || 5 < inValueList.length){
                return {
                    success: false,
                    message: '최소1개 최대 5개 까지 입력이 가능합니다.'
                }
            }
        }

        return {
            success: true,
            message: '오류'
        }
    }

    function disableInput(){
        var inValueList = [];

        $('input[qname=SQ19]').each(function() {
            var value = $(this).val();
            if(value){
                inValueList.push(value);
            }
        });

        if(!isNone){
            if(cnt !== inValueList.length){
                $('input[qname=SQ19]').attr('disabled',false);
            }else{
                $('input[qname=SQ19]').each(function() {
                    var value = $(this).val();
                    if(!value){
                        $(this).attr('disabled','true');
                    }
                })
            }
        }else{
            if(5 > inValueList.length){
                $('input[qname=SQ19]').attr('disabled',false);
            }else{
                $('input[qname=SQ19]').each(function() {
                    var value = $(this).val();
                    if(!value){
                        $(this).attr('disabled','true');
                    }
                })
            }
        }

    }

    function addArrList(){
        for(var i=1; i<=5; i++){
            var value = category[''+i];
            if(value){
                arrList.push(value-1)
            }
        }
    }

    function load(){
        var tr = $("body > div.main-container > div.pure-g.can-join > div.main-div.pure-u-4-5 > div.question-container > div.create-complete > div.s-answer > div > table > tbody > tr").length;
        $('button#next').unbind("click").on("click",nextBtnCheck);
        $('input[qname=SQ19]').on('change',disableInput);
        $('.s-answer').find('tr').hide();

        if(cnt){
            for(var j = 0; j < tr; j++){
                $('table > tbody > tr').eq(j).find('input[qname=SQ19]:gt('+(+cnt-1)+')').hide();
            }
        }

        arrList.forEach(function(ele){
            $('.s-answer').find('tr').eq(ele).show();
        });
    }
});


// SQ20
$(document).ready(function(){
    var cnt = +AO['SQ17'].NUMBER_1;
    var category = AO['SQ18'];
    var dataList = [];
    var arrList = [];

    load();

    function load(){
        addArrList();
        hideAndShow();
        getSQ19_DATA();
        showList();
    }
    function showList(){
        $('.answer-unit-box').hide();
        dataList.forEach(function(value){
            $('label[for=SQ20_'+value+']').parent().parent().show();
        })
    }


    function getSQ19_DATA(){
        $('.answer-unit').find('input').each(function(){
            var value = $(this).val();
            if(!value){
                $(this).hide();
            }
        })
        var SQ19_DATA = AO['SQ19'];
        for(var i=1; i<=5; i++){
            var c1 = SQ19_DATA['TEXT_'+i];
            var c2 = SQ19_DATA['TEXT_1'+i];
            var c3 = SQ19_DATA['TEXT_2'+i];
            var c4 = SQ19_DATA['TEXT_3'+i];
            var c5 = SQ19_DATA['TEXT_4'+i];

            if(c1)  dataList.push(i)
            if(c2)  dataList.push(10+i)
            if(c3)  dataList.push(20+i)
            if(c4)  dataList.push(30+i)
            if(c5)  dataList.push(40+i)
        }
    }

    function hideAndShow(){
        $('.s-answer').find('tr').hide();
        arrList.forEach(function(ele){
            $('.s-answer').find('tr').eq(ele).show();
        })
    }

    function addArrList(){
        for(var i=1; i<=5; i++){
            var value = category[''+i];
            if(value){
                arrList.push(value-1)
            }
        }
    }


});