'use strict';

var colors = ['#3498db', '#d35400', '#2980b9', '#16a085', '#27ae60', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)'];
var videos = [];

var fs = require('fs');
var vdir = 'app/videos';

function getFiles(dir, files_) {
    files_ = files_ || [];
    if (typeof files_ === 'undefined') files_ = [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        if (!files.hasOwnProperty(i)) continue;
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else {
            if (!name.indexOf('.DS_Store') > -1) {
                files_.push(name.substring(4));
                console.info(name);
            }
        }
    }
    return files_;
}
videos = getFiles('app/videos');

var videoque = [];

var video_1 = document.getElementById("video_1");
var video_2 = document.getElementById("video_2");
var overlayWhite = document.getElementById("overlay-white");
var overlayColor = document.getElementById("overlay-color");
var active = 0;

var strobeVar = false;
var colorVar = false;


// check if all videos are spelled correctly
for (var i = 0; i < videos.length; i++) {
    var src = videos[i];
    video_1.setAttribute('src', src);
}

transition();

// video transition every 50 seconds
var timer = setInterval(function() {
    transition();
}, 50000);


document.onkeydown = function(event) {
    var overlay = null;
    // strobe on 1
    if (event.keyCode == '49') {
        if (!strobeVar) {
            strobeVar = true;
        } else {
            strobeVar = false;
        }
    }

    // strobe on 2
    if (event.keyCode == '50') {
        overlay = overlayColor;
        if (!colorVar) {
            colorVar = true;
            overlay.className = 'overlay';
        } else {
            colorVar = false;
            overlay.className = 'paused overlay';
        }
    }

    // transition on space
    if (event.keyCode == '32') {
        transition();
    }
};


function strobe() {
    var overlay = overlayWhite;
    overlay.className = "overlay active";

    setTimeout(function() {
        overlay.className = "overlay";
    }, 20);
}

function colorStrobe() {
    setTimeout(function() {
        var overlay = overlayColor;
        overlay.style.background = colors[Math.floor((Math.random() * colors.length))];
    }, 170);
}

var timer = setInterval(function() {
    if (strobeVar) {
        strobe();
    }
}, 100);

var timer = setInterval(function() {
    if (colorVar) {
        colorStrobe();
    }
}, 100);

function transition() {
    // fill in all videos if que is empty
    if (videoque.length === 0) {
        videoque = videos;
    }

    i = Math.floor((Math.random() * videos.length));
    var src = videoque[i];
    console.info('Play ' + src);
    videoque.splice(i, 1);

    if (active === 0) {
        video_2.setAttribute('src', src);
        video_1.className = '';
        video_2.className = 'active';
        active = 1;
    } else {
        video_1.setAttribute('src', src);
        video_2.className = '';
        video_1.className = 'active';
        active = 0;
    }
}