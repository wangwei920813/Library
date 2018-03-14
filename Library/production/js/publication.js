require.config({
	baseUel:"js",
	paths:{
		"jquery":"jquery2.0",
		"page":"jquery.page"
		"laydate": "laydate/laydate"
	},
	shim:{
		"page":{
    		deps:["jquery"]
    	},
		'laydate': {
	      exports: 'laydate'
	    }
	}
})
define(['jquery','page','laydate'],function(){
	require(["jquery",'page','laydate'],function($,page,laydate){
		
	})
})
