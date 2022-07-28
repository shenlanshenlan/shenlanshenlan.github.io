function Onclick(e){
    var dom =e.srcElement;
    if(dom.localName=="img"&&dom.id==""){
        var src=dom.src;
        src=src.split("-")[0]+".png";
        $("#bigIMG").show(100);
        $("#bigIMG>img").attr("src",src);
    }else{
        $("#bigIMG").hide(100);
    }
}
function bigIMG_hide(){
    $("#bigIMG").hide(100);
}
window.onclick=Onclick;
window.onload=function(){
}