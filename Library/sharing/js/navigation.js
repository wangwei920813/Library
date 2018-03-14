/*首页数字资源展示 三级分类*/
	$.ajax({
		type:'get',
		url:getURL()+"webservice/service/shared/column",
		async:true,
		dataType:"json",
		success:function(data){
			console.log(data)
			var html1 = '<li id="c-topcolor">全部数据库<input type="hidden" value="no" /></li>';
			var html2 = '';
			var html3 = '';
            var content = ''
			for(var i = 0; i < data.data.yiji.length; i++){
				html1 += '<li>'+data.data.yiji[i].NAME+'<input type="hidden" value="'+data.data.yiji[i].ID+'" /></li>'
			}
			$('.c-top').html(html1);
			for(var i = 0; i<data.data.erji.length; i++){
				html2 += '<li>'+data.data.erji[i].NAME+'<input type="hidden" value="'+data.data.erji[i].ID+'"></li>'
			}
			$('.mmp').html(html2);
            for(var i = 0; i<Object.keys(data.data.sanji).length; i++){
            // html3 += '<li>'+data.data.sanji[i].NAME+'<input type="hidden" value="'+data.data.sanji[i].ID+'"></li>'
                if(data.data.sanji[i].pop().location.indexOf("2")!='-1'){
                    for(var j = 0; j < data.data.sanji[i].length; j++){
                        html3 += '<li>'+data.data.sanji[i][j].NAME+'<input type="hidden" value="'+data.data.sanji[i][j].ID+'"></li>'
                    }
                    content += '<div>'+
                    '<p data-toggle="collapse" data-parent="#accordion"href="#collapseOne'+i+'">'+data.data.sanji[i][1].DICTNAME +'<b class="caret"></b></p>'+
                        '<ul id="collapseOne'+i+'" class="yesears collapse in">'+
                        html3+
                        '</ul>'+
                        '</div>'
                    html3 = ''
                }
            }
			$('.c-left-left').html(content);
		}
	})
	/*首页数字资源展示 三级分类结束*/
	
	
	//请求参数
	var dataname=english=userid=yiji1=erji2=sanji3='';
	var start = 1;
	var end = 48;
	//判断用户是否登录
	function userlogin(){
		if(localStorage.userid!=undefined){
			userid = localStorage.userid;
			console.log(1)
		}else if(sessionStorage.userid!=undefined){
			userid = sessionStorage.userid;
		}else{
			userid = 300256425;
		}
	}
	resource(dataname,english,userid,yiji1,erji2,sanji3,start,end)
	//一级列表点击
	$(document).on('click',".c-top>li", function() {
		$(".c-top>li").removeAttr('id');
		$('.mmp>li').removeClass('mmplicol');
		$('.yesears>li').removeClass('yesearcol');
		$(this).attr('id', 'c-topcolor');
		yiji1 = $(this).find('input').val();
		userlogin();
		if(yiji1=='no'){
			dataname=english=yiji1=erji2=sanji3=''
			resource(dataname,english,userid,yiji1,erji2,sanji3,start,end);
			$(".mmp>li").removeClass('mmplicol');
			$("#collapseOne>li").removeClass('yesearcol');
		}else{
			erji2=sanji3=''
			resource(dataname,english,userid,yiji1,erji2,sanji3,start,end);
		}
	})
	//二级列表点击
	$(document).on('click',".mmp>li", function() {
		$(".mmp>li").removeClass('mmplicol');
		$(this).addClass('mmplicol');
		erji2 = $(this).find('input').val();
		userlogin();
		resource(dataname,english,userid,yiji1,erji2,sanji3,start,end);
	})
	//三级列表点击
	$(document).on('click',".c-left-left li", function() {
		$(".c-left-left li").removeClass('yesearcol');
		$(this).addClass('yesearcol');
		sanji3 = $(this).find('input').val();
		userlogin();
		resource(dataname,english,userid,yiji1,erji2,sanji3,start,end);
	})
	//内容列表点击
	$(document).on('click',".c-content>li", function(e) {
		e.stopPropagation();
		$(".c-content>li").removeClass('shadow');
		$(this).addClass('shadow');
		var left = $(this).offset().left;
		var top = $(this).offset().top+$(this).height()+10;
		$('#introduce').css({
			"display":"block",
			"left": left,
			"top": top
		})
		/*详情框内容*/
		var index = $(this).index();
		//资源介绍
		if(datacon[index].introduce==''){
			$("#inp").html("");
			$("#inp").html("该资源暂无介绍");
		}else{
			$("#inp").html(datacon[index].introduce);
		}
		//资源链接
		var lianjie = '';
		if(datacon[index].dalink==''){
			lianjie = "<span>无资源链接<input type='hidden' value='no'></span>"
		}else{
			for(var i = 0; i < datacon[index].dalink.length; i++){
				lianjie += "<span>"+datacon[index].dalink[i].NAME+"<input type='hidden' value='"+datacon[index].dalink[i].ID+"'></span>"
			}
		}
		$("#lianjie").html(lianjie);
		
		//资源说明
		var explain = ''
		if(datacon[index].courseware==''){
			explain = '该资源无说明';
		}else{ 
			if(datacon[index].courseware[0].mp4url!=''){
				explain += "<a href='video.html?"+datacon[index].courseware[0].mp4url+"' title='视频' style='background:url(img/shipin_05.png);display: inline-block;width:30px;height:30px;    vertical-align: middle;'></a>";
			}
			if(datacon[index].courseware[0].fileurl!=''){
				explain += "<a href='"+datacon[index].courseware[0].fileurl+"' title='文档' style='background:url(img/shipin_03.png);display: inline-block;width:30px;height:30px;    vertical-align: middle;margin-left:5px;'></a>";
			}
		}
		$('#explain').html(explain)
		
	})
	//详情框点击阻止默认事件
	$(document).on('click',"#introduce", function(e) {
		e.stopPropagation();
	})
	//资源链接点击事件
	$(document).on('click',"#lianjie>span",function(){
		var val = $(this).find("input").val()
		if(val!="no"){
			window.location.href = getURL()+'shared/resjump/redirect?resourcesid='+val;
		}
	})
	//点击隐藏详情框
	$(document).on('click',function(){
		$('#introduce').css({
			"display":"none"
		})
	})
	/*详情框内容结束*/
	
	
	
	/*资源查询模块结束*/
	
	
	
	
	
	/*意见反馈*/
	//用户id
	var userid = 300256425;
	//意见内容
	var opinion = '';
	//用户名称
	var backname = '周润发';
	//意见反馈提交
	$('.four').on('click', function() {
		$('.content-c, .erci').css('display', 'none');
		$('.feedback').css('display', 'block');
	})
	$('.fee-btn').on('click', function() {
		opinion = $("#font").val();
		$.ajax({
			type:'post',
			url:getURL()+"webservice/service/shared/feedback",
			async:true,
			dataType:"json",
			// data:"{'userid':'300256425','content':'"+opinion+"','backname':'"+backname+"'}",
			data:"{'userid':'"+userid+"','content':'"+opinion+"','backname':'"+backname+"'}",
			success:function(data){
				console.log(data)
				$('#submission').modal('show');
				$('.sub-btn').on('click', function() {
					$('#submission').modal("hide");
				})
			}
		})
				
	})
	
	/*意见反馈结束*/
	
	/*更多资讯*/
	$('.two>h3>span').on("click",function(){
		window.location.href = "consultation.html?data=0"
	})
	
	/*更多资讯结束*/
	
	
	
	//搜索
	$('#btn').on('click', function() {
		if($('#text').val() == '') {
			window.location.href = 'search.html';
		} else {
			window.location.href = 'search.html?con='+$('#text').val();
		}
	})

	//常见问题
	$('.one img').on('click',function(){
		window.location.href = 'consultation.html?data=1'
	})
	//荐购
	$('.jiangou, .three').on("click", function() {
		window.location.href = 'recommendation.html'
	})

	$('.albo>p:nth-child(2)').on('click',function(){
		window.location.href = 'search.html?con='
	})