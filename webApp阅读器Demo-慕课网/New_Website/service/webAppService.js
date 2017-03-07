var fs = require('fs');

exports.get_test_data = function() {
	var content = fs.readFileSync('./mock/test.json','utf-8');
	return content;
}
//搜索方法
exports.get_search_data = function (start,end,keyword){
	return function(cb){
		var http = require('http');
		var qs = require('querystring');
		//调用的线上接口
		var data = {
			s:keyword,
			start:start,
			end:end
		};
		//发送端口路径
		var content = qs.stringify(data);

		var http_request = {
			hostname : 'dushu.xiaomi.com',
			port : 80,
			path : '/store/v0/lib/query/onebox?' + content
		}

		//发出http请求
		req_obj = http.request(http_request,function(_res){
			var content = '';
			//返回的数据格式
			_res.setEncoding('utf-8');
			_res.on('data',function(chunk){
				content += chunk;
			});
			_res.on('end',function(){
				cb(null,content);
			});
		});
		//若响应出错？
		req_obj.on('error',function(){
			
		});
		//发送请求 即进入回调函数执行
		req_obj.end();
	};
};

exports.get_index_data = function() {
	var content = fs.readFileSync('./mock/test.json','utf-8');
	return content;
}

//从服务器请求一个json（固定名称）
exports.get_rank_data = function(){
	var content = fs.readFileSync('./mock/rank.json','utf-8');
	return content;
}

exports.get_channel_male_data = function(){
	var content = fs.readFileSync('./mock/channel/male.json','utf-8');
	return content;
}

exports.get_channel_female_data = function(){
	var content = fs.readFileSync('./mock/channel/female.json','utf-8');
	return content;
}

exports.get_category_data = function(){
	var content = fs.readFileSync('./mock/category.json','utf-8');
	return content;
}


//从服务器请求一个json （动态名称）
exports.get_book_data = function(id) {
	if (!id) {
		id = 18218;
	}
	var content = fs.readFileSync('./mock/book/' + id + '.json');
	return content;
}