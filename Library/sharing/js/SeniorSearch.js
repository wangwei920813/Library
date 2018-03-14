/**
 * Created by Administrator on 2018/2/8.
 */
// 高级搜索 搜索接口
$(document).on('click','#searchbtn',function(){
    record();
    user = 317;
    // var a = "{'user':'"+user+"','resourcetype':'"+resourcetype+"',detail:["+detail+"],'database':'"+database+"','language':'"+language+"','member':'"+member+"','startyear':'"+startyear+"','endyear':'"+endyear+"','num':'"+num+"'}"
    $.ajax({
        url:getURL()+"webservice/service/find/advanceSearch",
        // url:"http://192.168.0.147:8080/webservice/service/find/advanceSearch",
        type:"post",
        async:true,
        dataType:"json",
        data:"{'user':'"+user+"','resourcetype':'"+resourcetype+"',detail:["+detail+"],'database':'"+database+"','language':'"+language+"','member':'"+member+"','startyear':'"+startyear+"','endyear':'"+endyear+"','num':'"+num+"'}",
        success:function(data){
            console.log(data)
            $('#myModal').modal('hide');
            var bbb = user+"&"+resourcetype+"&"+detail+"&"+database+"&"+language+"&"+member+"&"+startyear+"&"+endyear+"&"+num+"&"+1+"&"+"true";
            if (data.data.total!=0){
                window.location.href = '../find/result.html?'+bbb
            }else{
                alert("您搜索的信息未找到")
            }

        }
    })
})



