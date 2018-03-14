/*我的收藏*/
//我的收藏分页
var pagenum = 1;
var totalpage = '';
var user = 317;
var type = 0;
mycollection(1,0);
page();
function page() {
    $(".tcdPageCode").createPage({
        pageCount: totalpage,
        current: 1,
        backFn: function(p) {
            pagenum = p;
            // console.log(pagenum)
            mycollection(pagenum,type)
        }
    });
}
function mycollection(pagenum,type) {
    $.ajax({
        url:getURL()+"webservice/service/find/myCollect",
        type:"post",
        async:false,
        dataType:"json",
        data:"{'userId':'"+user+"','page':'"+pagenum+"','num':'10','type':'"+type+"'}",
        success:function (data) {
            console.log(data)
            var html = '';
            totalpage = Math.ceil(data.data.total/10);
            if (totalpage<2){
                $('.tcdPageCode').css('display','none')
            }
            for (var i = 0; i<data.data.list.length; i++){
                if (data.data.list[i].TYPE==1){
                    html += '<li>'+
                        '<div class="bookimg">'+
                        '<img src="'+data.data.list[i].QK_IMG+'">'+
                        '</div>'+
                        '<div class="bookint">'+
                        '<h3>【'+data.data.list[i].TYPENAME+'】'+data.data.list[i].QK_TITLE+'</h3>'+
                        '<p>作者：<span>'+data.data.list[i].QK_AUTHOR+'</span></p>'+
                        '<p>出处：<span>'+data.data.list[i].QK_INSTITUTIONS+'</span></p>'+
                        '<p>所属类型:<span>'+data.data.list[i].QK_SUBJECT+'</span></p>'+
                        '</div>'+
                        '<p class="del">删除<input type="hidden" value="'+data.data.list[i].COLLECTID+'"></p>'+
                        '</li>';
                }else if(data.data.list[i].TYPE==4){
                    html += '<li>'+
                        '<div class="bookimg">'+
                        '<img src="'+data.data.list[i].TS_IMG+'">'+
                        '</div>'+
                        '<div class="bookint">'+
                        '<h3>【'+data.data.list[i].TYPENAME+'】'+data.data.list[i].TS_TITLE+'</h3>'+
                        '<p>作者：<span>'+data.data.list[i].TS_AUTHOR+'</span></p>'+
                        '<p>ISBN：<span>'+data.data.list[i].TS_ISBN+'</span></p>'+
                        '<p>出版社:<span>'+data.data.list[i].TS_PUBLICATIONPRESS+'</span></p>'+
                        '</div>'+
                        '<p class="del">删除<input type="hidden" value="'+data.data.list[i].COLLECTID+'"></p>'+
                        '</li>';
                }else if(data.data.list[i].TYPE==52){
                    html += '<li>'+
                        '<div class="bookimg">'+
                        '<img src="img/news.png">'+
                        '</div>'+
                        '<div class="bookint">'+
                        '<h3>【'+data.data.list[i].TYPENAME+'】'+data.data.list[i].BZ_TITLE+'</h3>'+
                        '<p>作者：<span>'+data.data.list[i].BZ_AUTHOR+'</span></p>'+
                        '<p>日期：<span>'+data.data.list[i].BZ_DATE+'</span></p>'+
                        '<p>来源:<span>'+data.data.list[i].BZ_SOURCE+'</span></p>'+
                        '</div>'+
                        '<p class="del">删除<input type="hidden" value="'+data.data.list[i].COLLECTID+'"></p>'+
                        '</li>';
                }else if(data.data.list[i].TYPE==53){
                    html += '<li>'+
                        '<div class="bookimg">'+
                        '<img src="img/news.png">'+
                        '</div>'+
                        '<div class="bookint">'+
                        '<h3>【'+data.data.list[i].TYPENAME+'】'+data.data.list[i].XW_TITLE+'</h3>'+
                        '<p>作者：<span>'+data.data.list[i].XW_AUTHOR+'</span></p>'+
                        '<p>导师：<span>'+data.data.list[i].XW_TEXCHER+'</span></p>'+
                        '<p>授予单位:<span>'+data.data.list[i].XW_UNIT+'</span></p>'+
                        '</div>'+
                        '<p class="del">删除<input type="hidden" value="'+data.data.list[i].COLLECTID+'"></p>'+
                        '</li>';
                }else if(data.data.list[i].TYPE==54){
                    html += '<li>'+
                        '<div class="bookimg">'+
                        '<img src="img/news.png">'+
                        '</div>'+
                        '<div class="bookint">'+
                        '<h3>【'+data.data.list[i].TYPENAME+'】'+data.data.list[i].HY_TITLE+'</h3>'+
                        '<p>作者：<span>'+data.data.list[i].HY_AUTHOR+'</span></p>'+
                        '<p>关键词：<span>'+data.data.list[i].HY_KEYWORD+'</span></p>'+
                        '<p>会议名称:<span>'+data.data.list[i].HY_MEETINGNAME+'</span></p>'+
                        '</div>'+
                        '<p class="del">删除<input type="hidden" value="'+data.data.list[i].COLLECTID+'"></p>'+
                        '</li>';
                }else if(data.data.list[i].TYPE==57){
                    html += '<li>'+
                        '<div class="bookimg">'+
                        '<img src="img/news.png">'+
                        '</div>'+
                        '<div class="bookint">'+
                        '<h3>【'+data.data.list[i].TYPENAME+'】'+data.data.list[i].YS_TITLE+'</h3>'+
                        '<p>作者：<span>'+data.data.list[i].YS_AUTHOR+'</span></p>'+
                        '<p>关键词：<span>'+data.data.list[i].YS_KEYWORD+'</span></p>'+
                        '<p>简介:<span>'+data.data.list[i].YS_DETAIL+'</span></p>'+
                        '</div>'+
                        '<p class="del">删除<input type="hidden" value="'+data.data.list[i].COLLECTID+'"></p>'+
                        '</li>';
                }
            }
            if(type==0){
                $('.collection>ul').html(html)
            }else{
                $('.share>ul').html(html)
            }

        }
    })
}
//收藏删除
$(document).on('click','.del',function(){
    var collectionid = $(this).find('input').val()+"、";
    var userid = 317;
    console.log(collectionid);
    $.ajax({
        url:getURL()+"webservice/service/find/deleteMyCollect?ids="+collectionid,
        type:'get',
        async:true,
        dateType:'json',
        success:function(data){
            console.log(data)
            pagenum = 1;
            mycollection(pagenum,type)
        }
    })
})
/*我的收藏结束*/
/*************新建个性化检索************/
	$('.newj').on('click', function() {
        optionnum = 3;
        $('.btns').html('<div id="returnbtn">保存检索条件</div> <div id="searchbtn">检索</div>')
		$('#myModal').modal('show');
	})
    //个性化检索关闭
    $('#fanhui').on('click',function(){
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
    //保存
//{'user':'317','resourcetype':'1',detail:[{'andOr':'','searchName':'100','accurate':'0','name':'QK_ISSN'},{'andOr':'or','searchName':'文','accurate':'0','name':'QK_TITLE'},{'andOr':'and','searchName':'','accurate':'0','name':'ALL'}],'database':'46,','language':'87','member':'1','startyear':'1984','endyear':'2049','num':'15'}:
    user = 317;
    $(document).on('click','#returnbtn',function(){
        record();
        $.ajax({
            url:getURL()+"webservice/service/find/addRetrieve",
            // url:"http://192.168.0.147:8080/webservice/service/find/addRetrieve",
            type:"post",
            async:true,
            dataType:"json",
            data:"{'user':'"+user+"','retrievename':'"+retrievename+"','resourcetype':'"+resourcetype+"',detail:["+detail+"],'database':'"+database+"','language':'"+language+"','member':'"+member+"','startyear':'"+startyear+"','endyear':'"+endyear+"','num':'"+num+"','onlyshow':'"+onlyshow+"','type':'1'}",
            success:function(data){
                // console.log(data)
                $('#myModal').modal('hide');
//              $('.tcdPageCode3').remove();
                retrieval()
                page3();
                $('#chec').removeAttr('checked');
                allimg2 = false;
            }
        })
    })
    /*************新建个性化检索******结束************/

    /*********个性化检索列表********/
    var pagenum3 = 1;
    var totalpage3 = '';
    // retrieval();
    function retrieval(){
        $.ajax({
            url:getURL()+"webservice/service/find/myRetrieve",
            // url:"http://192.168.0.147:8080/webservice/service/find/myRetrieve",
            type:"post",
            async:false,
            dataType:"json",
            data:'{"user":"'+user+'","page":"'+pagenum3+'","num":"10","type":"1"}',
            success:function(data){
                // console.log(data)
                //个性化检索分页
                totalpage3 = Math.ceil(data.data.total/10);
//              $('.new').append('<div class="tcdPageCode3"></div>');
                var html = '';
                for (var i = 0; i < data.data.list.length; i++){
                    //配置名称最多显示15字符
                    var retrievename = ''
                    if (data.data.list[i].retrievename.length>15){
                        retrievename = data.data.list[i].retrievename.substr(0,15)+'...';
                    }else{
                        retrievename = data.data.list[i].retrievename;
                    }
                    //检索条件最多显示46字符
                    var typename = ''
                    if (data.data.list[i].typeName.length>47){
                        typename = data.data.list[i].typeName.substr(0,46)+'...';
                    }else{
                        typename = data.data.list[i].typeName;
                    }

                     html += '<li>'+
                        '<p class="no_1"><span><input type="checkbox" value="'+data.data.list[i].id+'" class="che" name="che" onclick="choice4()"></span></p>'+
                        '<p class="no_2"><span>'+retrievename+'</span></p>'+
                        '<p class="no_3"><span>'+data.data.list[i].createtime+'</span></p>'+
                        '<p class="no_4"><span>'+typename+'</span></p>'+
                        '<p class="no_5"><a class="bianji2">编辑</a><a class="del2">删除</a><a class="sousuo2">搜索</a></p>'+
                        '</li>';
                }
                $('.new-con').html(html);
                // choice3();
                // choice4();
                $('input[name=che]').prop('onclick','false');
            }
        })
    }
    function page3() {
        $(".tcdPageCode3").createPage({
            pageCount: totalpage3,
            current: 1,
            backFn: function(p) {
                pagenum3 = p;
                retrieval();
                $('#chec').removeAttr('checked');
                allimg2 = false;
            }
        });
    }
//我的个性化检索删除功能
    function del(all){
        var All = all;
        $.ajax({
            type:"get",
            url:getURL()+"webservice/service/find/deleteRetrieve?id="+All,
            async:true,
            dataType:"json",
            success:function(data){
                adel();
//              $('.tcdPageCode3').remove();
                retrieval();
                page3()
            },
            error:function(err){
                // alert("删除失败");
                return false;
            }
        });
    }
    //批量删除
    $(".dels2").on('click', function() {
        var all = [];
        $('.new-con input[name=che]').each(function() {
            if(this.checked == true) {
                all.push($(this).val())
            }
        });
        del(all);
    });
    // 检索历史单点删除
    function adel(){
        $('.new-con input[name=che]').each(function() {
            if(this.checked == true) {
                $(this).parent().parent().parent().remove();
            }
        })
    }
    /*********个性化检索列表******结束********/
    //单点删除
    $(document).on('click',".del2", function() {
        var a = $(this).parent().parent().find("input[name=che]").val();
        del(a);
        $(this).parent().parent().find("input[name=che]").prop('checked','true');
    });
    /*********个性化检索列表编辑*********/
    $(document).on('click','.bianji2',function (){
        //检索条数id
        retrievalid= $(this).parent().parent().find("input[name=che]").val();

        $('.btns').html('<div id="modify">保存检索条件</div> <div id="searchbtn">检索</div>')
        var listid = $(this).parent().parent().find("input[name=che]").val();
        $.ajax({
            url:getURL()+"webservice/service/find/retrieveDetail?id="+listid,
            type:"get",
            async:true,
            dataType:"json",
            success:function(data){
                // console.log(data)
                //文献名称
                $("#name").val(data.data.retrieve.retrievename);
                //文献类型id
                $('.top-ri input[value="'+data.data.retrieve.resourcetype+'"]').prop('checked', 'true');
                //与或数组
                optionnum = data.data.retrieveDetail.length;
                var datail = '';
                if(data.data.retrieveDetail.length>3){
                    for (var i = 0; i < data.data.retrieveDetail.length-3; i++){
                        datail += '<li>'+
                            '<select name="" class="sel1">'+
                            '<option value="0">与</option>'+
                            '<option value="1">或</option>'+
                            '</select> '+
                            '<select name="" class="sel2">'+
                            '<option value="">全部字段</option>'+
                            '</select> '+
                            '<input type="text" name="" value="" class="txt" /> '+
                            '<select name="" class="sel3">'+
                            '<option value="0">全部</option>'+
                            '<option value="1">精确</option>'+
                            '</select>'+
                            '</li>';
                    }
                    $('.botul').append(datail);
                    erji(data.data.retrieve.resourcetype);
                }else{
                    $('.botul>li').eq(2).nextAll().remove();
                    erji(data.data.retrieve.resourcetype);
                }
                setTimeout(function(){
                    for (var i = 0; i < data.data.retrieveDetail.length; i++){
                        // $('.botul>li').eq(i).find('.sel2').val(data.data.retrieveDetail[i].documentid);
                        $('.botul>li').eq(i).find('.sel2').val(data.data.retrieveDetail[i].propertyName);
                        $('.botul>li').eq(i).find('.txt').val(data.data.retrieveDetail[i].searchname);
                        $('.botul>li').eq(i).find('.sel3').val(data.data.retrieveDetail[i].accurate);
                        $('.botul>li').eq(i).find('.sel1').val(data.data.retrieveDetail[i].andor)
                    }
                },200)
                //数据库
                var dataarr = data.data.retrieve.databases.split(',');
                for (var i = 0; i < $('input[name=data]').length; i++){
                    for (var j = 0; j < dataarr.length; j++){
                        if($('input[name=data]').eq(i).val() == dataarr[j]){
                            $('input[name=data]').eq(i).prop('checked','true');
                        }
                    }
                }
                //语言
                $("#language").val(data.data.retrieve.language);
                //成员馆
                $("#member").val(data.data.retrieve.members);
                //开始年份
                $("#startmember").val(data.data.retrieve.startyear);
                //结束年份
                // $("#endmember").val(data.data.retrieve.endyear);
                var endYear=new Date().getFullYear()+50;//结束年份
                var endyear = '<option value="0">结束的年份</option>';
                for (var j=data.data.retrieve.startyear; j<=endYear; j++){
                    if(j==0){
                        return false;
                    }
                    endyear += '<option value="'+j+'">'+j+'</option>'
                }
                $('#endmember').html(endyear).val(data.data.retrieve.endyear);//定位到当年
                //每页显示数
                $('.datanumber .tiaoshu').prop('checked', 'false');
                $('.datanumber input[value="'+data.data.retrieve.num+'"]').prop('checked', 'true');
                //只显示
                $('.display .xianshi').prop('checked', 'false');
                $('.display input[value="'+data.data.retrieve.onlyshow+'"]').prop('checked', 'true');
            }
        })
        $('#myModal').modal('show');
    })
    //提交
    $(document).on('click','#modify',function(){
        record();
        $.ajax({
            url:getURL()+"webservice/service/find/updateRetrieve",
            type:"post",
            async:true,
            dataType:"json",
            data:"{'id':'"+retrievalid+"','user':'"+user+"','retrievename':'"+retrievename+"','resourcetype':'"+resourcetype+"',detail:["+detail+"],'database':'"+database+"','language':'"+language+"','member':'"+member+"','startyear':'"+startyear+"','endyear':'"+endyear+"','num':'"+num+"','onlyshow':'"+onlyshow+"'}",
            success:function (data) {
                // console.log(data)
                $('#myModal').modal('hide');
//              $('.tcdPageCode3').remove();
                retrieval();
                $('#chec').removeAttr('checked');
                allimg2 = false;
            }
        })

    })
    /*********个性化检索列表编辑****结束*********/
    /*个性化检索列表搜索*/
    $(document).on('click','.sousuo2',function(){
        var sousuo2id = $(this).parent().parent().find("input[name=che]").val();
        $.ajax({
            url:getURL()+"webservice/service/find/retrieveDetail?id="+sousuo2id,
            type:'get',
            async:true,
            dataType:'json',
            success:function (data) {
                console.log(data)
                // "{'user':'"+user+"','resourcetype':'"+resourcetype+"',detail:["+detail+"],'database':'"+database+"','language':'"+language+"','member':'"+member+"','startyear':'"+startyear+"','endyear':'"+endyear+"','num':'"+num+"'}"
                var data1 = data.data.retrieve;
                var data2 = data.data.retrieveDetail;
                var detailnew = [];
                for(var i = 0; i < data2.length; i++){
                    if(i==0){
                        // detail:[{'andOr':'','searchName':'100','accurate':'0','name':'QK_ISSN'},{'andOr':'and','searchName':'','accurate':'0','name':'ALL'},{'andOr':'and','searchName':'','accurate':'0','name':'ALL'}]
                        detailnew.push("{'andOr':'','searchName':'"+data2[i].searchname+"','accurate':'"+data2[i].accurate+"','name':'"+data2[i].propertyName+"'}")
                    }else{
                        detailnew.push("{'andOr':'"+data2[i].andor+"','searchName':'"+data2[i].searchname+"','accurate':'"+data2[i].accurate+"','name':'"+data2[i].propertyName+"'}")
                    }
                }
                var searchdata = data1.users+"&"+data1.resourcetype+"&"+detailnew+"&"+data1.databases+"&"+data1.language+"&"+data1.members+"&"+data1.startyear+"&"+data1.endyear+"&"+data1.num+"&"+1+"&"+"true";
                window.location.href = 'result.html?'+searchdata;
            }
        })
    })
    /*个性化检索列表搜索结束*/

	//用户中心左侧click事件
	Collection();
	function Collection() {
		$('.left>div:nth-child(2)').on('click', function() {
			$('.ueer>span:nth-child(2)').html('我的收藏');
			$('.me').css('display', 'none');
			$('.collection').css('display', 'block');
			type=0;
			pagenum=1;
            $('.tcdPageCode').remove();
            $('.collection').append('<div class="tcdPageCode"></div>');
            mycollection(pagenum,type)
            page();
		})
		$('.left>div:nth-child(3)').on('click', function() {
			$('.ueer>span:nth-child(2)').html('检索历史');
			$('.me').css('display', 'none');
			$('.history').css('display', 'block');
            pagenum2 = 1;
//          $('.tcdPageCode2').remove();
            $('.tcdPageCode2').remove();
            $('.history').append('<div class="tcdPageCode2"></div>');
            history();
            page2();
            $('#all').removeAttr('checked');
            allimg = false;
		})
		$('.left>div:nth-child(4)').on('click', function() {
            pagenum3 = 1;
			$('.ueer>span:nth-child(2)').html('个性化检索');
			$('.me').css('display', 'none');
			$('.new').css('display', 'block');
//          $('.tcdPageCode3').remove();
            $('.tcdPageCode3').remove();
            $('.new').append('<div class="tcdPageCode3"></div>');
            retrieval();
            page3();
            $('#chec').removeAttr('checked');
            allimg2 = false;
		})
		$('.left>div:nth-child(5)').on('click', function() {
			$('.ueer>span:nth-child(2)').html('定题');
			$('.me').css('display', 'none');
		})
		$('.left>div:nth-child(6)').on('click', function() {
			$('.ueer>span:nth-child(2)').html('预借清单');
			$('.me').css('display', 'none');
			$('.borrow').css('display', 'block');
		})
        $('.left>div:nth-child(7)').on('click', function() {
            $('.ueer>span:nth-child(2)').html('我的分享');
            $('.me').css('display', 'none');
            $('.share').css('display', 'block');
            type=1;
            mycollection(pagenum,type);
        })
	}