document.getElementById("ercitxt").focus();
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
/*数据库搜索*/
var dataname = english = userid = yiji1 = erji2 = sanji3 = '';
userid = 317;
var start = 1;
var end = 20;
//分页
var totalpage = 1; //总页数
$.ajax({
	type:'post',
	url: getURL()+"webservice/service/shared/getDatabaseList",
	async:false,
	dataType:"json",
	data:"{'dataname':'"+dataname+"','english':'"+english+"','userid':'"+ +"','yiji':'"+yiji1+"','erji':'"+erji2+"','sanji':'"+sanji3+"','start':'"+start+"','end':'"+end+"'}",
	success:function(data){
		totalpage = Math.ceil(data.data[0].count/end);
		if(totalpage>1){
			$('.tcdPageCode').css('display','block')
		}else{
			$('.tcdPageCode').css('display','none')
		}
	}
})
function page() {
	$(".tcdPageCode").createPage({
		pageCount: totalpage,
		current: 1,
		backFn: function(p) {
			start = p;
			resource(dataname,english,userid,yiji1,erji2,sanji3,start,end);
		}
	});
}
page();

var dataname = decodeURI(location.search.split('=')[1]);
$("#dataname").val(dataname);
resource(dataname, english, userid, yiji1, erji2, sanji3, start,end);
//字母检索
$('.zimu>li').on('click', function() {
	$('.zimu>li').removeClass('zimucolor');
	$(this).addClass('zimucolor')
	dataname = english = userid = yiji1 = erji2 = sanji3 = '';
	english = $(this).html();
	resource(dataname,english,userid,yiji1,erji2,sanji3,start,end);
})
//搜索一级列表
$.ajax({
	type: 'get',
	url: getURL() + "webservice/service/shared/column",
	async: true,
	dataType: "json",
	success: function(data) {
		var html = '<li class="kucolor">全部数据库<input type="hidden" value="no" /></li>';
		for(var i = 0; i < data.data.yiji.length; i++) {
			html += '<li>' + data.data.yiji[i].NAME + '<input type="hidden" value="' + data.data.yiji[i].ID + '" /></li>'
		}
		$('.ku').html(html)
	}
})
//一级列表点击
$(document).on('click', '.ku>li', function() {
	$('.ku>li').removeClass('kucolor');
	$(this).addClass('kucolor');
	$(this).find("input").val();
//	dataname=english=userid=yiji1=erji2=sanji3= '';
	yiji1 = $(this).find("input").val();
	if(yiji1 == 'no') {
		dataname=english=yiji1=erji2=sanji3= '';
		resource(dataname,english,userid,yiji1,erji2,sanji3,start,end);
		$('.zimu>li').removeClass('zimucolor');
	} else {
		erji2=sanji3= '';
		resource(dataname,english,userid,yiji1,erji2,sanji3,start,end);
	}
})

//荐购
$(document).on('click', '.rt', function() {
	var thisid = $(this).parent().find(".thisid").val();
	window.location.href = "recommendation.html?id=" + thisid;
})
$('.jiangou').on('click',function(){
	window.location.href = 'recommendation.html'
})
//数据库收藏
$(document).on('click', '.data1>p>a', function() {
	var databaseid = $(this).find("input").val();
	var This = $(this);
	$.ajax({
		type: "post",
		url: getURL() + "webservice/service/shared/addcollect",
		async: true,
		dataType: "json",
		data: "{'userid':'300256425','databaseid':'" + databaseid + "'}",
		success: function(data) {
			console.log(data)
			This.html("<img style='margin-top: -5px;' src='img/shoucang_03.png'/> 已收藏");
			alert('添加成功')
		}
	});
})

//资源链接点击
$(document).on('click', '.bookg>li', function() {
	var val = $(this).find("input").val()
	if(val != "no") {
		//资源库点击量统计
		var userip = returnCitySN['cip'];
		$.ajax({
			type: "post",
			url: getURL() + "webservice/service/shared/addDatabaseinfo",
			async: true,
			dataType: "json",
			data: "{'ipinfo':'120.12.0.65','databaseid':'" + val + "'}",
			success: function(data) {
				window.location.href = getURL() + 'shared/resjump/redirect?resourcesid=' + val;
			}
		});

	}
})

/*高级搜索*/
//弹框触发
		$('#senior').on('click', function() {
			$('#myModal').modal('show');
		})
		//信息+
		var optionnum = 3;
		$('.botul>span:nth-child(1)').on('click', function() {
			// console.log(optionnum)
			if(optionnum > 4) {
				alert("最多支持五条");
				return
			}
			var html = '<li>' +
				'<select name="" class="sel1">' +
				'<option value="and">与</option>' +
				'<option value="or">或</option>' +
				'</select> ' +
				'<select name="" class="sel2">' +
				erjicon +
				'</select> ' +
				'<input type="text" name="" value="" class="txt" /> ' +
				'<select name="" class="sel3">' +
				'<option value="0">全部</option>' +
				'<option value="1">精确</option>' +
				'</select>' +
				'</li>';
			$('.botul').append(html);
			optionnum++
		})
		//信息-
		$('.botul>span:nth-child(2)').on('click', function() {
			$('.botul>li:last-child').remove();
		})
		//高级搜索一级
		yiji();
		function yiji() {
			$.ajax({
				url: getURL() + "webservice/service/find/selectFindResourceClassification",
				type: "get",
				async: true,
				dataType: "json",
				success: function(data) {
					var html = '<p class="clickp"><input name="literature" type="radio" checked="checked" value="' + data.data[0].id + '">' + data.data[0].name + ' </p>';
					for(var i = 1; i < data.data.length; i++) {
						html += '<p class="clickp"><input name="literature" type="radio" value="' + data.data[i].id + '">' + data.data[i].name + ' </p>';
					}
					$('.top-ri').html(html);
					erji(data.data[0].id);
					$(".clickp").on('click', function() {
						$('input[name=literature]').removeAttr('checked')
						$(this).find('input').prop('checked', 'checked');
						var andorid = $(this).find('input').val()
						erji(andorid);
					})
				}
			})
		}
		//高级搜索二级
		var erjicon = ''; //保存下拉信息在+时调用
		function erji(id) {
			$.ajax({
				url: getURL() + "webservice/service/find/selectFindDocumenttype?type=" + id,
				type: "get",
				async: true,
				dataType: "json",
				success: function(data) {
					// console.log(data)
					var html = '';
					for(var i = 0; i < data.data.length; i++) {
						html += '<option value="' + data.data[i].propertyName + '">' + data.data[i].name + '</option>';
					}
					$('.sel2').html(html)
					erjicon = html;
				}
			})
		}
		//模态框关闭时清空所有选项
		$('#myModal').on('hidden.bs.modal', function() {
			$('#name,.txt').val('');
			yiji();
			$('.sel1').val('and');
			$('.sel3').val('0');
			jsku();
			language1();
			cyg();
			$('input[name=datanumber],input[name=display]').removeAttr('checked');
			$(".tiaoshu").eq(0).prop('checked', 'checked');
			$(".xianshi").eq(0).prop('checked', 'checked');
			$('#startmember').html('<option value="">开始的年份</option>');
			$('#endmember').html('<option value="">结束的年份</option>');
			yeartime();
			$('.botul>li').eq(2).nextAll().remove();
		})
		//高级搜索数据库选择
		jsku();

		function jsku() {
			$.ajax({
				url: getURL() + "webservice/service/find/selectFindRepository",
				type: "get",
				async: true,
				dataType: "json",
				success: function(data) {
					var html = "";
					for(var i = 0; i < data.data.length; i++) {
						html += '<label>' + data.data[i].name + '<input name="data" type="checkbox" value="' + data.data[i].id + '"></label>'
					}
					$('.data').html(html)
				}
			})
		}
		//语种
		language1();

		function language1() {
			$.ajax({
				url: getURL() + "webservice/service/find/selectDict?typeCode=langCode",
				type: "get",
				async: true,
				dataType: "json",
				success: function(data) {
					// console.log(data)
					var html = '';
					for(var i = 0; i < data.data.length; i++) {
						html += "<option value='" + data.data[i].id + "'>" + data.data[i].name + "</option>"
					}
					$("#language").html(html)
				}
			})
		}
		//成员馆
		cyg();

		function cyg() {
			$.ajax({
				url: getURL() + "webservice/service/find/selectHouse",
				type: "get",
				async: true,
				dataType: "json",
				success: function(data) {
					var html = '';
					for(var i = 0; i < data.data.length; i++) {
						html += "<option value='" + data.data[i].id + "'>" + data.data[i].name + "</option>"
					}
					$('#member').html(html)
				}
			})
		}
		//设置年份的选择
		yeartime();

		function yeartime() {
			var myDate = new Date();
			var startYear = myDate.getFullYear() - 50; //起始年份
			var endYear = myDate.getFullYear() + 50; //结束年份
			var html = '<option value="0">开始的年份</option>';
			for(var i = startYear; i <= endYear; i++) {
				html += '<option value="' + i + '">' + i + '</option>'
			}
			$('#startmember').html(html) //.val(myDate.getFullYear());//定位到当年
			$('#startmember').on("change", function() {
				html = '<option value="0">结束的年份</option>';
				for(var j = this.value; j <= endYear; j++) {
					if(j == 0) {
						return false;
					}
					html += '<option value="' + j + '">' + j + '</option>'
				}
				$('#endmember').html(html) //.val(myDate.getFullYear());//定位到当年
			})
		}
/*高级搜索结束*/