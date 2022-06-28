var renderer;
var scene;
var camera;
$(window).on("load",function(){
    scene = new THREE.Scene();
    var width = window.innerWidth; //���ڿ��
    var height = window.innerHeight; //���ڸ߶�
   //�����������
   camera = new THREE.PerspectiveCamera(45,width/height, 0.1, 1000);
   camera.position.set(0, 0, 5.5); //�������λ��
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
    var oReq = new XMLHttpRequest();
    oReq.open("GET", "/cloud.txt", true);
    oReq.responseType =   "text";
    oReq.onload = function (oEvent) {
      var txt =  oReq.response;
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
        color: 0xFFFFFF,    //������ɫ��Ĭ�� 0xFFFFFF
        vertexColors: true, //��������Ƿ�ʹ�ö�����ɫ��Ĭ��false ---�����ѡ������Ϊtrue����color����ʧЧ
        size: 0.005             //�������ӵĴ�С��Ĭ��Ϊ1.0
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
   ctr = new THREE.OrbitControls(camera,renderer.domElement);//�����ؼ�����
   ctr.zoomSpeed=0.1;
   //ƽ���ٶ�
   ctr.panSpeed=0.1;
   //��ת�ٶ�
   ctr.rotationSpeed =0.01;
    //�¼� 
   ctr.addEventListener('change',function(){
    render();
    })
}
