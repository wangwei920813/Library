//导航首页点击
	$(".slider>li").on('click', function() {
		$(".slider>li").removeClass('sliders');
		$(this).addClass('sliders');
		//.search, .content-c, .result1, .result2, .information, .train, .favorites, .reference, .tool, .recommendation, .feedback, .erci
		if($(this).index() == '0') {
//			window.location.href = 'homepage.html';
			window.location.href = 'index.html';
		} else if($(this).index() == '1') {
			window.location.href = 'navigation.html';
		} else if($(this).index() == '2') {
			window.location.href = 'consultation.html?data=0';
		} else if($(this).index() == '3') {
			window.location.href = 'courseware.html';
		} else if($(this).index() == '4') {
			window.location.href = 'favorite.html';
		} else if($(this).index() == '5') {
			window.location.href = 'reference.html';
		} else if($(this).index() == '6') {
			window.location.href = 'toold.html';
		}

	})
	//右侧图片
	$.ajax({
		type:'get',
		url:getURL()+"webservice/service/shared/getPhoto",
		async:true,
		dataType:"json",
		success:function(data){
//			console.log(data)
			var html = '';
			for(var i = 0; i < data.data.length; i++){
				html += '<li style="position: relative;"><a href='+data.data[i].url+' style="position: absolute;top:0;"><img style="position: absolute;top: 0;" src="'+data.data[i].filename+'" alt="'+data.data[i].name+'"></a></li>'
			}
			$('.information-right').html(html);
			$('.train-right').html(html);
			$('.tool-right').html(html);
			$('.fee-right').html(html);
			$('.rec-right').html(html);
		}
	})
	$('#datasousuo').on('click',function(){
		if($('#text').val() == '') {
			window.location.href = 'search.html';
		} else {
			window.location.href = 'search.html?con='+$('#dataname').val();
		}
	})
	//导航新增
	$.ajax({
		type:"get",
		url:getURL()+"webservice/service/shared/getNavigation",
		async:true,
		dataType:'json',
		success:function(data){
//			console.log(data)
			var html = '';
			for(var i = 0; i < data.data.length; i++){
				html += "<li class='job' href="+data.data[i].url+">"+data.data[i].name+"</li>";
			}
			$('.slider').append(html)
			$('.job').on('click',function(){
				window.location.href = $(this).attr("href");
			})
		}
	})

//右侧浮动栏
$('#fixed>img:nth-child(5)').on('click',function(){
	$('html,body').animate({scrollTop: 0}, 200);
})
