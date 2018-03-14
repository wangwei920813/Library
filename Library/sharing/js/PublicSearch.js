/*
 * 资源库查询模块
 * dataname	数据库名称				无	用于搜索框搜索条件，没有不传
 * english	搜索字母				无	字母搜索条件，没有不传
 * userid	用户ID				是	登录传用户ID，未登录传1，必传
 * yiji	          一级目录点击ID			无	点击就传，没有不传
 * erji	          二级目录点击ID			无	点击就传，没有不传
 * sanji	三级目录点击ID			无	点击就传，没有不传
 * start	三级目录点击ID			必传	分页页码
 * end		三级目录点击ID			必传	分页查询个数
*/
//记录请求数据
	var datacon = '';
function resource(dataname,english,userid,yiji,erji,sanji,start,end){
	$.ajax({
		type:'post',
		url: getURL()+"webservice/service/shared/getDatabaseList",
		async:true,
		dataType:"json",
		data:"{'dataname':'"+dataname+"','english':'"+english+"','userid':'"+ userid+"','yiji':'"+yiji+"','erji':'"+erji+"','sanji':'"+sanji+"','start':'"+start+"','end':'"+end+"'}",
		success:function(data){
			console.log(data)
			var html = '';
			var htmlindex = '';
//			totalpage = data.data[0].count;
			datacon = data.data;
			//判断是在导航页还是搜索页
			if(location.search.split('=')[0]==''){
				$('.c-right-right>p:nth-child(2)>span').html(data.data.length);
				for(var i = 0; i < data.data.length; i++){
					html += "<li style='position: relative;'><p style='width: 100%;position: absolute;top: 50%;transform: translateY(-50%);-ms-transform: translateY(-50%);-moz-transform: translateY(-50%);-webkit-transform: translateY(-50%);'>"+data.data[i].name+"</p><input type='hidden' value="+data.data[i].id+"></li>";
					htmlindex = "<li>"+data.data[i].name+"<input type='hidden' value="+data.data[i].id+"></li>";
				}
				$(".c-content").html(html);
				$(".c-right-con").html(html);
				if(data.data.length<48){
					$('.more').css('display','none');
				}else{
					$('.more').css('display','block');
				}
			}else{
				if(data.data==''){
					$('#data').css('display', 'none');
					$('.result1').css('display', 'block');
				}else{
					$('#data').css('display', 'block');
					$('.result1').css('display', 'none');
				}
				var collect = ''//收藏
				var recommended = ''//荐购角标
				var lianjie = ''//资源链接
				var explain = ''//资源说明
				var introduce = ''//资源内容
				for(var i = 0; i < data.data.length; i++){
					//荐购判断
					if(data.data[i].recommended==1){
						recommended = '<img class="rt" src="img/tuijian_03.png"/>';
					}
					//收藏判断
					if(data.data[i].collect==1){
						collect = '<p><a style="cursor:pointer;"><img style="margin-top: -5px;" src="img/shoucang_03.png"/> 已收藏</a></p>'
					}else{
						collect = '<p><a style="cursor:pointer;"><img style="margin-top: -5px;" src="img/weishoucang_03.png"/> 点击收藏<input class="thisid" type="hidden" value="'+data.data[i].id+'"></a></p>';
					}
					//内容判断
					if(data.data[i].introduce==''){
						introduce = '无资源内容介绍';
					}else{
						introduce = data.data[i].introduce
					}
					//资源链接判断
					if(data.data[i].dalink==''){
						lianjie = "<span>无资源链接<input type='hidden' value='no'></span>"
					}else{
						for(var j = 0; j < data.data[i].dalink.length; j++){
							lianjie += "<li>"+data.data[i].dalink[j].NAME+"<input type='hidden' value='"+data.data[i].id+"'></li>"
						}
					}
					//资源说明
					if(data.data[i].courseware==''){
						explain = '该资源无说明';
					}else {
						if(data.data[i].courseware[0].mp4url!=''){
							explain += "<a href='video.html?"+data.data[i].courseware[0].mp4url+"' title='视频' style='background:url(img/shipin_05.png);display: inline-block;width:30px;height:30px;    vertical-align: middle;'></a>";
						}
						if(data.data[i].courseware[0].fileurl!=''){
							explain += "<a href='"+data.data[i].courseware[0].fileurl+"' title='文档' style='background:url(img/shipin_03.png);display: inline-block;width:30px;height:30px;    vertical-align: middle;margin-left:5px;'></a>";
						}
					}
					
					html += '<li>'+
							'<div class="data1">'+
								recommended+
								'<h3>'+data.data[i].name+'</h3>'+
								collect+
								'<p class="bb">'+data.data[i].guanshudi+'</p>'+
							'</div>'+
							'<div class="data2">'+
								'<h3>资源介绍</h3>'+
								'<p>'+introduce+'</p>'+
//								'<p class="bq"><img src="img/shuqian_03.png"/> 所属标签：'+123+'</p>'+
							'</div>'+
							'<div class="data3">'+
								'<p class="ptext">资源链接：</p>'+
								'<ul class="bookg">'+
									lianjie+
								'</ul>'+
								'<p class="explain">使用说明： '+explain+'</p>'+
								'<p class="clicknum">点击数：<span>'+data.data[i].current+'</span></p>'+
							'</div>'+
						'</li>';
				 collect = ''//收藏
				 recommended = ''//荐购角标
				 lianjie = ''//资源链接
				 explain = ''//资源说明
				 introduce = ''//资源内容
				}
				$('#data').html(html);
			}
		}
	})
}




/*二次搜索的框内图书分类*/
$.ajax({
	type:"get",
	url:getURL()+"webservice/service/find/selectFindResourceClassification",
	async:true,
	dataType:"json",
	success:function(data){
//					console.log(data)
        var html = '<li class="ercic">全部字段<input type="hidden" value="" /></li>'
        for (var i = 0; i < data.data.length; i++) {
            html += '<li>' + data.data[i].name + '<input type="hidden" value="' + data.data[i].id + '" /></li>';
        }
		$('.list').html(html);
	}
})
/*二次搜索框内图书分类点击后详细分类*/
var erciclick = '';//二级的type值
var ercival = '';//二级分类的点击值
$(document).on('click','.list>li',function(){
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
$(document).on('click','.option>li',function(){
	$('.option>li>img').attr('src','img/dian_03.png');
	$(this).find('img').attr('src','img/dian_06.png');
})



//中文外文搜索
var chen = ''//中文、外文
var searchval = ''//搜索内容
var database2 = ''//数据库
var yeares = ''//年份
var menber = ''//成员馆藏
$('#ch,#en').on('click', function () {
    if ($('#ercitxt').val()==''){
        return false;
    }
    if ($(this).attr('id')=='ch'){
        chen = 87;
    }else{
        chen = 88;
    }
    database2 = ''
    yeares = ''
    menber = ''
    searchval = $('#ercitxt').val();
    pagenum = 1;
    searchnum = 1;
    totalpage = '';
    var user = 317;
    var aaa = user+"&"+erciclick+"&"+chen+"&"+ercival+"&"+pagenum+"&"+searchval+"&"+database2+"&"+yeares+"&"+menber+"&"+1+"&"+"false";
    window.location.href = '../find/result.html?'+aaa
})

