	//请求参数
	var dataname = english = userid = yiji = erji = sanji = '';
	var start = 1;
	var end = 20;
	userid = 300256425;
	var totalpage = 1;
	//一级列表
	$.ajax({
		type: 'get',
		url: getURL() + "webservice/service/shared/column",
		async: true,
		dataType: "json",
		success: function(data) {
			//					console.log(data)
			var html = '<li class="kucolor2">全部数据库<input type="hidden" value="no" /></li>';
			for(var i = 0; i < data.data.yiji.length; i++) {
				html += '<li>' + data.data.yiji[i].NAME + '<input type="hidden" value="' + data.data.yiji[i].ID + '" /></li>'
			}
			$('.ku2').html(html)
		}
	})
	$(document).on('click', '.ku2>li', function() {
		$('.ku2>li').removeClass('kucolor2');
		$(this).addClass('kucolor2');
		$(this).find("input").val();
		dataname = english = yiji = erji = sanji = '';
		yiji = $(this).find("input").val();
		if(yiji == 'no') {
			dataname = english = yiji = erji = sanji = '';
			shoucang(dataname, english, userid, yiji, erji, sanji, start, end);
			$('.zimu2>li').removeClass('zimucolor2');
		} else {
			shoucang(dataname, english, userid, yiji, erji, sanji, start, end);
		}
	})
	//收藏取消
	$(document).on('click', '.dele', function() {

	})
	//字母检索
	$('.zimu2>li').on('click', function() {
		$('.zimu2>li').removeClass('zimucolor2');
		$(this).addClass('zimucolor2')
		dataname = english = yiji = erji = sanji = '';
		english = $(this).html();
		shoucang(dataname, english, userid, yiji, erji, sanji, start, end);
	})
	//收藏内容
	shoucang(dataname, english, userid, yiji, erji, sanji, start, end);

	function shoucang(dataname, english, userid, yiji, erji, sanji, start, end) {
		$.ajax({
			type: 'post',
			url: getURL() + "webservice/service/shared/getDatabaseList",
			async: false,
			dataType: "json",
			data: "{'dataname':'" + dataname + "','english':'" + english + "','userid':'" + userid + "','yiji':'" + yiji + "','erji':'" + erji + "','sanji':'" + sanji + "','start':'" + start + "','end':'" + end + "'}",
			success: function(data) {
				if(data.data.length == '') {
					$('.tcdPageCode').css('display', 'none');
					$('.collection').html('')
					return false;
				} else {
					$('.tcdPageCode').css('display', 'block');
				}
				totalpage = Math.ceil(data.data[0].count/end); //总页数
				if(totalpage>1){
					$('.tcdPageCode').css('display','block')
				}else{
					$('.tcdPageCode').css('display','none')
				}
				console.log(data)
				var html = '';
				var collect = '' //收藏
				var recommended = '' //荐购角标
				var lianjie = '' //资源链接
				var explain = '' //资源说明
				var introduce = '' //资源内容
				for(var i = 0; i < data.data.length; i++) {
					//荐购判断
					if(data.data[i].recommended == 1) {
						recommended = '<img class="rt" src="img/tuijian_03.png"/>';
					}
					//内容判断
					if(data.data[i].introduce == '') {
						introduce = '无资源内容介绍';
					} else {
						introduce = data.data[i].introduce
					}
					//资源链接判断
					if(data.data[i].dalink == '') {
						lianjie = "<span>无资源链接<input type='hidden' value='no'></span>"
					} else {
						for(var j = 0; j < data.data[i].dalink.length; j++) {
							lianjie += "<li>" + data.data[i].dalink[j].NAME + "<input type='hidden' value='" + data.data[i].id + "'></li>"
						}
					}
					//资源说明
					if(data.data[i].courseware == '') {
						explain = '该资源无说明';
					} else {
						if(data.data[i].courseware[0].mp4url != '') {
							explain += "<a href='video.html?" + data.data[i].courseware[0].mp4url + "' title='视频' style='background:url(img/shipin_05.png);display: inline-block;width:30px;height:30px;    vertical-align: middle;'></a>";
						}
						if(data.data[i].courseware[0].fileurl != '') {
							explain += "<a href='" + data.data[i].courseware[0].fileurl + "' title='文档' style='background:url(img/shipin_03.png);display: inline-block;width:30px;height:30px;    vertical-align: middle;margin-left:5px;'></a>";
						}
					}
					html += '<li>' +
						'<div class="data1">' +
						recommended +
						'<h3>' + data.data[i].name + '</h3>' +
						'<p><a class="dele" style="cursor:pointer;"><img style="margin-top: -5px;" src="img/shoucang_03.png"/> 取消收藏<input class="thisid" type="hidden" value="' + data.data[i].id + '"></a></p>' +
						'<p class="bb">' + data.data[i].guanshudi + '</p>' +
						'</div>' +
						'<div class="data2">' +
						'<h3>资源介绍</h3>' +
						'<p>' + introduce + '</p>' +
						//								'<p class="bq"><img src="img/shuqian_03.png"/> 所属标签：'+123+'</p>'+
						'</div>' +
						'<div class="data3">' +
						'<p class="ptext">资源链接：</p>' +
						'<ul class="bookg">' +
						lianjie +
						'</ul>' +
						'<p class="explain">使用说明： ' + explain + '</p>' +
						'<p class="clicknum">点击数：<span>' + data.data[i].current + '</span></p>' +
						'</div>' +
						'</li>';
					collect = '' //收藏
					recommended = '' //荐购角标
					lianjie = '' //资源链接
					explain = '' //资源说明
					introduce = '' //资源内容
				}
				$('.collection').html(html);
			}
		});
	}
	//分页
	 
	page();
	function page() {
		$(".tcdPageCode").createPage({
			pageCount: totalpage,
			current: 1,
			backFn: function(p) {
				start = p;
				shoucang(dataname, english, userid, yiji, erji, sanji, start, end);
			}
		});
	}
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
					console.log(data)
					window.location.href = getURL() + 'shared/resjump/redirect?resourcesid=' + val;
				}
			});

		}
	})
	//数据库收藏取消
	$(document).on('click', '.dele', function() {
		var quxiaoid = $(this).find("input").val();
		$.ajax({
			type: "post",
			url: getURL() + "webservice/service/shared/getCollects",
			async: true,
			dataType: "json",
			data: "{'userid':'300256425','databaseid':'" + quxiaoid + "'}",
			success: function(data) {
				console.log(data)
				if(window.confirm('你确定要取消这条收藏吗？')) {
					//						shoucang(dataname,english,userid,yiji,erji,sanji);
				} else {
					return false;
				}

			}
		});
	})