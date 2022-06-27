var renderer;
var scene;
var camera;

$(window).on("load",function(){
    scene = new THREE.Scene();
    var width = window.innerWidth; //���ڿ��
    var height = window.innerHeight; //���ڸ߶�
   //�����������
   camera = new THREE.PerspectiveCamera(45,width/height, 0.1, 1000);
   camera.position.set(0, 0, 7); //�������λ��
   camera.near=0.0001;
   camera.far=10000;
   scene.add(camera);
    //������
    ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);
   renderer = new THREE.WebGLRenderer();
   renderer.setSize(width, height);//������Ⱦ����ߴ�
   renderer.setClearColor(0xffffff, 1); //���ñ�����ɫ
   document.body.appendChild(renderer.domElement); //bodyԪ���в���canvas����
   //cube =cube();
   InitControls();
   //camera.lookAt(cube.position); //�����������(ָ��ĳ�������)
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
        color: 0xFFFFFF,    //������ɫ��Ĭ�� 0xFFFFFF
        vertexColors: true, //��������Ƿ�ʹ�ö�����ɫ��Ĭ��false ---�����ѡ������Ϊtrue����color����ʧЧ
        size: 0.005             //�������ӵĴ�С��Ĭ��Ϊ1.0
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
   ctr = new THREE.OrbitControls(camera,renderer.domElement);//�����ؼ�����
   ctr.zoomSpeed=0.3;
   //ƽ���ٶ�
   ctr.panSpeed=0.03;
   //��ת�ٶ�
   ctr.rotationSpeed =0.02;
    //�¼� 
   ctr.addEventListener('change',function(){
    render();
    })
}
