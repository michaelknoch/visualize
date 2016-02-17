'use strict';

var colors = ['#3498db', '#d35400', '#2980b9', '#16a085', '#27ae60', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)'];
var videos = ['31871951.mp4',
'test.mp4',
'test2.mp4',
'vlc-record-2015-10-22-18h12m46s-THE SON OF THE SHEIK (1926) - Rudolph Valentino, Vilma Banky.mp4- 20.14.51.mp4',
'vlc-record-2015-10-27-16h32m16s-THE SON OF THE SHEIK (1926) - Rudolph Valentino, Vilma Banky.mp4- 20.14.52.mp4',
'vlc-record-2015-10-28-17h00m17s-vlc-record-2015-10-28-13h05m44s-dvd____D__-.mpg-.mp4',
'vlc-record-2015-10-28-17h01m47s-vlc-record-2015-10-28-13h05m44s-dvd____D__-.mpg-.mp4',
'vlc-record-2015-10-29-18h35m36s-vlc-record-2015-10-29-15h20m30s-dvd____D__-.mp4-.mp4',
'vlc-record-2015-10-29-18h36m58s-vlc-record-2015-10-29-15h20m30s-dvd____D__-.mp4-.mp4',
'vlc-record-2015-10-29-18h42m11s-Lichtspiel Opus I - https___archive.org_details_LichtspielOpusI-.mp4',
'vlc-record-2015-10-29-18h51m33s-Lichtspiel Opus I - https___archive.org_details_LichtspielOpusI-.mp4',
'vlc-record-2015-10-30-11h07m28s-vlc-record-2015-10-28-13h05m44s-dvd____D__-.mp4-.mp4',
'vlc-record-2015-10-30-11h09m01s-vlc-record-2015-10-28-13h05m44s-dvd____D__-.mp4-.mp4' ];

var videoque = [];

var video_1 = document.getElementById("video_1");
var video_2 = document.getElementById("video_2");
var logo = document.getElementById("logo");

var overlayWhite = document.getElementById("overlay-white");
var overlayColor = document.getElementById("overlay-color");
var active = 0;

var strobeVar = false;
var colorVar = false;

var showLogo = false;


// check if all videos are spelled correctly
for (var i = 0; i < videos.length; i++) {
  var src = videos[i];
  video_1.setAttribute('src', 'videos/' + src);
}

// video transition every 50 seconds
var timer = setInterval(function () {
  transition();
}, 50000);

transition();

document.onkeydown = function (event) {
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

    // show logo
    if (event.keyCode == '51') {
      if (!showLogo) {
        logo.className = 'logo active';
        showLogo = true;
      } else {
        showLogo = false;
        logo.className = 'logo';
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

    setTimeout(function () {
      overlay.className = "overlay";
    }, 20);
  }

  function colorStrobe() {
    setTimeout(function () {
      var overlay = overlayColor;
      overlay.style.background = colors[Math.floor((Math.random() * colors.length))];
    }, 270);
  }

  var timer = setInterval(function () {
    if (strobeVar) {
      strobe();
    }
    if (colorVar) {
      colorStrobe();
    }
  }, 100);


  function transition() {


    // fill in all videos if que is empty
    if (videoque.length === 0) {
      videos.forEach(function(item) {
        videoque.push(item);
      });
    }

    i = Math.floor((Math.random() * videoque.length));
    var src = videoque[i];


    console.info('Play ' + src);
    videoque.splice(i, 1);

    if (active === 0) {
      video_2.setAttribute('src', 'videos/' + src);
      video_1.className = '';
      video_2.className = 'active';
      active = 1;
    } else {
      video_1.setAttribute('src', 'videos/' + src);
      video_2.className = '';
      video_1.className = 'active';
      active = 0;
    }
  }