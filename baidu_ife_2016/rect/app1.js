/**
 * Created by harveyhepburn on 16/3/21.
 */
var table=document.getElementById("Table").childNodes.item(1);
var input=document.getElementById("input");
var direction=["Top","Right","Bottom","Left"];

var BlockNow={
    Block:GetBlock(6,5), //getblock返回一个DOM对象 那个格子td
    Dir:3,
    X:6,
    Y:5,
}
SetDirection(BlockNow.Block,"Left")
SetDiv(BlockNow.Block);

//抽象出一个Block对象表示一个格子

function CleanDiv(Block){
    Block.innerHTML=""
}
function SetDiv(Block){
    Block.innerHTML="<div></div>"
}
function GetBlock(x,y){
    return table.childNodes.item(y*2).childNodes.item(x*2+1);
}
function SetDirection(Block,D){
    Block.className=D;
}
function CalDirection(x){
    var d=(BlockNow.Dir+x>=0?BlockNow.Dir+x:3)%4;
    BlockNow.Dir=d;
    SetDirection(BlockNow.Block,direction[d]);
}
function Setter(Block){
    SetDiv(Block);　　                            //新DOM设定div （蓝色色块）
    SetDirection(Block,direction[BlockNow.Dir]); //新DOM设定方向为原来的方向
    SetDirection(BlockNow.Block,"");             //原DOM方向设为空
    CleanDiv(BlockNow.Block);                    //原DOM清除div  （蓝色色块）
    BlockNow.Block=Block;                           //现在的DOM更新为新DOM （有方向 和 div）
}
function Go(){
    switch(BlockNow.Block.className){
        case "Left":
            if(BlockNow.X>1){
                BlockNow.X--;
                var Block=GetBlock(BlockNow.X,BlockNow.Y);
                Setter(Block);
            }
            break;
        case "Top":
            if(BlockNow.Y>1){
                BlockNow.Y--;
                var Block=GetBlock(BlockNow.X,BlockNow.Y);
                Setter(Block);
            }
            break;
        case "Right":
            if(BlockNow.X<10){
                BlockNow.X++;
                var Block=GetBlock(BlockNow.X,BlockNow.Y);
                Setter(Block);
            }
            break;
        case "Bottom":
            if(BlockNow.Y<10){
                BlockNow.Y++;
                var Block=GetBlock(BlockNow.X,BlockNow.Y);
                Setter(Block);
            }
            break;
    }
}

function Run(){
    switch (input.value.trim()){
        case "GO":
            Go();
            break;
        case "TUN LEF":
            CalDirection(-1);
            break;
        case "TUN RIG":
            CalDirection(1);
            break;
        case "TUN BAC":
            CalDirection(2);
            break;
    }
}


// 整体思路为：
// 1.通过childnodes.item()方法和表格体系来根据坐标获得DOM
// 2.蓝色色块通过dom中添加div来实现 动态给div命class名来实现方向变化 css已经设定好每个类名的样式

// 3.数据结构上 用BlockNow来表示需要显示的色块 包含位置 DOM 方向等信息
// 4.具体到操作 即转向为方向的改变 Go为坐标的改变，方向的复制