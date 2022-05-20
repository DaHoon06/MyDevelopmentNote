// SQ19 수정 전
$(document).ready(function(){
    // 임시 CSS
    $('input[qname=SQ19]').css('width','120px');
    $('span[type=TEXT]').css('margin-right','2px');
    $('span[type=TEXT]').css('margin-left','2px');
    $('.c1ate').css('width','100px');

    var cnt = +AO['SQ17'].NUMBER_1;  // 25개 까지는 5칸 고정 26개 이상은 10칸
    var category = AO['SQ18'];
    var arrList = [];

    if(cnt === 0){
        var isNone = 99;
    } else {
        isNone = 0;
    }

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

    function validate(){
        var inValueList = []
        $('input[qname=SQ19]').each(function() {
            var value = $(this).val();
            if(value){
                inValueList.push(value);
            }
        })
        if(!isNone) {
            if (!inValueList.length || cnt < inValueList.length) {
                return {
                    success: false,
                    message: '입력한 제품을 다시 확인해주세요. ( 가지고 있는 명품 개수 : ' + cnt + ' )'
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
    }
});




// SQ19 수정 후
$(document).ready(function(){
    // 임시 CSS
    $('input[qname=SQ19]').css('width','120px');
    $('span[type=TEXT]').css('margin-right','2px');
    $('span[type=TEXT]').css('margin-left','2px');
    $('.c1ate').css('width','100px');

    //var isNone = +AO['SQ17'].NOA_99;
    var cnt = +AO['SQ17'].NUMBER_1;
    var category = AO['SQ18'];
    var arrList = [];

    if(cnt === 0){
        var isNone = 99;
    } else {
        isNone = 0;
    }


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

    function validate(){
        var inValueList = []
        $('input[qname=SQ19]').each(function() {
            var value = $(this).val();
            if(value){
                inValueList.push(value);
            }
        })
        if(!isNone) {
            if (!inValueList.length || cnt < inValueList.length) {
                return {
                    success: false,
                    message: '입력한 제품을 다시 확인해주세요. ( 가지고 있는 명품 개수 : ' + cnt + ' )'
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
        $('button#next').unbind("click").on("click",nextBtnCheck);
        $('input[qname=SQ19]').on('change',disableInput);
        $('.s-answer').find('tr').hide();

        arrList.forEach(function(ele){
            $('.s-answer').find('tr').eq(ele).show();
        });
    }
});


// CQ1
$(function(){
    /*
        $('input[name="NOA_CQ1_99"]').on('click',function(){
            if( $('input[name="NOA_CQ1_99"]').is(':checked')==true ){
            $('input[qname=CQ1]').removeAttr('disabled');
            }
        });

    $('input[name="NOA_CQ1_99"]').removeClass();
    */
    $('div[noa-qname="CQ1"]').append('<div class="s-check"><label class="pure-checkbox" for="CQ1_99"><input type="checkbox" id="CQ1_99" name="CQ1_99" qname="CQ1" akey="99" data-column="99" single="true" data-y-next="" data-n-next="" value="99"><span class="check-value">해당없음</span></label></div>');
});


$(document).ready(function(){
    var checkBox =  $('input:checkbox[class="NOA check-single"]').is(":checked");
    if(checkBox){
        $('input[qname="CQ1"]').removeAttr("disabled")
    } else {
        $('input[qname="CQ1"]').removeAttr("disabled")
    }

});
function inEve(){
    console.log('a')
}
$('input.NOA').unbind('click change').on('click change',inEve)


// SQ17
$(function(){
    if(Replacer('[SQ17_0=1]')=='true' || Replacer('[SQ17_0=2]')=='true' || Replacer('[SQ17_0=3]')=='true' ){
        $('input[data-column="NUMBER_1"]').attr('disabled',false);
        $('input[name="NOA_SQ17_99"]').attr('disabled',true);
        $('input[name="NOA_SQ17_99"]').attr('checked',false);
        $('div[noa-qname="SQ17"]').hide();

        if($('input[data-column="NUMBER_1"]') !== ''){

        }
    } else {
        $('input[data-column="NUMBER_1"]').val('').attr('disabled',true);
        $('input[name="NOA_SQ17_99"]').click();
        Save.next();
    }
});

// SQ20 - BACKUP
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
        for(var i=1; i<=10; i++){
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
        for(var i=1; i<=10; i++){
            var value = category[''+i];
            if(value){
                arrList.push(value-1)
            }
        }
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
        for(var i=1; i<=10; i++){
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
        // $('.s-answer').find('tr').hide();
        // arrList.forEach(function(ele){
        //     $('.s-answer').find('tr').eq(ele).show();
        // })
        $('.s-answer').find('tr').remove();
        arrList.forEach(function(ele){
            $('.s-answer').find('tr').eq(ele).();
        })
    }

    function addArrList(){
        for(var i=1; i<=10; i++){
            var value = category[''+i];
            if(value){
                arrList.push(value-1)
            }
        }
    }
});







$(document).ready(function(){
    // 임시 CSS
    $('input[qname=SQ19]').css('width','120px');
    $('span[type=TEXT]').css('margin-right','2px');
    $('span[type=TEXT]').css('margin-left','2px');
    $('.c1ate').css('width','100px');

    //var isNone = +AO['SQ17'].NOA_99;
    var cnt = +AO['SQ17'].NUMBER_1;
    var category = AO['SQ18'];
    var arrList = [];

    if(cnt === 0){
        var isNone = 99;
    } else {
        isNone = 0;
    }


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

    function validate(){
        var inValueList = []
        $('input[qname=SQ19]').each(function() {
            var value = $(this).val();
            if(value){
                inValueList.push(value);
            }
        })
        if(!isNone) {
            if (!inValueList.length || cnt < inValueList.length) {
                return {
                    success: false,
                    message: '입력한 제품을 다시 확인해주세요. ( 가지고 있는 명품 개수 : ' + cnt + ' )'
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
        $('button#next').unbind("click").on("click",nextBtnCheck);
        $('input[qname=SQ19]').on('change',disableInput);
        $('.s-answer').find('tr').hide();

        arrList.forEach(function(ele){
            $('.s-answer').find('tr').eq(ele).show();
        });
    }
});


for(var i=1; i<=10; i++){
    var c1 = SQ19_DATA['TEXT_'+i];
    var c2 = SQ19_DATA['TEXT_'+(10+i)];
    var c3 = SQ19_DATA['TEXT_'+(20+i)];
    var c4 = SQ19_DATA['TEXT_'+(30+i)];
    var c5 = SQ19_DATA['TEXT_'+(40+i)];

    if(c1)  dataList.push(i)
    if(c2)  dataList.push(10+i)
    if(c3)  dataList.push(20+i)
    if(c4)  dataList.push(30+i)
    if(c5)  dataList.push(40+i)
}







