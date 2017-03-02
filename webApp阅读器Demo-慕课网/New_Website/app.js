var koa = require('koa');
var controller = require('koa-route'); 
var app = koa();

app.use(controller.get('/router_test'),function*(){
	this.set("Cache-Control","no-cache");
	this.body = "hello,koa!";

})

app.listen(3001);
console.log("koa server is started!");