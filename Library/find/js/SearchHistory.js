/**
 * Created by Administrator on 2018/2/8.
 */
//检索历史分页
var pagenum2 = 1;
var totalpage2 = '';
function page2() {
    $(".tcdPageCode2").createPage({
        pageCount: totalpage2,
        current: 1,
        backFn: function(p) {
            pagenum2 = p;
            history();
            $('#all').removeAttr('checked');
            allimg = false;
        }
    });
}
//检索历史
function history(){
    $.ajax({
        url: getURL() + "webservice/service/find/myRetrieve",
//         url:"http://192.168.0.147:8080/webservice/service/find/myRetrieve",
        type: "post",
        async: false,
        dataType: "json",
        data: '{"user":"' + user + '","page":"' + pagenum2 + '","num":"10","type":"0"}',
        success: function (data) {
            console.log(data)
//          $('.history').append('<div class="tcdPageCode2"></div>')
            totalpage2 = Math.ceil(data.data.total/10);
            var html = '';
            for (var i = 0; i < data.data.list.length; i++){
                //配置名称最多显示15字符
                // var retrievename = ''
                // if (data.data.list[i].retrievename.length>15){
                //     retrievename = data.data.list[i].retrievename.substr(0,15)+'...';
                // }else{
                //     retrievename = data.data.list[i].retrievename;
                // }
                //检索条件最多显示46字符
                var typename = ''
                if (data.data.list[i].typeName.length>47){
                    typename = data.data.list[i].typeName.substr(0,65)+'...';
                }else{
                    typename = data.data.list[i].typeName;
                }

                html += '<li>'+
                    '<p class="no_1" style="width: 47px;"><span><input type="checkbox" value="'+data.data.list[i].id+'" class="dg" name="choice" onclick="choice2()"></span></p>'+
                    // '<p class="no_2"><span>'+retrievename+'</span></p>'+
                    '<p class="no_3"><span>'+data.data.list[i].createtime+'</span></p>'+
                    '<p class="no_4" style="width: 518px;"><span>'+typename+'</span></p>'+
                    '<p class="no_5"><a class="del1">删除</a><a class="sousuo2">搜索</a></p>'+
                    '</li>';
            }
            $('.history-con').html(html);
            // choice3();
            // choice4();
            $('input[name=choice]').prop('onclick','false');
        }
    })
}
/*检索历史选择部分*/
//是否全选判断变量
var allimg = false;
function choice() {
    if(allimg) {
        $('input[name=choice]').each(function() {
            this.checked = false;
        });
        allimg = false;
    } else {
        $('input[name=choice]').each(function() {
            this.checked = true;
        });
        allimg = true;
    }
}
/*当全部选择或有一个取消时全选按钮取消*/
function choice2() {
    var one = document.getElementsByClassName("dg");
    var all = document.getElementById("all");
    var selCount = 0;
    var unSelCount = 0;
    for(var i = 0; i < one.length; i++) {
        if( one[i].checked==true ) {
            selCount++;
        }
        if(one[i].checked == false) {
            unSelCount++;
        }
        if(selCount == one.length) {
            all.checked = true;
        }
        if(unSelCount > 0) {
            all.checked = false;
        }
    }
}
/*检索历史选择功能结束*/
//单点删除
$(document).on('click',".del1", function() {
    var a = $(this).parent().parent().find("input[name=choice]").val();
    del1(a);
    $(this).parent().parent().find("input[name=choice]").prop('checked','true');
});
/*检索历史删除功能*/
function del1(all){
    var All = all;
    $.ajax({
        type:"get",
        url:getURL()+"webservice/service/find/deleteRetrieve?id="+All,
        async:true,
        dataType:"json",
        success:function(data){
            adel1();
            $('.tcdPageCode2').remove();
            history();
            page2()
        },
        error:function(err){
            return false;
        }
    });
}
//批量删除
$(".dels1").on('click', function() {
    var all = [];
    $('.history-con input[name=choice]').each(function() {
        if(this.checked == true) {
            all.push($(this).val())
        }
    });
    del1(all);
});
// 检索历史单点删除
function adel1(){
    $('.new-con input[name=choice]').each(function() {
        if(this.checked == true) {
            $(this).parent().parent().parent().remove();
        }
    })
}
//按月删除
$('#time').on('change',function(){
    var timecon = $(this).val()
    if (timecon=='no'){
        return false;
    }else{
        if(confirm("是否清空"+$(this).find("option:selected").text()+"的历史记录")==true){
            $.ajax({
                // url:getURL()+"webservice/service/find/deleteByTime?type="+timecon,
                url:"http://192.168.0.147:8080/webservice/service/find/deleteByTime?type="+timecon,
                type:"get",
                async:true,
                dataType:"json",
                success:function(data){
                    $('.tcdPageCode2').remove();
                    pagenum2=1;
                    history();
                }
            })
        }else{
            return false;
        }
    }
})


/*检索历史删除功能结束*/