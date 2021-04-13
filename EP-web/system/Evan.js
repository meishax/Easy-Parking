
var imageurl = "";
var mycanvas;
var pleft;
var ptop;
var bgcolor = "black";
var image = new Image();
;
var context1;
//设置颜色
var linercolor = "white";
//设置线宽
var linw = 4;
window.onload = function () {
  
  initPage();
   showCavas();
}

function initPage() {
    var wwidth = $(window).width();
    var wheight = $(window).height();
    var pwidth = $("#mycavas").width();
    var pheight = $("#mycavas").height();
    pleft = (wwidth - pwidth) / 2;
    ptop = (wheight - pheight) / 2;
   // $("#myPanl").css("padding-left", pleft + "px");
    /*$("#mycavas").css("left",pleft+"px");
     $("#myupload").css("padding-left",pleft+"px");
     $("#mybuttons").css("padding-left",pleft+"px");*/
}
function showCavas() {
    mycanvas = document.getElementById("mycavas");
    context1 = mycanvas.getContext("2d");
    context1.fillStyle = "#E0E0E0";
    context1.strokeRect(0, 0, 800,450);

}


/*
 * drawImage
 * */
function drawImage() {
    context1 = mycanvas.getContext("2d");
    var img = new Image();
    img.onload = function () {
        context1.drawImage(img, 10, 10);
    }
    img.src = imageurl;
    
}
function flippingImage() {
    var img = new Image();
    img.onload = function () {

        context1.scale(1, -1);
        context1.drawImage(img, 10, -300);
    }
    img.src = "tile-wide.png";
}
function saveImage() {
    // 图片导出为 png 格式
    var type = 'png';
    var imgData = mycanvas.toDataURL(type);
    /**
     * 获取mimeType
     *
     */
    var _fixType = function (type) {
        type = type.toLowerCase().replace(/jpg/i, 'jpeg');
        var r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
    };

// 加工image data，替换mime type
    imgData = imgData.replace(_fixType(type), 'image/octet-stream');
    /**
     * 在本地进行文件保存
     *要保存到本地的图片数据
     * 文件名
     */
    var saveFile = function (data, filename) {
        var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        save_link.href = data;
        save_link.download = filename;

        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        save_link.dispatchEvent(event);
    };

// 下载后的问题名
    var filename = 'baidufe_' + (new Date()).getTime() + '.' + type;
// download
    saveFile(imgData, filename);
}

function upload() {

    imageurl = file.value;
}
function lujing() {
    var imagefile = document.getElementById("imagefile");
    var filepath = getPath(document.getElementById("imagefile"));
    alert(filepath);
}
function getPath(obj) {
    if (obj) {
        //ie
        if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
            obj.select();
            return document.selection.createRange().text;
        }
        //firefox
        else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
            if (obj.files) {
                alert(obj.files.item(0).getAsDataURL());
                return obj.files.item(0).getAsDataURL();
            }
            alert(obj.value);
            return obj.value;
        }
        alert(obj.value);
        return obj.value;
    }
}


function bgSetting() {
    if (!bgEdShow) {
        setBrushColor(bgcolor);
        $("#bgEdit").css("display", "block");
        bgEdShow = true;
    }
    else {
        $("#bgEdit").css("display", "none");
        bgEdShow = false;
    }
    addDrawEvent();
}

function preview(file) {
    if (file.files && file.files[0]) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            imageurl = evt.target.result;
            drawImage();
        }
        reader.readAsDataURL(file.files[0]);
    }
    else {
        imageurl = file.value;
        drawImage();
    }
}