$(document).ready(function(){
    //시작 css
    $('input[hkey=3]').attr('readonly',true);
    $('input[hkey=1]').last().attr('readonly',true);
    $('input[hkey=2]').last().attr('readonly',true);
    $('input[type=text]').css('width','50px');

    //SQ2_1 의 값
    var sq2 = AO['SQ2_1']['1_NUMBER_1'];
    $('td[hkey=3]').last().append('/'+sq2+'억원')

    //입력시
    $('input[type=text]').on('change',function(){
        var num1_cnt = 0;
        var num2_cnt = 0;

        //가로 계산값
        $('input[data-column-type=NUMBER_1]').not(':last').each(function(idx,item){
            var num1 = $(item).val()/1;
            var num2 = $('input[data-column-type=NUMBER_2]').eq(idx).val()/1;
            $('input[data-column-type=NUMBER_3]').eq(idx).val(num1+num2);
            //세로 총합
            num1_cnt += num1;
            num2_cnt += num2;
        });

        //세로값 정의
        $('input[hkey=1]').last().val(num1_cnt);
        $('input[hkey=2]').last().val(num2_cnt);
        $('input[hkey=3]').last().val(num1_cnt+num2_cnt);
    });

    $('button#next').unbind("click").on("click", function () {
        var allCnt = $('input[hkey=3]').last().val()/1;
        var result = sq2===allCnt;

        if(result){
            $('.main-warning').html('');
            $('.main-warning').css('display','none')

            $('button#next').unbind("click").on("click", Save.next)
            Save.next()
        }else{
            $('.main-warning').html('기존에 입력한 응답값과 상이합니다. (기존 응답 : '+sq2+'억원)');
            $('.main-warning').css('display','block')
        }
    });
})

$(document).ready(function(){
    var sq2 = AO['SQ2_1']['1_NUMBER_1']/1;

    $('td.text-center span').find('input[hkey=3]').attr('readonly', true);
    $('div.s-answer table tbody tr:last').find('input').attr('readonly', true);
    $('td[hkey=3]').last().append(' / ' + sq2 + ' 억원')

    $('input[type=text]').on('change',function() {
        var total1 = 0;
        var total2 = 0;

        //가로 총합
        $('div.s-answer table tbody tr:not(:last)').each(function (idx) {
            var data1 = $('td.text-center span').find('input[hkey=1]').eq(idx).val() / 1;
            var data2 = $('td.text-center span').find('input[hkey=2]').eq(idx).val() / 1;

            $('div.s-answer table tbody tr').eq(idx).find('input[hkey=3]').val(data1+data2);
            total1 += data1;
            total2 += data2;
        });

        //세로 총합
        $('input[hkey=1]').last().val(total1);
        $('input[hkey=2]').last().val(total2);
        $('input[hkey=3]').last().val(total1+total2);

    });

    var msg1 = '큼';
    var msg2 = '작습';
    $('button#next').unbind('click').on('click',function(){

        var budget = $('input[hkey=3]').last().val()/1;

        if(sq2 === budget){
            $('div.main-warning').html('');
            $('button#next').unbind('click').on('click',Save.next);
            Save.next();
        } else {
            $('div.main-warning').html('');
            $('div.main-warning').html('연간 예산이 이전 입력값 보다 '+(sq2 < budget ? msg1 : msg2)+'니다.');
            $('div.main-warning').css('display','block')
        }
    });
})



var qNumberArr = ['XQ1','XQ2_1','XQ2_2','XQ3','XQ4','XQ4_1'];
qNumberArr.forEach(function (value,idx){
    if(idx) $('div[question-name='+value+']').hide();

    if(idx!==qNumberArr.length-1){
        $('div[question-name='+value+']').find('input').on('click',function(){
            $('div[question-name='+qNumberArr[idx+1]+']').show();
        })
    }
})


dataCurrent = ['']

var size = $('div.categoryWrapper').find('div.cb-header').length;
for(var i = 1; i < size; i++){
    $('.cb-header').eq(i).hide();
    $('.cb-body').eq(i).hide();

    $('.cb-body').eq(i-1).find('input:checkbox').on('click',function(){
        if($('.cb-body').eq(i-1).find('input:checkbox').is(':checked')){
            $('.cb-header').eq(i+1).show();
            $('.cb-body').eq(i+1).show();

            if(i === size-1){
                $('.cb-header').eq(i).show();
                $('.cb-body').eq(i).show();
            }
        }
    })
}

$('.cb-header').hide();
$('.cb-body').hide();


var size = $('div.categoryWrapper').find('div.cb-header').length;
for(var i = 1; i < size; i++) {

}
var size = $('div.categoryWrapper').find('div.cb-header').length;
for(var i = 0; i < size; i++){
    if(i){
        $('.cb-header').eq(i).hide();
        $('.cb-body').eq(i).hide();
    }
    if(i !== size-1) {
    $('.cb-body').eq(i-1).find('input').on('click',function(){
        $('.cb-header').eq(i+1).show();
        $('.cb-body').eq(i+1).show();
    })}
}


//6번 반복하면서 hide
//첫번째 빼고
var size = $('div.categoryWrapper').find('div.cb-header').length;
for(var i = 0; i < size; i++) {
    if (i) {
        $('.cb-header').eq(i).hide();
        $('.cb-body').eq(i).hide();
    }
    $('.cb-body').eq(i).on('click',function(){
        console.log(i, ' 넌 왜 6이냐');
        $('.cb-header').eq(i+1).show();
        $('.cb-body').eq(i+1).show();
    })
}


for(var j = 0; j < 2; j++){
    var eqNum = j;
    var eqNextNum = j+1;

    console.log({eqNum,eqNextNum})
    console.log($('.cb-body').eq(eqNum).find('input'))
    console.log('--------------------------')
    $('.cb-body').eq(eqNum).on('click',function(){
        console.log(eqNum)
        console.log({eqNum,eqNextNum});
        $('.cb-header').eq(eqNextNum).show();
        $('.cb-body').eq(eqNextNum).show();
    })
}

$('.cb-body').eq(i).find('input').on('click',function(){
    console.log('요소',i);
    $('.cb-header').eq(i+1).show();
    $('.cb-body').eq(i+1).show();
})
$('.cb-body').eq(0).find('input').on('click',function(){
    $('.cb-header').eq(1).show();
    $('.cb-body').eq(1).show();
})
$('.cb-body').eq(1).find('input').on('click',function(){
    $('.cb-header').eq(2).show();
    $('.cb-body').eq(2).show();
})
$('.cb-body').eq(2).find('input').on('click',function(){
    $('.cb-header').eq(3).show();
    $('.cb-body').eq(3).show();
})
$('.cb-body').eq(3).find('input').on('click',function(){
    $('.cb-header').eq(4).show();
    $('.cb-body').eq(4).show();
})
$('.cb-body').eq(4).find('input').on('click',function(){
    $('.cb-header').eq(5).show();
    $('.cb-body').eq(5).show();
})

for(var i = 0; i < 5; i++){
    $('.cb-body').eq(i).find('input').on('click',function(){
        $('.cb-header').eq(i+1).show();
        $('.cb-body').eq(i+1).show();
    })
}


//-------------------------------------------

var count = AO['B0_2']; // 자녀 수 선택
count = count[1];

var A = ['A_1','A_2','A_3','A_4'];
var B = ['B_1','B_2','B_3','B_4'];
var C = ['C_1','C_2','C_3','C_4'];

var result_a = [];
var result_b = [];
var result_c = [];

//자녀 수만큼
for(var i = 0; i < count; i++){
    // 필요한 값 B_1~x, C_1~x
    result_a = AO['B2'][A[i]];
    result_b = AO['B2'][B[i]];
    result_c = AO['B2'][C[i]];


        //B
        if(result_b === '1'){
            $('.check-value').eq(i).append('( 아들 /');
        } else if(result_b === '2'){
            $('.check-value').eq(i).append('( 딸 /');
        }
        //C
        if(result_c === '1'){
            $('.check-value').eq(i).append(' 0~9세 )');
        } else if(result_c === '2'){
            $('.check-value').eq(i).append(' 10~19세 )');
        } else if(result_c === '3') {
            $('.check-value').eq(i).append(' 20~29세 )');
        }

}

var count = AO['B0_2']; // 자녀 수 선택
count = count[1];

var A = ['A_1','A_2','A_3','A_4'];
var B = ['B_1','B_2','B_3','B_4'];
var C = ['C_1','C_2','C_3','C_4'];

var result_a = [];
var result_b = [];
var result_c = [];
var check = 0;
//자녀 수만큼 반복 시작
for(var i = 0; i < count; i++){
    // 필요한 값 B_1~x, C_1~x
    result_a = AO['B2'][A[i]];
    result_b = AO['B2'][B[i]];
    result_c = AO['B2'][C[i]];

    if(result_a === '1' && (result_c === '1' || result_c === '2' || result_c === '3')){
        //실행
        //B
        if(result_b === '1'){
            $('.check-value').eq(check).append('( 아들 /');
        } else if(result_b === '2'){
            $('.check-value').eq(check).append('( 딸 /');
        }
        //C
        if(result_c === '1'){
            $('.check-value').eq(check).append(' 0~9세 )');
        } else if(result_c === '2'){
            $('.check-value').eq(check).append(' 10~19세 )');
        } else if(result_c === '3') {
            $('.check-value').eq(check).append(' 20~29세 )');
        }
        check++;
    }
}


var count = AO['B0_2'];
count = count[1];

var A = ['A_1','A_2','A_3','A_4'];
var B = ['B_1','B_2','B_3','B_4'];
var C = ['C_1','C_2','C_3','C_4'];

var result_a = [];
var result_b = [];
var result_c = [];
var check = 0;

var B3_DATA = AO['B3']

var isB3_1 = AO['B3']['1']
var isB3_2 = AO['B3']['2']
var isB3_3 = AO['B3']['3']
var isB3_4 = AO['B3']['4']
var eqCnt = 0;

// for(var j = 1; j<=4; j++){
//     var B3_DATA = AO['B3'][i];
//
//     if(B3_DATA){
//
//     }
// }

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









