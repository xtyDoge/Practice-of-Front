
	var SPACESHIP_SPEED = 2; //飞船飞行速度
    var SPACESHIP_SIZE = 40; //飞船大小
    var SPACESHIP_COUNT = 4; //飞船数量
    var DEFAULT_CHARGE_RATE = 0.3; //飞船充电速度
    var DEFAULT_DISCHARGE_RATE = 0.2; //飞船放电速度

    var POWERBAR_POS_OFFSET = 5; //电量条位置位移
    var POWERBAR_COLOR_GOOD = "#70ed3f"; //电量良好状态颜色
    var POWERBAR_COLOR_MEDIUM = "#fccd1f"; //电量一般状态颜色
    var POWERBAR_COLOR_BAD = "#fb0000"; //电量差状态颜色
    var POWERBAR_WIDTH = 5; //电量条宽度

    var SCREEN_WIDTH = 800; //屏幕宽度
    var SCREEN_HEIGHT = 800; //屏幕高度
    var SCREEN_CENTER_X = SCREEN_WIDTH / 2; //屏幕X轴中心坐标
    var SCREEN_CENTER_Y = SCREEN_HEIGHT / 2; //屏幕Y轴中心坐标

    var PLANET_RADIUS = 50; //行星半径
    var ORBIT_COUNT = 4; //轨道数量
    var FAILURE_RATE = 0.3; //消息发送失败率

    var ETHER = [];//以太，Mediator储存匣

    var shuttle = [];

    var monitor = function(character){
    	var screen = document.getElementById("screen");
    	screen.innerText = character;
    };
//--------------===================--------------===================--------------==================------------


    //飞船初始化
    //飞船有 能量 id 飞行状态 位置 等方法 构造函数初始化 通过方法修改
	var Spaceship = function(id){  
		this.id = id;
		this.power = 100;
		this.status = "destroy";
		this.position = 0;
		this.timer = null;
		this.orbit = this.id * 20 + 30; //所在轨道半径
		this.lastMediator = null;
		this.listenerTimer = null;
	};

		//下面为Spaceship类添加的方法 多层设计方式

	//每隔一定时间检测以太中是否有新信息注入
	//乱按也会增加到无用信息到ETHER 就不是这个逻辑了
	Spaceship.prototype.mediatorManager = function(){
		var self = this;			
		if (ETHER.length != 0) {
			self.listenerTimer = setInterval(function(){
				if (ETHER[ETHER.length - 1] != self.lastMediator && ETHER[ETHER.length - 1].id == self.id) {
				self.lastMediator = ETHER.pop();
				
				//调整姿态
				if (self.lastMediator.content == "start") {
					self.status = "start";
					self.dynamicManager.fly();
					monitor("飞船1已启动");

				}
				if (self.lastMediator.content == "stop") {
					self.status = "stop";
					self.dynamicManager.stop();
					monitor("飞船1已停车");
				}
				alert("扫描！");
			  }
			},100);	
		}		
	};
	

	//充电装置 对power属性进行操作
	Spaceship.prototype.powerManager = function(){
		var self = this;
		var charge = function(){ //充电 电量增加 
			if (self.power < 100) {
				self.power += DEFAULT_CHARGE_RATE;
				if (self.power > 100) {
					self.power = 100;
				}
			}
			Render.animate(self.power);
		}; 
		var disCharge = function(){//放电 电量减少 什么时候该放电 在此确定
			if (self.power > 0) {
				self.power -= DEFAULT_DISCHARGE_RATE;
				if (self.power < 0) {
					self.power = 0;
				}
			}
			Render.animate(self.power);
		};
	};    
	
	Spaceship.prototype.dynamicManager = function(){
		var self = this;
		var fly = function(){         //设置飞行状态 需要更改status 并 执行飞行动作
			self.timer = setInterval(function(){
				self.position += SPACESHIP_SPEED;
				if (self.position >= 360) {self.position = 0;}
				self.powerManager.discharge();
			}, 20);
		};

		var stop = function(){
			self.timer = setInterval(function(){
				self.powerManager.charge();
			},20);
			self.status = "stop";
			

		};

		var destroy = function(){
			self.status = "destroy";
			self.power = 0;
		};
	};

//--------------===================--------------===================--------------==================------------


	//Mediator需要告诉 id 和 状态变更命令
	var Mediator = function(to,content){  
		this.to = to;
		this.content = content;
	};



//--------------===================--------------===================--------------==================------------


	var Commander = function(id) {
		this.id = "CommanderLocal";
		this.numberOfMediators = 0;
		monitor("指挥官 "+id+" 上线");
	};

	Commander.prototype.launch = function(){
		var self = this;
		if (Math.random()>=FAILURE_RATE) {
			if (shuttle.length == 0) {
				shuttle.push(new Spaceship(0));
				shuttle[0].mediatorManager();
				monitor("飞船1已发射");
			}
			else {
				monitor("该轨道已有飞船");
			}
		}
		else {
			monitor("发射 发送失败");
		}
	};

	Commander.prototype.destroy = function(){
		var self = this;
		if (Math.random()>=FAILURE_RATE) {
			if (shuttle.length != 0) {
				shuttle.pop();
				monitor("飞船1已自毁");
			}
			else {
					monitor("该轨道没有飞船");		
						}			
		}
		else {
			monitor("自毁 发送失败");
		}
	};

	Commander.prototype.start = function(){
		var self = this;
		if (Math.random()>=FAILURE_RATE) {
			if (shuttle.length != 0) {
				ETHER.push(new Mediator(1,"start"));
			}
			else {
				monitor("轨道上没有飞船");
			}
		}
		else {
			monitor("运行 发送失败");
		}
	};

	Commander.prototype.stop = function(){
		var self = this;
		if (Math.random()>=FAILURE_RATE) {
			if (shuttle.length != 0) {
				ETHER.push(new Mediator(1,"stop"));
			}
			else {
				monitor("轨道上没有飞船");
			}
		}
		else {
			monitor("停车 发送失败");
		}
	};


	var Render = function(){
		var animate = function(power){
			var chargeDiv = document.getElementById("charge");
			charge.style.width = power;
			if (power <= 20) {
				charge.style.background = "red";
			} 
		};

		var dash = function(){

		};
	};



	var launchbtn = document.getElementById("launch");
	var stopbtn   = document.getElementById("stop");
	var destroybtn = document.getElementById("destroy");
	var startbtn = document.getElementById("start");
	
	function init(){

		var Hibana = new Commander("Hibana");

		launchbtn.addEventListener("click",Hibana.launch);
		destroybtn.addEventListener("click",Hibana.destroy);
		startbtn.addEventListener("click",Hibana.start);
		stopbtn.addEventListener("click",Hibana.stop);
	}

	init();



