
function EntityInitShader(){
    var vs=createShader(gl,gl.VERTEX_SHADER,Line.vs);
    var fs=createShader(gl,gl.FRAGMENT_SHADER,Line.fs);
    Line.mProgram=createProgram(gl,vs,fs);
}
class Line{
    mBuffID;
    static mProgram=null;
    mColor;
    mWidth;
    mStyle;
    mCount;
    mBuff;
    positionAttributeLocation;
    colorAttributeLocation;
    constructor(lines){
        this.mStyle=lines.style;
        this.mCount=lines.count;
        this.mBuff=lines.buffer;
        this.mBuffID=gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,this.mBuffID);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.mBuff), gl.STATIC_DRAW);
        this.positionAttributeLocation=gl.getAttribLocation(Line.mProgram,"a_position")
        this.colorAttributeLocation=gl.getAttribLocation(Line.mProgram,"a_color")
    }
    draw(){
        gl.bindBuffer(gl.ARRAY_BUFFER,this.mBuffID);
        gl.vertexAttribPointer(this.positionAttributeLocation,2,gl.FLOAT,false,5*Float32Array.BYTES_PER_ELEMENT,0);
        gl.vertexAttribPointer(this.colorAttributeLocation,3,gl.FLOAT,false,5*Float32Array.BYTES_PER_ELEMENT,2*Float32Array.BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(this.positionAttributeLocation);
        gl.enableVertexAttribArray(this.colorAttributeLocation);

        //设置视角
        Engine.m_camera.setView(Line.mProgram);
        //设置属性
        gl.drawArrays(gl.LINES,0,this.mCount*2);
    }
   static vs="attribute vec2 a_position;attribute vec3 a_color;varying vec3 clr;uniform vec2 offset;uniform mat3 Projection;void main(){gl_Position=vec4((Projection*vec3(a_position+offset,0)),1);clr=a_color;}";
   static fs="precision mediump float;varying vec3 clr;void main(){gl_FragColor=vec4(clr,1);}";
}
class Text{
    mPos=new Object; 
    txt;
    r;
    mColor;
    height;
    rangeWidth;
    font;
    constructor(txt,pos,rt,color,hei,rangeWidth,ft){
        this.mPos.x=pos[0];
        this.mPos.y=pos[1];
        this.txt=txt;
        this.r=rt;
        this.mColor=color;
        this.height=hei;
        this.range=rangeWidth;
        this.font=ft;
        if(this.font==""){
            console.log("字体问题;"+txt);
        }
    };
    draw(){
      var mx=Engine.m_camera.viewPointX;
      var my=Engine.m_camera.viewPointY;
      var scale=Engine.m_camera.scale;
      //vps 是文字的世界坐标+偏移
      var vps=new Object 
      vps.x=this.mPos.x+mx;
      vps.y=this.mPos.y-my;
      //变换到屏幕空间
      var ps =Engine.m_camera.world2Scree(vps);
      //绘制文字
      ctx.translate(ps.x,ps.y);
      ctx.rotate(-this.r*Math.PI/180);
      var size=this.height/scale;
      ctx.font= size+"px "+this.font;
      ctx.fillStyle=this.mColor;
      if(this.range>0){// 多行文字
        /*
        var wd =ctx.measureText("s");
        var twd =ctx.TextWidth;
        ctx.textAlign='end';
        var width=ctx.measureText(this.txt);
        */
        ctx.fillText(this.txt,0,0);
      }else{ //单行文字
        ctx.fillText(this.txt,0,0);
      }

      ctx.rotate(this.r*Math.PI/180);
      ctx.translate(-ps.x,-ps.y);
//      var scale=Engine.m_camera.scale;
    }
}