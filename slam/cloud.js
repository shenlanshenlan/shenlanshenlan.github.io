var renderer;
var scene;
var camera;
$(window).on("load",function(){
    scene = new THREE.Scene();
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
   //创建相机对象
   camera = new THREE.PerspectiveCamera(45,width/height, 0.1, 1000);
   camera.position.set(0, 0, 5.5); //设置相机位置
   camera.near=0.0001;
   camera.far=10000;
   scene.add(camera);
    //环境光
    ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);
   renderer = new THREE.WebGLRenderer();
   renderer.setSize(width, height);//设置渲染区域尺寸
   renderer.setClearColor(0x888889, 1); //设置背景颜色
   document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
   //cube =cube();
   InitControls();
   //camera.lookAt(cube.position); //设置相机方向(指向的场景对象)
   load_Cloud();

   render();
})
function render(){
    renderer.render(scene, camera);
}
function load_Cloud(){
    var oReq = new XMLHttpRequest();
    oReq.open("GET", "./cloud.gz", true);
    oReq.responseType ="arraybuffer";
    oReq.onload = function (oEvent) {
      var dt=  oReq.response;
      var txt=pako.ungzip(dt,{to:'string'})
      var arr =txt.split("\n");
      $("#size").html(arr.length);
      for(i=0;i<arr.length;i++){
        row=arr[i];
       row=row.replaceAll("\r","");
       row=row.replaceAll("[","");
       row=row.replaceAll("]","");
       rowarr = row.split(";");
       addPoint(rowarr[0],rowarr[1]);
      //update(i,arr.length);
      }
      var pointMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,    //设置颜色，默认 0xFFFFFF
        vertexColors: true, //定义材料是否使用顶点颜色，默认false ---如果该选项设置为true，则color属性失效
        size: 0.015             //定义粒子的大小。默认为1.0
      });
      pts =new THREE.Points(geometry,pointMaterial);
      pts.scale.set(2,2,2);
      pts.rotateX(Math.PI);
      scene.add(pts);
      render();
      $("#pcs").hide(1000);
    }
    oReq.send();
}
function update(i,length){
       diff=(i/length).toFixed(2)*100+"%";
       console.log(diff)
       document.getElementById("process").innerHTML=diff;
       $("#process").css({"width":diff});
       $("#size").html(i);
       setTimeout(100);
}

var geometry = new THREE.Geometry();
function addPoint(point,color){
  if(color==undefined||point==undefined){
    return;
  }
   var parr =point.split(",")
   var carr=color.split(",")
   var a = new THREE.Vector3(parr[0],parr[1],parr[2]-5);
   var clr = new THREE.Color("rgb("+carr[2]+","+carr[1]+","+carr[0]+")");
   geometry.vertices.push(a);
   geometry.colors.push(clr);
}


function cube(){
    geometry= new THREE.BoxGeometry(1,1,1);
    var material = new THREE.MeshStandardMaterial({ color:0x0f0f00 });
    cube = new THREE.Mesh(geometry,material);
    scene.add(cube);
    render();
    return cube;
}
var ctr
function InitControls(){
   ctr = new THREE.OrbitControls(camera,renderer.domElement);//创建控件对象
   ctr.zoomSpeed=0.05;
   //平移速度
   ctr.panSpeed=0.05;
   //旋转速度
   ctr.rotationSpeed =0.01;
    //事件 
   ctr.addEventListener('change',function(){
    render();
    })
}
