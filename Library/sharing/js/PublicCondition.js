/**
 * Created by Administrator on 2018/2/8.
 */
var retrievalid,user,retrievename,resourcetype,detail,database,language,member,startyear,endyear,num,onlyshow;
//获取所有需要的信息
function record(){
    //文献名称
    retrievename = $("#name").val();
    //文献类型id
    resourcetype = $('.top-ri input[name=literature]:checked').val();
    //与或数组
    detail = [];
    for(var i = 0; i < $(".botul>li").length; i++){
        if(i==0){
            detail.push("{'andOr':'','searchName':'"+$(".botul>li").eq(i).find('.txt').val()+"','accurate':'"+$(".botul>li").eq(i).find('.sel3').val()+"','name':'"+$(".botul>li").eq(i).find('.sel2').val()+"'}")
        }else{
            detail.push("{'andOr':'"+$(".botul>li").eq(i).find('.sel1').val()+"','searchName':'"+$(".botul>li").eq(i).find('.txt').val()+"','accurate':'"+$(".botul>li").eq(i).find('.sel3').val()+"','name':'"+$(".botul>li").eq(i).find('.sel2').val()+"'}")
        }
    }
    var obj = document.getElementsByName("data");
    var check_val = new Array();
    for(k in obj){
        if(obj[k].checked){
            check_val.push(obj[k].value);
        }
    }
    database = check_val;
    if(database.length==1){
        database = check_val.toString()+',';
    }else{
        database = check_val.toString();
    }
    //语言
    language = $("#language").val();
    //成员馆
//  member = $("#member").val()+"、";
member = $("#member").val()
    //开始年份
    startyear = $("#startmember").val();
    //结束年份
    endyear = $("#endmember").val();
    //每页显示数
    num = $(".datanumber input[name=datanumber]:checked").val();
    //只显示
    // onlyshow = $(".display input[name=display]:checked").val();
    onlyshow = 0;
}
