var koa = require('koa');
var controller = require('koa-route'); 
var app = koa();
var views = require("co-views");
var render = views('./view',{
	map : {html : 'ejs'}
});
var koa_static = require("koa-static-server");
var service = require('./service/webAppService.js');
var qs = require('querystring');

//静态资源文件目录配置
app.use(koa_static({
	rootDir:"./static/",
	rootPath:"/static/",
	maxage : 0
}));

//特定路由返回
app.use(controller.get('/router_test',function*(){
	this.set("Cache-Control","no-cache");
	this.body = "hello,koa!";
	console.log('router_test has been visited');
}));

//模板渲染
app.use(controller.get('/ejs_test',function*(){
	this.set("Cache-Control","no-cache");
	this.body = yield render('test',{title : "title_test"});
}));

app.use(controller.get('/api_test',function*(){
	this.set("Cache-Control","no-cache");
	this.body = service.get_test_data();
}));

app.use(controller.get('/ajax/search', function*(){
	this.set('Cache-Control', 'no-cache');
	var _this = this;
	var params = qs.parse(this.req._parsedUrl.query);
	var start = params.start;
	var end = params.end;
	var keyword = params.keyword;
	this.body = yield service.get_search_data(start,end,keyword);
}));

//请求获得首页的json
app.use(controller.get('/ajax/index', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_index_data();
}));

//男频 女频 分类 书籍 rank
//男频
app.use(controller.get('/ajax/channel/male', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_channel_male_data();
}));

app.use(controller.get('/ajax/channel/female', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_channel_female_data();
}));

app.use(controller.get('/ajax/category', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_category_data();
}));

app.use(controller.get('/ajax/rank', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_rank_data();
}));

//从本地获得书籍
app.use(controller.get('/ajax/book', function*(){
	this.set('Cache-Control', 'no-cache');
	var params = qs.parse(this.req._parsedUrl.query);
	var id = params.id;
	if(!id){
		id = '';
	}
	this.body = service.get_index_data(id);
}));




app.use(controller.get('/', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('index',{titile:'书城首页'});
}));

app.use(controller.get('/search', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('search',{titile:'书城首页'});
}));

app.use(controller.get('/book', function*(){
	this.set('Cache-Control', 'no-cache');
	var params = qs.parse(this.req._parsedUrl.query);
	var bookId = params.id;
	this.body = yield render('book',{bookId:bookId});
}));



app.listen(3001);
console.log("koa server is started!");