var ami =500;
function Onclick(e){
    var dom =e.srcElement;
    if(dom.localName=="img"&&dom.id==""){
        var src=dom.src;
        src=src.split("-")[0]+".png";
        $("#bigIMG").show(ami);
        $("#bigIMG>img").attr("src",src);
    }else{
        $("#bigIMG").hide(ami);
    }
}
function bigIMG_hide(){
    $("#bigIMG").hide(ami);
}
window.onclick=Onclick;
window.onload=function(){ }