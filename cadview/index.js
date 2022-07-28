window.onload=load('窗框');
function load(file){
    var oReq = new XMLHttpRequest();
    oReq.open("GET", "./dxf/"+file+".json", true);
    oReq.responseType ="text";
    oReq.onload = function (oEvent) {
      var txt =  oReq.response;
      dxf= JSON.parse(txt);
      new WebGL(dxf)
    }
    oReq.send();
}
