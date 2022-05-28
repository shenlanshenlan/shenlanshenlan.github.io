     /****  javascript简单使用   ******/
//#####文件包含
//<script type="text/javascript" src="./css_js/index.js"></script>

/* 事件触发示例 
 定义函数
 function hidden(){   
          document.getElementById('x').style.display = "none"; 
 };
 //获取对象
 var code =  document.getElementById("s");
 //事件触发
 code.onmousemove = hidden; //（注意：这里的函数名不能加（），加括号意味着将调用函数;）
*/
 
 //改变html
 //document.getElementById("p2").style.color="blue";

 //setAttribute  更改元素节点的属性  input 改为 button
// document.getElementsByTagName("INPUT")[0].setAttribute("type","button"); 

 //添加类为一个元素添加css 类 为了动画效果
 //w.classList.add("slidetoshow");       

 
//onload  
window.onload = fun_top;  
function fun_top(arg) {
  document.getElementById('top').classList.add("ani_top");
  document.getElementById('auther').classList.add("ani_auther");      
};
var http= document.getElementById('http');
  http.onclick =  fun_http;
 function fun_http() {
  http.classList.add("ani_http");
  doc();   
};
function doc(){
setTimeout("document.getElementById('http').innerHTML='message'",2000); 
setTimeout("document.getElementById('epoll').innerHTML='作为IO连接的处理中心,在这里建立了tcp连接'",7000); 
setTimeout("document.getElementById('doc').innerHTML='作为IO连接的处理中心,在这里建立了tcp连接'",7000);
setTimeout("document.getElementById('epoll').innerHTML='epoll'",13000); 

setTimeout("document.getElementById('queue').innerHTML='将tcp连接加入到队列'",13000);
setTimeout("document.getElementById('doc').innerHTML=  'Queue 将可读的tcp连接加入到队列中等待被处理'",13000);
setTimeout("document.getElementById('queue').innerHTML=  'queue'",19000);

setTimeout("document.getElementById('pthread_pool').innerHTML='在这里线程池中的某个线程从队列中取出一个可用的连接'",19000);
setTimeout("document.getElementById('doc').innerHTML='在这里线程池中的某个线程从队列中取出一个可用的连接，读取消息报文，将其交给应用解析... ...'",19000);
setTimeout("document.getElementById('pthread_pool').innerHTML='pthread_pool'",24000);

setTimeout("document.getElementById('protocol').innerHTML='应用层的协议解析在这里进行'",24000);
setTimeout("document.getElementById('doc').innerHTML='应用层的协议解析在这里进行'",24000);
setTimeout("document.getElementById('protocol').innerHTML='protocol'",29000);

setTimeout("document.getElementById('service').innerHTML='应用层的逻辑处理 ，包括数据库的读写，文件的查找 ... ...'",29000);
setTimeout("document.getElementById('doc').innerHTML='应用层的逻辑处理 ，包括数据库的读写，文件的查找 ... ...'",29000);
setTimeout("document.getElementById('service').innerHTML='service'",37000);

setTimeout("document.getElementById('epoll').innerHTML='处理好的数据即将被返回给客户端'",37000);
setTimeout("document.getElementById('doc').innerHTML='处理好的数据即将被返回给客户端'",37000);
setTimeout("document.getElementById('epoll').innerHTML='epoll'",43000);

setTimeout("document.getElementById('doc').innerHTML='客户端收到回复'",43000); 
setTimeout("document.getElementById('doc').innerHTML=' '",49000); 
setTimeout("document.getElementById('http').innerHTML='cleck me'",49000);
setTimeout("document.getElementById('http').className =''",49000); 
}
 
   
/*
使用 js 控制 css 动画的 逻辑是 
把元素素的 样式设置为 两个状态类  动画前  动画后  用js 对元素添加 删除状态类
并且需要在动画完毕时 设置原本的的div属性为更新后的效果
还原时也是需要这样  相当的麻烦 放弃不用
*/
/* code animation*/
 