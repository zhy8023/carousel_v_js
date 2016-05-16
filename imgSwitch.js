var EventUtil = {
    addHandler: function(element,type,handler) {
        if(element.addEventListener) {
            element.addEventListener(type,handler,false);
        } else if (element.attachEvent) {
            element.attachEvent("on"+type,handler);
        } else {
            elment["on"+type] = handler;
        }
    }
};
/*//获取对象
var left=document.getElementById("left-direction");
var right=document.getElementById("right-direction");
var pic=document.getElementById("pic");

//单例
var Slide={
	imgArr:[],
	dots:[],
	i:0,
	preI:0,
	timeoutId:'',
	toPre: function(){    //跳到上一张
		this.getNextIndex(-1);
	    this.doGo(this.i);
	},
	toNext:function(){   //跳到下一张
		this.getNextIndex(1); 
	    this.doGo(this.i);
	},
	createDot:function(){
		var _self=this;
		var dotWrapper=document.createElement('div');
	    dotWrapper.className="dot-wrapper";
	    this.imgArr.forEach(function(item,index,imgArr){
            var dot=document.createElement('span');
	        dot.className="dot";
	        dotWrapper.appendChild(dot);
            _self.dots.push(dot);
	        EventUtil.addHandler(dot,'click',function(){
	   	        _self.doGo(index)});
	    });
	    pic.parentNode.appendChild(dotWrapper);  //创建DOM节点
	},
	doGo:function(index){    //跳转到某一张
		this.i=index;
        pic.setAttribute("src",this.imgArr[this.i]);
	    this.dots[this.preI].className="dot";
	    this.dots[index].className="dot-active";
	    this.preI=this.i;
	    clearTimeout(this.timeoutId);
	    this.autoRun(this.time);
	},
	getNextIndex:function(direction){  //获取下一张图片的索引i
		//幻灯片的张数，索引
        var len=this.imgArr.length-1;
        //direction为1表示跳到下一张，为-1表示跳转到上一张
        if(direction === 1){
            this.i++;
            this.i>len ? this.i=0:this.i;
	    }
	    if(direction === -1){
	        this.i--;
	        this.i<0 ? this.i=len:this.i;
	    }
	},
	autoRun: function(time){  //自动播放
		var _self=this;
        this.timeoutId=setTimeout(function(){
                    _self.getNextIndex(1);
	                _self.doGo(_self.i);
	                _self.autoRun(time);
	            },time);
    },
   init: function(param){
   	        this.time=param.time;
   	        this.imgArr=param.imgArr;
    	    this.createDot();
    	    this.doGo(0);
    	    this.autoRun(param.time||5000);   //初始化
   }
}
Slide.init(
{
	imgArr:["images/pic1.jpg","images/pic2.jpg","images/pic3.jpg","images/pic4.jpg","images/pic5.jpg","images/pic6.jpg"],
    time:1000
});

EventUtil.addHandler(left,"click",function(){
	Slide.toPre();
});
EventUtil.addHandler(right,"click",function(){
	Slide.toNext();
});*/


//多例
function Slide(param){
	this.timeoutId="";
	this.dots=[];
	this.i=0;
    this.preI=0;
	this.init(param);
};

Slide.prototype={
	toPre: function(){     //跳到上一张
		this.getNextIndex(-1);  
	    this.doGo(this.i);
	},
	toNext:function(){     //跳到下一张
		this.getNextIndex(1);
	    this.doGo(this.i);
	},
    createDot:function(){   //创建DOM节点
		var _self=this;
		var dotWrapper=document.createElement('div');
	    dotWrapper.className="dot-wrapper";
	    this.imgArr.forEach(function(item,index,imgArr){
            var dot = document.createElement('span');
	        dot.className="dot";
	        dotWrapper.appendChild(dot);
            _self.dots.push(dot);
	        EventUtil.addHandler(dot,'click',function(){
	   	        _self.doGo(index)});
	    });
	    this.pic.parentNode.appendChild(dotWrapper);
	},
    doGo:function(index){     //跳转到某一张
		this.i=index;   
        this.pic.setAttribute("src",this.imgArr[this.i]);
	    this.dots[this.preI].className="dot";   
	    this.dots[index].className="dot-active";
	    this.preI=this.i;  
	    clearTimeout(this.timeoutId);
	    this.autoRun(this.time);
	},
	getNextIndex:function(direction){   //获取下一张图片的索引i
		//幻灯片的张数，索引
        var len=this.imgArr.length-1;
        //direction为1表示跳到下一张，为-1表示跳转到上一张
        if(direction === 1){
            this.i++;
            this.i>len ? this.i=0:this.i;
	    }
	    if(direction === -1){
	        this.i--;
	        this.i<0 ? this.i=len:this.i;
	    }
	},
	autoRun: function(time){   //自动播放
		clearTimeout(this.timeoutId);
		var _self=this;
        this.timeoutId=setTimeout(function(){
            _self.getNextIndex(1);
            _self.doGo(_self.i);
            _self.autoRun(time);
        },time);
    },
    init: function(param){  //初始化
    	var _self=this;
    	/*this.param = param;*/
   	    this.time = param.time;
   	    this.imgArr = param.imgArr;
   	    this.pic=param.pic;
   	    this.left=param.left;
   	    this.right=param.right;  
    	this.createDot();     
    	this.doGo(0);   //页面一进来显示的图片
    	this.autoRun(param.time || 5000);  //如果有参数，则自动播放时间间隔为参数值，否则为5s

    	EventUtil.addHandler(this.left, "click", function(){
	            _self.toPre();
        });
        EventUtil.addHandler(this.right,"click",function(){
	            _self.toNext();
        });
    }
};

var Slide1=new Slide({
	imgArr:["images/pic1.jpg","images/pic2.jpg","images/pic3.jpg","images/pic4.jpg","images/pic5.jpg","images/pic6.jpg"],
    time:3000,
    left:document.getElementById("left-direction"),
    right:document.getElementById("right-direction"),
    pic:document.getElementById("pic")
});

var Slide2=new Slide({
	imgArr:["images/pic1.jpg","images/pic2.jpg","images/pic3.jpg","images/pic4.jpg","images/pic5.jpg","images/pic6.jpg"],
    time:3000,
    left:document.getElementById("left-direction1"),
    right:document.getElementById("right-direction1"),
    pic:document.getElementById("pic1")
});