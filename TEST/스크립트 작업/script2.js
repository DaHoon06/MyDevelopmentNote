$(document).ready(function(){
$('.answer-unit-selected').find('input').click();
var japanBrand =  ['16','17','18','19','20','21','28','29','30'];
var notSelected = ['22','23','24','25','26','27'];
var SQ8_RAW_DATA =  AO['SQ8'];
var SQ8X1_RAW_DATA = AO['SQ8X1'];

var SQ8 = SQ8_DATA();
var SQ8X1 = SQ8X1_DATA();

var SQ8_selectedJapan = SQ8_selectedJapanBrand();
var SQ8X1_selectedJapan = SQ8X1_selectedJapanBrand();

var result = [];
if(SQ8X1.length >= 6){
    if(SQ8X1_selectedJapanBrand.length >= 6){
        while(result.length < 6){
            var randomBrand = Math.floor(Math.random() * SQ8X1_selectedJapanBrand.length);
            var randomArr = SQ8X1_selectedJapan[randomBrand];
            if(result.indexOf(randomArr) === -1) result.push(randomArr);
        }
    } else {
        result = SQ8_selectedJapan;
        var insert = SQ8X1; // 일본브랜드를 제외한 나머지 값이 필요 -> 6개를 충족시켜야하기 때문에
        while(result.length < 6){
            var randomBrand = Math.floor(Math.random() * insert.length);
            var randomArr = insert[randomBrand];
            if(result.indexOf(randomArr) === -1) result.push(randomArr);
        }
    }
//SQ8X1의 선택 항목이 6개가 안됨
// -> SQ8에서 채워야하는데 -> 1.SQ8이 6개가 넘을 경우 , 2. SQ8이 6개가 안될 경우
//                => 1-1. 일본제품이 6개 이상, 1-2. 일본제품 6개 이하
// 1순위 : 일본제픔
// 2순위 : 일반제품
} else {
    if(SQ8.length >= 6){
        var newJapanBrandLength = SQ8X1.length + SQ8_selectedJapan.length - SQ8X1_selectedJapan.length;
        if(newJapanBrandLength >= 6){
            result = SQ8X1;
            var insert = SQ8_selectedJapan;

            while (result.length < 6) {
                var randomBrand = Math.floor(Math.random() * insert.length);
                var randomArr = insert[randomBrand];
                if(result.indexOf(randomArr) === -1) result.push(insert[randomBrand]);
            }
        } else {
            result = SQ8X1;
            var insert = SQ8;
            SQ8_selectedJapan.forEach(function(a){
                if(SQ8X1_selectedJapan.indexOf(a) === -1) result.push(a);
            });

            while(result.length < 6) {
                var randomBrand = Math.floor(Math.random() * insert.length);
                var randomArr = insert[randomBrand];
                if(result.indexOf(randomArr) === -1) result.push(insert[randomBrand]);
            }
        }
    } else {
        //선택한 항목이 6개가 안될경우
        result = SQ8;
    }
}

result.forEach(function(v){
    $('input[akey='+v+']').click();
})
    Save.next();


//1차 정제 데이터 -> 필요없는 값 제거 22~27번은 제외이므로
    function SQ8X1_DATA() {
        var result = [];
        for(var i = 1; i <= 30; i++){
            if(notSelected.indexOf(i+'') === -1){
                if(SQ8X1_RAW_DATA[i]) result.push(''+i);
            }
        }
        return result;
    }
    function SQ8_DATA() {
        var result = [];
        for(var i = 1; i <= 30; i++){
            if(notSelected.indexOf(i+'') === -1){
                if(SQ8_RAW_DATA[i]) result.push(''+i);
            }
        }
        return result;
    }
    //일본 브랜드
    function SQ8_selectedJapanBrand() {
        return japanBrand.filter(function(v){
            return SQ8_RAW_DATA[v];
        });
    }
    function SQ8X1_selectedJapanBrand(){
        return japanBrand.filter(function(v){
            return SQ8X1_RAW_DATA[v];
        })
    }
})



//한달 지출 비용
var SQ15 = AO['SQ15'].NUMBER_1;
var sum = 0;
$('.s-answer').find('tr:last').find('th').eq(1).append('<span class="span-remain">(<span style="color:red;">남은값</span>: 만원)</span>');

$('.inp-sum').on('keyup',function(){
    var size = $('tbody tr .V').length;
    sum = 0;

    for(let i = 0; i < size; i++){
        var num = Number($('.text-center input').eq(i).val());
        sum += num;
    }
    var result = (SQ15-sum).toFixed(1);
    var msg = '(<span style="color:red;">남은 값</span>:'+result+'만원)';
    $('.span-remain').html(msg);
})

$(document).ready(function(){
var arr = [];
var rating = [0, 0.0325, 0.0204, 0.0135, 0.017, 0.0215, 0.0161, 0.0207, 0.015, 0.0204, 0.0307, 0.012, 0.0186, 0.038, 0.0104, 0.0107, 0.0001];

    for(var i = 1; i <= 16; i++){
       var value = AO['D1'][i];

       if(value === '1'){
           arr.push({
               idx: i,
               val: rating[i]
           });
       }
    }
    arr.sort(function(a,b){
        return a.val - b.val;
    });

    for(var i = 0; i < 6; i++){
        if(arr[i]){
           $('input[akey='+arr[i].idx+']').click();
        }
    }
    Save.next();
})







