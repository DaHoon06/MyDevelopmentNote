$(document).ready(function() {
    var qNumberArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    var showNumber = [1];

    var cssStringA = 'border: none; color: white; background-color: #4CAF50; text-align: center; min-height:26px;';
    var cssStringD = 'border: none; color: white; background-color: #f44336; min-height:26px;  float:right;';
    var keySub = ['_1_1','_2_1','_3_1','_4_1','_5_1']

    var addButtonString = '<button class="plus-button" style="'+cssStringA+'">추가</button>';
    var deleteButtonString = '<button class="delete-button" style="'+cssStringD+'">삭제</button>';

    var b3Data;

    var tr = '<tr>' +
        '<th rowspan="2" className="first-th" style="width: 10%;"><span style="font-weight:bold;">추가 및 삭제</span></th>' +
        '<th rowspan="2" ><span style="font-weight:bold;">제품</span><span style="font-weight:bold;">/</span><span style="font-weight:bold;">서비스명</span></th>'+
        '<th rowspan="2" style="width:10%"><span style="font-weight:bold;"></span><span style="font-weight:bold;">출시년도</span><span style="font-weight:bold;"></span></th>'+
        '<th rowspan="2" style="width:10%"><span style="font-weight:bold;"></span><span style="font-weight:bold;">최신 버전</span><span style="font-weight:bold;"></span></th>'+
        '<th colspan="2" ><span style="font-weight:bold;"></span>전체 매출액 대비 비율<span style="font-weight:bold;"></span></th>'+
        '<th rowspan="2" style="width:6%;"><span style="font-weight:bold;"></span><span style="font-weight:bold;">매출없음</span><span style="font-weight:bold;"></span></th>'+
        '<th rowspan="2" style="width:6%;"><span style="font-weight:bold;"></span><span style="font-weight:bold;">잘 모름</span><span style="font-weight:bold;"></span></th>'+
        '</tr>';

    var tr2 = '<tr>' +
        '<th><span style="font-weight:bold;"></span>매출액<span style="font-weight:bold;"></span></th>'+
        '<th style="width:8%" ><span style="font-weight:bold;"></span>전체 매출액 대비 비율<span style="font-weight:bold;"></span></th>'+
        '</tr>';
    $('thead').children().remove();
    $('thead').append(tr);
    $('thead').append(tr2);

    // $('tbody').append('<tr><td style="text-align: center;">합계</td><td></td><td></td><td></td><td class="caseRevenue"></td><td class="allRevenue"></td><td></td><td></td></tr>')
    $('input[hkey="98"]').hide()
    $('input[hkey="99"]').hide()

    qNumberArr.forEach(function(val,idx){
        idx === 0 ? $('tr[vkey]').eq(idx).children().eq(0).append(addButtonString) : $('tr[vkey]').eq(idx).children().eq(0).append(deleteButtonString);
        $('tr[vkey]').eq(idx).prepend('<td style="display:none;">'+(idx+1)+'번</td>');
    });

    function createRow(){
        $('tr[vkey]').hide();
        showNumber.forEach(function(val,idx){
            $('tr[vkey="'+val+'"').show();
        })
    }

    function deleteData(val){
        $('tr[vkey="'+val+'"').find('input').val("");
    }

    //값이 잘 넘어오는지 체크
    function questionData(){
        var name=Questions.list[0]; // 이부분을 사용하지 말고
        var questionDiv=$('*[question-name="'+name+'"]'); // name에 직접 문항이름을 입력하여 사용하면 정확히 확인할 수 있다.
        var type=$(questionDiv).attr('question-type');
        b3Data=Modules[type].getData(questionDiv);
    }

    function startRow(){
        questionData();
        qNumberArr.forEach(function(val,idx){
            keySub.some(function(keyVal,keyIdx){
                var value = b3Data[val+keyVal];
                var noneRevenue = b3Data[val+"_98_1"];
                var dontKnowRevenue = b3Data[val+"_99_1"];

                if(keyIdx === 0){
                    if(value !== "") {
                        showNumber.indexOf(val) === -1 ? showNumber.push(val) : '';
                    }
                    if(noneRevenue === "98"){
                        $('tr[vkey="'+val+'"]').find('.revenueNoCheck').prop('checked',true);
                        $('tr[vkey="'+val+'"]').find('.revenueNoCheck').change();
                    }
                    if(dontKnowRevenue === "99"){
                        $('tr[vkey="'+val+'"]').find('.revenueDontKnow').prop('checked',true);
                        $('tr[vkey="'+val+'"]').find('.revenueDontKnow').change();
                    }
                    return true;
                }
            })
        })
        createRow();
    }

    function validate(){
        questionData();

        var allRevenue = AO['A4X1']? AO['A4X1']['3_1_1'] : 0;
        var sumRevenue = 0;
        var allPercent = 0;

        var reg1 = /([^가-힣A-Za-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\x20])/i
        var regNumber = /^[0-9]+$/;

        var result = {
            result : true,
            message : '성공',
        };

        showNumber.sort(function(a,b){
            return a>b? 1:-1;
        });

        showNumber.some(function(val,idx){
            keySub.some(function(keyVal,keyIdx){
                var regValue = b3Data[val+keyVal];
                var emptyRevenueCheck  =b3Data[val+'_98_1'];
                var dontKnowRevenueCheck  =b3Data[val+'_99_1'];

                if( keyIdx===0 || keyIdx === 2){
                    if(regValue===""){
                        $('tr[vkey="'+(idx+1)+'"').css('border','2px solid red');
                        $('tr[vkey="'+(idx+1)+'"').addClass('errorB3');

                        result  = {
                            result : false,
                            message : '['+(idx+1)+']번 : 제품/서비스명 , 최신버전에 값이 비워져있습니다.'
                        };
                        return true;
                    }
                    //정규식 확인 test() 함수 -> true / false 반환
                    if(reg1.test(regValue)){
                        $('tr[vkey="'+val+'"').css('border','2px solid red');
                        $('tr[vkey="'+val+'"').addClass('errorB3');

                        result  = {
                            result : false,
                            message : '['+(idx+1)+']번 : 제품/서비스명 , 최신버전에 자음 모음만 입력하지 말아주세요'
                        };
                        return true;
                    }

                    if(regNumber.test(regValue)){
                        $('tr[vkey="'+val+'"').css('border','2px solid red');
                        $('tr[vkey="'+val+'"').addClass('errorB3');

                        result  = {
                            result : false,
                            message : '['+(idx+1)+']번 : 제품/서비스명 , 최신버전에 숫자만 입력하지 말아주세요'
                        };
                        return true;
                    }

                }

                if(keyIdx === 1){
                    if(!regNumber.test(regValue)){
                        $('tr[vkey="'+val+'"').css('border','2px solid red');
                        $('tr[vkey="'+val+'"').addClass('errorB3');

                        result  = {
                            result : false,
                            message : '['+(idx+1)+']번 : 출시년도에 숫자만 입력해주세요'
                        };
                        return true;
                    }
                }

                if(emptyRevenueCheck!== "98" && dontKnowRevenueCheck!== "99" ){
                    var regValue3 = b3Data[val+keySub[3]];
                    var regValue4 = b3Data[val+keySub[4]];

                    if(regValue4 === "" && regValue3 === ""){
                        $('tr[vkey="' + val + '"').css('border', '2px solid red');
                        $('tr[vkey="' + val + '"').addClass('errorB3');

                        result = {
                            result: false,
                            message: '[' + (idx+1) + ']번 : 매출액또는 전체매출액이 비워져있습니다.'
                        };
                        return true;
                    }else if(regValue3 !== "" && regValue4 !== ""){
                        $('tr[vkey="'+val+'"').css('border','2px solid red');
                        $('tr[vkey="'+val+'"').addClass('errorB3');

                        result  = {
                            result : false,
                            message : '['+(idx+1)+']번 : 매출액또는 전체매출액중 하나만 입력해주세요'
                        };
                        return true;
                    }else{
                        keyIdx === 3 ? sumRevenue += regValue / 1 : "";
                        keyIdx === 4 ? allPercent += regValue / 1 : "";
                    }
                }
            });

        });

        if(sumRevenue>allRevenue){
            alert('2020년의 매출액보다 큽니다. [2020] 매출액 : '+allRevenue+"백만원");
            return {
                result : false,
                message : '2020년의 매출액보다 큽니다. [2020] 매출액 : '+allRevenue+"백만원"
            }
        }
        if(allPercent>100){

            alert("전체 매출액 비율이 100%를 넘었습니다.");
            return {
                result : false,
                message : "전체 매출액 비율이 100%를 넘었습니다."
            }
        }

        return result;
    }

    $(document).on("click", ".errorB3", function() { $(this).css('border','none'); });

    $('.plus-button').on('click',function(){
        if(showNumber.length < 15){
            qNumberArr.some(function(val,idx){
                if(showNumber.indexOf(val) === -1 ) {
                    showNumber.push(val);
                    return true
                }
            });
            createRow();
        }else{
            alert('입력할 수 있는 최대 개수입니다.')
        }
    });

    $('.delete-button').on('click',function(){
        var $deleteVal = $(this).parent().parent().attr('vkey')/1;
        showNumber.indexOf($deleteVal) !== -1 ?  showNumber.splice(showNumber.indexOf($deleteVal),1) : '';
        deleteData($deleteVal);
        createRow();
    })

    $('.revenueNoCheck').on('change',function(){
        var idx = $('.revenueNoCheck').index(this);
        var $vkey = $(this).parent().parent().attr('vkey')/1;
        var isCheck;

        isCheck = $('.revenueNoCheck').eq(idx).prop('checked');

        if(isCheck){
            // 체크되었을 때
            $('tr[vkey="'+$vkey+'"').find('td[hkey="98"]').find('input').eq(1).val('98');

            $('tr[vkey="'+$vkey+'"').find('td[hkey="4"]').find('input').val('');
            $('tr[vkey="'+$vkey+'"').find('td[hkey="5"]').find('input').val('');
            $('tr[vkey="'+$vkey+'"').find('td[hkey="4"]').find('input').attr('disabled',true);
            $('tr[vkey="'+$vkey+'"').find('td[hkey="5"]').find('input').attr('disabled',true);
        }else{
            $('tr[vkey="'+$vkey+'"').find('td[hkey="98"]').find('input').eq(1).val('');

            $('tr[vkey="'+$vkey+'"').find('td[hkey="4"]').find('input').attr('disabled',false);
            $('tr[vkey="'+$vkey+'"').find('td[hkey="5"]').find('input').attr('disabled',false);
        }
    });

    $('.revenueDontKnow').on('change',function(){
        var idx = $('.revenueDontKnow').index(this);
        var $vkey = $(this).parent().parent().attr('vkey')/1;
        var isCheck;

        isCheck = $('.revenueDontKnow').eq(idx).prop('checked');

        if(isCheck){
            // 체크되었을 때
            $('tr[vkey="'+$vkey+'"').find('td[hkey="99"]').find('input').eq(1).val('99');

            $('tr[vkey="'+$vkey+'"').find('td[hkey="4"]').find('input').val('');
            $('tr[vkey="'+$vkey+'"').find('td[hkey="5"]').find('input').val('');
            $('tr[vkey="'+$vkey+'"').find('td[hkey="98"]').find('input').val('');
            $('tr[vkey="'+$vkey+'"').find('td[hkey="4"]').find('input').attr('disabled',true);
            $('tr[vkey="'+$vkey+'"').find('td[hkey="5"]').find('input').attr('disabled',true);
            $('tr[vkey="'+$vkey+'"').find('td[hkey="98"]').find('input').attr('disabled',true);
            $('tr[vkey="'+$vkey+'"').find('td[hkey="98"]').find('input').prop('checked',false);

        }else{
            $('tr[vkey="'+$vkey+'"').find('td[hkey="99"]').find('input').eq(1).val('');
            $('tr[vkey="'+$vkey+'"').find('td[hkey="4"]').find('input').attr('disabled',false);
            $('tr[vkey="'+$vkey+'"').find('td[hkey="5"]').find('input').attr('disabled',false);
            $('tr[vkey="'+$vkey+'"').find('td[hkey="98"]').find('input').attr('disabled',false);


        }
    })

    $('button#next').unbind("click").on("click", function () {

        var validateResult = validate();
        if(validateResult.result){
            $('.main-warning').html('');
            $('.main-warning').css('display','none')

            $('button#next').unbind("click").on("click", Save.next)
            Save.next();

        }else{
            $('.main-warning').html(validateResult.message);
            $('.main-warning').css('display','block')
        }
    });



    startRow();




})


