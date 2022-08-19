window.onload=function(){
  loaddt('厂房平面')
};
function loaddt(file){
    var oReq = new XMLHttpRequest();
    oReq.open("GET", "./dxf/"+file+".gz", true);
    oReq.responseType ="arraybuffer";
    oReq.onload = function (oEvent) {
      var dt=oReq.response;
      var txt=pako.inflate(dt,{to:'string'})
      dxf= JSON.parse(txt);
      new WebGL(dt)
    }
    oReq.send();
}
