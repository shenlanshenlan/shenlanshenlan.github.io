
//global
var gl;
var ctx;
var Engine;

// camera
class camera{
    /*
    viewPointX 是世界空间中视点位置
    在平移中更新 = 屏幕移动*缩放
    */
    viewPointX=-80000;
    viewPointY=60000;
    scale=150;
    width;
    height;
    projection;
    constructor(wid,hei){
        this.width=wid;
        this.height=hei;
        //这里2的涵义是居中
    }
    update(){
        this.projection=[
            2 / this.width/this.scale,0, 0,
            0, 2 / this.height/this.scale, 0,
            -1, 1, 1
        ];
    }
    //设置投影矩阵
    setView(shader){
        this.update();
        gl.useProgram(shader);
        //投影矩阵
        var positionLocation = gl.getUniformLocation(shader,"Projection");
        gl.uniformMatrix3fv(positionLocation,false,this.projection);
//视口偏移
        var offsetLocation = gl.getUniformLocation(shader,"offset");
        gl.uniform2f(offsetLocation,this.viewPointX,-this.viewPointY);
    }
    world2Scree(pos){
       this.update();
       var p=new Object;
       var vx =pos.x*this.projection[0];
       var vy =pos.y*this.projection[4];
       //这里没问题正确的
       p.x=(vx+1)/2*this.width
       p.y=(1-(vy+1)/2)*this.height
       return p;
    }
    Scree2World(pos){
    }
}
class WebGL{
    m_cgl; 
    m_ctx;
    m_dxf;
    m_camera
    m_enties=new Array;
    constructor(dxf){
        this.initDom()
        this.m_dxf=dxf;
        Engine=this;
        this.initEngine();
        this.addEntity(this.m_dxf);
        this.draw();
    }
    initDom(){
        this.m_cgl=document.querySelector("#cad-canvas");
        this.m_ctx=document.querySelector("#cad-text");
        this.m_ctx.width=this.m_cgl.clientWidth;
        this.m_ctx.height=this.m_cgl.clientHeight;
    }
    initEngine(){
        gl = this.m_cgl.getContext("webgl");
        ctx = this.m_ctx.getContext("2d");
        if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
        }
        resizeCanvasToDisplaySize(gl.canvas);
        //这里是从0,1 映射到像素平面
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        this.m_camera=new camera(gl.canvas.width,gl.canvas.height);
        this.ctr();
        EntityInitShader();
    }
    ctr(){
        windowAddMouseWheel(this.m_ctx,function(value){ 
            //console.log(Engine.m_camera.scale);
            Engine.m_camera.scale+=Engine.m_camera.scale*0.2*value;    ///value*10*scaleFactor;
            if(Engine.m_camera.scale<0.1){
               Engine.m_camera.scale=0.1;
            }
            Engine.draw();
         })
        //移动
        Engine.m_ctx.onmousedown = function (e) {
            var px=e.clientX;
            var py=e.clientY;
            Engine.m_ctx.onmousemove=function(e){
                var dx=(e.clientX-px);
                var mx=dx//*(Engine.m_camera.scale)
                var dy=(e.clientY-py)
                var my=dy//*(Engine.m_camera.scale)
                Engine.m_camera.viewPointX+=mx*Engine.m_camera.scale;
                Engine.m_camera.viewPointY+=my*Engine.m_camera.scale;
                px=e.clientX;py=e.clientY;
                //console.log(mx+";"+my);
                //console.log(dx+";"+dy+"  scale"+Engine.m_camera.scale);
                Engine.draw();
            }
        };
        Engine.m_ctx.onmouseup = function (e) {
            Engine.m_ctx.onmousemove=null;
        };
    }
    addEntity(dxf){
        this.Coordinate();
            var obj = glLine(dxf.lines);
            this.m_enties.push(obj);
        for (var i = 0; i < dxf.texts.length; i++) {
            var tx= dxf.texts[i];
            var obj = new Text(tx.txt,tx.pos,tx.ros,tx.color,tx.height,tx.rangeWidth,tx.font);
            this.m_enties.push(obj);
        }

    }
    draw(){
        gl.clearColor(0.15, 0.19, 0.22, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        ctx.clearRect(0,0,this.m_ctx.width*100,this.m_ctx.height*100);
        this.m_enties.forEach(ent=> {
           ent.draw();
        });
    }
    Coordinate(){
        var buffer=[
            0,0,255,0,0,
            10000,0,255,0,0,
            0,0,0,255,0,
            0,10000,0,255,0,
        ]
        var coor =new Object;
        coor.buffer=buffer;
        coor.count=2;
        this.m_enties.push(new Line(coor));
    }
}
    //鼠标滚轮监听 兼容模式
    function windowAddMouseWheel(elm,myFunc) {
        let scrollFunc = function (e) {
            e = e || window.event;
            if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
                myFunc(-e.wheelDelta/120);
            }
            else if (e.detail) {  //Firefox滑轮事件
                e.wheelDelta = e.detail;
                myFunc(e.wheelDelta/3);
            }
        };
        elm.addEventListener('DOMMouseScroll', scrollFunc, false); //火狐
        //滚动滑轮触发scrollFunc方法
        elm.onmousewheel = scrollFunc;
    }
// 多线未区分此处可优化
function glLine(line){
    var buf=[];
    for(var i=0;i<line.buffer.length;){
        for(var j=0;j<7;j++){
            buf.push(line.buffer[i+j]);
        }
        buf.push(line.buffer[i+2]);
        buf.push(line.buffer[i+3]);
        buf.push(line.buffer[i+4]);
        i+=7
    }
    line.buffer=buf;
    return new Line(line);
}
function createShader(gl,type,source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader,gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }
  function createProgram(gl,vertexShader,fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program,gl.LINK_STATUS);
    if (success) {
      return program;
    }
   
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }
  
  function resizeCanvasToDisplaySize(canvas) {
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    const needResize = canvas.width  !== displayWidth ||
                       canvas.height !== displayHeight;

    if (needResize) {
      // Make the canvas the same size
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }

    return needResize;
  }
