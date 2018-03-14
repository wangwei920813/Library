//二次搜索选择条件
$.ajax({
    type: "get",
    url: getURL() + "webservice/service/find/selectFindResourceClassification",
    async: true,
    dataType: "json",
    success: function (data) {
        // var html = '<li class="ercic">' + data.data[0].name + '<input type="hidden" value="' + data.data[0].id + '" /></li>';
        // console.log(data)
        var html = '<li class="ercic">全部字段<input type="hidden" value="" /></li>'
        for (var i = 0; i < data.data.length; i++) {
            html += '<li>' + data.data[i].name + '<input type="hidden" value="' + data.data[i].id + '" /></li>';
        }
        $('.list').html(html);
    }
})
var erciclick = '';//二级的type值
var ercival = 'ALL';//二级分类的点击值
$(document).on('click', '.list>li', function () {
    $('.list>li').removeClass('ercic');
    $(this).addClass('ercic');
    erciclick = $(this).find('input').val();
    if($(this).find('input').val()==''){
        $('.option').html('');
        ercival = '';
        return false;
    }
    var erci = '';
    $.ajax({
        type: "get",
        url: getURL() + "webservice/service/find/selectFindDocumenttype?type=" + erciclick + "",
        async: true,
        dataType: "json",
        success: function (data) {
            // console.log(data)
            if (data.data.length == 0) {
                $('.option').html('');
                ercival = '';
                return false;
            }
            ercival = data.data[0].propertyName;
            erci = '<li><img src="img/dian_06.png"/>' + data.data[0].name + '<input type="hidden" value="' + data.data[0].propertyName + '" /></li>'
            for (var i = 1; i < data.data.length; i++) {
                erci += '<li><img src="img/dian_03.png"/>' + data.data[i].name + '<input type="hidden" value="' + data.data[i].propertyName + '" /></li>';
            }
            $('.option').html(erci);
        }
    })
})
$(document).on('click', '.option>li', function () {
    $('.option>li>img').attr('src', 'img/dian_03.png');
    $(this).find('img').attr('src', 'img/dian_06.png');
    ercival = $(this).find('input').val();
})
//书籍多选
$(document).on('click','.dui', function () {
    if ($(this).html() == '') {
        $(this).html('<img src="img/dui.png"/>')
    } else {
        $(this).html('');
    }
    return false;
})
//左侧辅助检索
$(document).on('click','.con-left>div',function () {
    $('.con-left>div>div').attr('id','');
    $('.con-left>div').eq($(this).index()).find('div').attr('id','jiao');
})
//高级检索
$('#senior').on('click', function () {
    $('#myModal').modal('show');
})
//题录
$('.tilu').on('click', function () {
    $('#mytilu').modal('show');
})
//图书点击跳转
$(document).on('click','.booktitle', function () {
    var This = $(this);
    //热度+1
    $.ajax({
        type:'get',
        url:getURL()+"webservice/service/find/addHeat?id="+This.find('.dataid').val(),
        async:true,
        dataType:'json',
        success:function(data){
            sessionStorage.setItem("bookdata",JSON.stringify(This.find('.hiddendata').val()))
            window.location.href = 'book.html?id='+This.find('.dataid').val();
        }
    })
})
//搜索详情按钮点击
$(document).on('click','.labels>li',function(){
    var thisid = $(this).find('input').val();
    if (thisid==5){//收藏
        $.ajax({
            type: "post",
            url: getURL() + "webservice/service/find/addMyCollect",
            async: true,
            dataType: "json",
            data:"{'userId':'317','bookId':'"+thisid+"','type':'0'}",
            success: function (data) {
                console.log(data)
                alert("收藏成功")
            }
        })
    }

})



$('.yuanwen').on('click', function () {
    $('#preview').modal('show');
    createCode();//验证码调用
})
/*验证码部分*/
var code;
function createCode() {
    code = "";
    var codeLength = 6; //验证码的长度
    var checkCode = document.getElementById("checkCode");
    var codeChars = new Array(0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y'); //所有候选组成验证码的字符，当然也可以用中文的
    for (var i = 0; i < codeLength; i++) {
        var charNum = Math.floor(Math.random() * 52);
        code += codeChars[charNum];
    }
    if (checkCode) {
        checkCode.className = "code";
        checkCode.innerHTML = code;
    }
}
checkCode.onclick = function () {
    return false;
}
function validateCode() {
    var inputCode = document.getElementById("inputCode").value;
    if (inputCode.length <= 0) {
        alert("请输入验证码！");
    } else if (inputCode.toUpperCase() != code.toUpperCase()) {
        alert("验证码输入有误！");
        createCode();
    } else {
        alert("提交成功！");
        $('#preview').modal('hide');
    }
}
/*验证码部分结束*/

//设置年份的选择
var myDate = new Date();
var startYear = myDate.getFullYear() - 50;//起始年份
var endYear = myDate.getFullYear() + 50;//结束年份
//			var obj1=document.getElementById('myYear1');
//			var obj2=document.getElementById('myYear2');
var html = '<option value="0">开始的年份</option>';
for (var i = startYear; i <= endYear; i++) {
//				obj1.options.add(new Option(i,i)); 
    html += '<option value="' + i + '">' + i + '</option>'
}
//			obj1.options[obj1.options.length-51].selected=1; 
$('#myYear1').html(html)//.val(myDate.getFullYear());
$('#myYear1').on("change", function () {
    html = '<option value="0">结束的年份</option>'
    for (var i = this.value; i <= endYear; i++) {
        if (i = 0) {
            return false;
        }
        html += '<option value="' + i + '">' + i + '</option>'
    }
    $('#myYear2').html(html)//.val(myDate.getFullYear());
})
$('.user').on('click', function () {
    window.location.href = 'user.html'
})