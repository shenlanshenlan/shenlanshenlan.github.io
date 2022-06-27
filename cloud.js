var renderer;
var scene;
var camera;

$(window).on("load",function(){
    scene = new THREE.Scene();
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
   //创建相机对象
   camera = new THREE.PerspectiveCamera(45,width/height, 0.1, 1000);
   camera.position.set(0, 0, 7); //设置相机位置
   camera.near=0.0001;
   camera.far=10000;
   scene.add(camera);
    //环境光
    ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);
   renderer = new THREE.WebGLRenderer();
   renderer.setSize(width, height);//设置渲染区域尺寸
   renderer.setClearColor(0xffffff, 1); //设置背景颜色
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
    var size;
    var oReq = new XMLHttpRequest();
    oReq.open("GET", "/cloud.txt", true);
    oReq.responseType = "txt";
    oReq.onload = function (oEvent) {
      var txt =  oReq.response;
      var arr =txt.split("\r\n");
      size=arr.length;
      for(i=0;i<size;i++){
        row=arr[i];
       row=row.replaceAll("[","");
       row=row.replaceAll("]","");
       rowarr = row.split(";");
       addPoint(rowarr[0],rowarr[1]);
       console.log(rowarr);
       size-=1;
       console.log("size:"+size);
      }
      var pointMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,    //设置颜色，默认 0xFFFFFF
        vertexColors: true, //定义材料是否使用顶点颜色，默认false ---如果该选项设置为true，则color属性失效
        size: 0.005             //定义粒子的大小。默认为1.0
      });
      pts =new THREE.Points(geometry,pointMaterial);
      pts.scale.set(2,2,2);
      pts.rotateX(Math.PI);
      scene.add(pts);
      render();
    }
    oReq.send();
}

var geometry = new THREE.Geometry();
function addPoint(point,color){
   var parr =point.split(",")
   var carr=color.split(",")
   var a = new THREE.Vector3(parr[0],parr[1],parr[2]-5);
   var clr = new THREE.Color("rgb("+carr[0]+","+carr[1]+","+carr[2]+")");
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
   ctr.zoomSpeed=0.3;
   //平移速度
   ctr.panSpeed=0.03;
   //旋转速度
   ctr.rotationSpeed =0.02;
    //事件 
   ctr.addEventListener('change',function(){
    render();
    })
}
