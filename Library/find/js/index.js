$(function () {
    document.getElementById("txt").focus();
    var txtObj = document.getElementById("alertSpan");
    //回调函数，用于获取用户当前选择的文字
    function show(str){
        txtObj.innerHTML = str;
    }
    var params = {
        "XOffset": 0,   //提示框位置横向偏移量,单位px
        "YOffset": 0,   //提示框位置纵向偏移量,单位px
        "width": 204,   //提示框宽度，单位px
        "fontColor": "#666",  //提示框文字颜色
        "fontColorHI": "#222",  //提示框高亮选择时文字颜色
        "fontSize": "16px",  //文字大小
        "fontFamily": "微软雅黑", //文字字体
        "borderColor": "#d8d8d8", //提示框的边框颜色
        "bgcolorHI": "#e8e8e8",  //提示框高亮选择的颜色
        "sugSubmit": true,  //在选择提示词条是是否提交表单
    };
    BaiduSuggestion.bind("ipt1",params,show);

    user = 317;
    $('.jump>p:nth-child(1)').on('click', function () {
        window.location.href = '../sharing/navigation.html';
    })
    //中英文搜索点击
    $('.ch-btn,.en-btn').on('click', function () {
        if($('#txt').val()==''){
            return false;
        }else{
            if($('.bibliography').val()==69){
                window.location.href = 'http://202.105.30.26:8088/opac/servlet/opac.go'
            }else if($('.bibliography').val()==70){
                user = 317;
                var erciclick = '';
                var chen = $(this).find('.klj').val();
                var ercival = '';
                var pagenum = '1';
                var searchval = $('#txt').val();
                var database2 = '';
                var yeares = '';
                var menber = '';
                var bbb = user+"&"+erciclick+"&"+chen+"&"+ercival+"&"+pagenum+"&"+searchval+"&"+database2+"&"+yeares+"&"+menber+"&"+1+"&"+"false";
                //user+"&"+resourcetype+"&"+language+"&"+name+"&"+page+"&"+num+"&"+searchName+"&"+databases+"&"+times+"&"+members+"&"+1+"&"+"false"
                window.location.href = 'result.html?'+bbb;
            }
        }

    })
    //词云
    $.ajax({
        type: "get",
        url: getURL() + "webservice/service/find/showHotWord",
        async: true,
        dataType: "json",
        success: function (data) {
            console.log(data)
            var html = ''
            for (var i = 0; i < data.data.length; i++) {
                html += '<a href="javascript:void(0)">' + data.data[i].name + '</a>'
            }
            $('#div1').html(html);
            /*词云初始化调用*/
            var i = 0;
            var oTag = null;
            oDiv = document.getElementById('div1');
            aA = oDiv.getElementsByTagName('a');
            for (i = 0; i < aA.length; i++) {
                oTag = {};
                oTag.offsetWidth = aA[i].offsetWidth;
                oTag.offsetHeight = aA[i].offsetHeight;
                mcList.push(oTag);
            }
            sineCosine(0, 0, 0);
            positionAll();
            oDiv.onmouseover = function () {
                active = true;
            };
            oDiv.onmouseout = function () {
                active = false;
            };
            oDiv.onmousemove = function (ev) {
                var oEvent = window.event || ev;
                mouseX = oEvent.clientX - (oDiv.offsetLeft + oDiv.offsetWidth / 2);
                mouseY = oEvent.clientY - (oDiv.offsetTop + oDiv.offsetHeight / 2);
                mouseX /= 10;
                mouseY /= 10;
            };
            setInterval(update, 30);
            /*词云初始化调用结束*/

            //词云标签点击事件
            $('#div1>a').on('click', function () {
                $('#txt').val($(this).text());
            })

        }
    });

    //搜索一级下拉
    var databibliography = '';
    $.ajax({
        type: "get",
        url: getURL() + "webservice/service/find/selectDict?typeCode=retrieval",
        async: true,
        dataType: "json",
        success: function (data) {
            var html = '';
            databibliography = data.data[0].name
            for (var i = 0; i < data.data.length; i++) {
                html += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
            }
            $('.bibliography').html(html);
        }
    })
    //一级下拉选择
    $(document).on("change", '.bibliography', function () {
        console.log($(".bibliography").find("option:selected").text());
        if ($(".bibliography").find("option:selected").text() == databibliography) {
            $('.field').css({
                'display': 'inline-block'
            })
            $('#txt').css({
                'width': '347px',
                'border-left': 'none',
                'border-radius': '0'
            })
        } else {
            $('.field').css({
                'display': 'none'
            })
            $('#txt').css({
                'width': '467px',
                'border-left': '1px solid #ccc',
                'border-radius': '4px,0,0,4px'
            })
        }

    })
    //搜索二级下拉
    unionbibliography();
    function unionbibliography() {
        $.ajax({
            type: "get",
            url: getURL() + "webservice/service/find/selectDict?typeCode=bibliography",
            async: true,
            dataType: "json",
            success: function (data) {
                console.log(data)
                var html = '';
                for (var i = 0; i < data.data.length; i++) {
                    html += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                }
                $('.field').html(html);
            }
        })
    }

    //二级下拉选择
//			$('.field').on("change",function(){
//				console.log($(".field").find("option:selected").text());
//			})

    /*高级检索*/
    $('.jump>p:nth-child(2)').on('click', function () {

        $('#myModal').modal('show');
    })
    //个性化检索关闭
    $('#returnbtn').on('click',function(){
        $('#myModal').modal('hide');
    })
    //模态框关闭时清空所有选项
    $('#myModal').on('hidden.bs.modal', function () {
        $('#name,.txt').val('');
        yiji();
        $('.sel1').val('and');
        $('.sel3').val('0');
        jsku();
        language1();
        cyg();
        $('input[name=datanumber],input[name=display]').removeAttr('checked');
        $(".tiaoshu").eq(0).prop('checked','checked');
        $(".xianshi").eq(0).prop('checked','checked');
        $('#startmember').html('<option value="">开始的年份</option>');
        $('#endmember').html('<option value="">结束的年份</option>');
        yeartime();
        $('.botul>li').eq(2).nextAll().remove();
    })
    //新建个性化检索一级
    yiji();
    function yiji(){
        $.ajax({
            url:getURL()+"webservice/service/find/selectFindResourceClassification",
            type:"get",
            async:true,
            dataType:"json",
            success:function (data) {
                var html = '<p class="clickp"><input name="literature" type="radio" checked="checked" value="'+data.data[0].id+'">'+data.data[0].name+' </p>';
                for (var i = 1; i < data.data.length; i++) {
                    html += '<p class="clickp"><input name="literature" type="radio" value="'+data.data[i].id+'">'+data.data[i].name+' </p>';
                }
                $('.top-ri').html(html);
                erji(data.data[0].id);
                $(".clickp").on('click',function(){
                    $('input[name=literature]').removeAttr('checked')
                    $(this).find('input').prop('checked','checked');
                    var andorid = $(this).find('input').val()
                    erji(andorid);
                })
            }
        })
    }
    //新建个性化二级
    var erjicon = '';//保存下拉信息在+时调用
    function erji(id){
        $.ajax({
            url:getURL()+"webservice/service/find/selectFindDocumenttype?type="+id,
            type:"get",
            async:true,
            dataType:"json",
            success:function (data) {
                // console.log(data)
                var html = '';
                for (var i = 0; i < data.data.length; i++){
                    html += '<option value="'+data.data[i].propertyName+'">'+data.data[i].name+'</option>';
                }
                $('.sel2').html(html)
                erjicon = html;
            }
        })
    }
    //信息+
    var optionnum = 3;
    $('.botul>span:nth-child(1)').on('click',function(){
        // console.log(optionnum)
        if(optionnum>4){
            alert("最多支持五条");
            return
        }
        var html = '<li>'+
            '<select name="" class="sel1">'+
            '<option value="and">与</option>'+
            '<option value="or">或</option>'+
            '</select> '+
            '<select name="" class="sel2">'+
            erjicon+
            '</select> '+
            '<input type="text" name="" value="" class="txt" /> '+
            '<select name="" class="sel3">'+
            '<option value="0">全部</option>'+
            '<option value="1">精确</option>'+
            '</select>'+
            '</li>';
        $('.botul').append(html);
        optionnum++
    })
    //信息-
    $('.botul>span:nth-child(2)').on('click',function(){
        $('.botul>li:last-child').remove();
    })

    //新建个性化检索数据库选择
    jsku();
    function jsku(){
        $.ajax({
            url:getURL()+"webservice/service/find/selectFindRepository",
            type:"get",
            async:true,
            dataType:"json",
            success:function(data){
                var html = "";
                for (var i = 0; i < data.data.length; i++) {
                    html+='<label>'+data.data[i].name+'<input name="data" type="checkbox" value="'+data.data[i].id+'"></label>'
                }
                $('.data').html(html)
            }
        })
    }
    //语种
    language1();
    function language1(){
        $.ajax({
            url:getURL()+"webservice/service/find/selectDict?typeCode=langCode",
            type:"get",
            async:true,
            dataType:"json",
            success:function(data){
                // console.log(data)
                var html = '';
                for(var i = 0; i < data.data.length; i++){
                    html += "<option value='"+data.data[i].id+"'>"+data.data[i].name+"</option>"
                }
                $("#language").html(html)
            }
        })
    }
    //成员馆
    cyg();
    function cyg(){
        $.ajax({
            url:getURL()+"webservice/service/find/selectHouse",
            type:"get",
            async:true,
            dataType:"json",
            success:function(data){
                var html = '';
                for (var i = 0; i < data.data.length; i++){
                    html += "<option value='"+data.data[i].id+"'>"+data.data[i].name+"</option>"
                }
                $('#member').html(html)
            }
        })
    }
    //设置年份的选择
    yeartime();
    function yeartime(){
        var myDate= new Date();
        var startYear=myDate.getFullYear()-50;//起始年份
        var endYear=myDate.getFullYear()+50;//结束年份
        var html = '<option value="0">开始的年份</option>';
        for (var i=startYear;i<=endYear;i++){
            html += '<option value="'+i+'">'+i+'</option>'
        }
        $('#startmember').html(html)//.val(myDate.getFullYear());//定位到当年
        $('#startmember').on("change", function(){
            html = '<option value="0">结束的年份</option>';
            for (var j=this.value; j<=endYear; j++){
                if(j==0){
                    return false;
                }
                html += '<option value="'+j+'">'+j+'</option>'
            }
            $('#endmember').html(html)//.val(myDate.getFullYear());//定位到当年
        })
    }


})
