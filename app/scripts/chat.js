var gui = require('nw.gui'),
    win = gui.Window.get(),
    savedRange,
    loadingImg = 0,
    toolFaceOver = false,
    picPaths = new Array,
    windowShake,
    windowShakeCount,
    shakable = true,
    preSender,
    preSenderPeeker,
    faceTransferTable = [14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 50, 51, 96, 53, 54, 73, 74, 75, 76, 77, 78, 55, 56, 57, 58, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 32, 113, 114, 115, 63, 64, 59, 33, 34, 116, 36, 37, 38, 91, 92, 93, 29, 117, 72, 45, 42, 39, 62, 46, 47, 71, 95, 118, 119, 120, 121, 122, 123, 124, 27, 21, 23, 25, 26, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 52, 24, 22, 20, 60, 61, 89, 90, 31, 94, 65, 35, 66, 67, 68, 69, 70, 15, 16, 17, 18, 19, 28, 30, 40, 41, 43, 44, 48, 49],
    newnotice = false;

$(".icon-emoji").click(function(){
    $(".face-panel").show();
});

$(".chat-message-enter").keyup(function(){
    savedRange = window.getSelection().getRangeAt(0);
});

$(".chat-message-enter").mouseup(function(){
   savedRange = window.getSelection().getRangeAt(0);
});

$(".chat-message-toolbar").click(function(){
    restoreSelection();
});

function restoreSelection(){
    $(".chat-message-enter").focus();
    if(savedRange != null){
        var s = window.getSelection();
        if(s.rangeCount > 0 ){
            s.removeAllRanges();
        }
        s.addRange(savedRange);
    }
}

window.onload = function(){
    for(var i=0; i < 105; i++){
        var el = document.createElement('div');
        el.className = 'face-cube';
        el.setAttribute('mark', i);
        el.onclick = function(){
            insertImg('face', {face: faceTransferTable[this.getAttribute('mark')]});
            $(".face-panel").hide();

        }
        $(".face-panel").append(el);

        if(i%15 == 14){
            var el = document.createElement('div');
            el.style.clear = 'both';
            $(".face-panel").append(el);
        }
    }
}

function insertImg(imgtype, imgvalue){
    var el = document.createElement('img');
    if(imgtype == 'face'){
        el.src = 'assets/faces/'+imgvalue.face+'.gif';
        el.setAttribute('imgtype','face');
        el.setAttribute('face',imgvalue.face);
    }
    else if(imgtype == 'offpic'){
        el.src = imgvalue.src;
        el.id = imgvalue.id;
        el.setAttribute('imgtype','offpic');
    }
    if(savedRange){
        savedRange.insertNode(el);
    }
    else{

        $(".chat-message-enter").append(el);
    }
    setTimeout(function(){
        savedRange = window.getSelection().getRangeAt(0);
        savedRange = savedRange.cloneRange();
        savedRange.setStartAfter(el);
        savedRange.collapse(true);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(savedRange);
    }, 100);
}

$(".icon-jianqie").click(function(){
    alert("past");
    win.capturePage(function(img) {

        var base64Data = img.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

        require("fs").writeFile("out.png", base64Data, "base64", function (err) {
            alert(err);
        });
    });
});