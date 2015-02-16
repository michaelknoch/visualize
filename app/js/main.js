'use strict';

var colors = ['#3498db', '#d35400', '#2980b9', '#16a085', '#27ae60', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)'];
var videos = ["Alt-J - _Tessellate.mp4",
    "Modeselektor - German Clap - Live Berlin 2011 Monkeytown.mp4",
    "badkingdom.mp4",
    "Fight Club Ending - Where is My Mind.mp4",
    "nightstroll.mp4",
    "seamonkey.mp4",
    "sohn-wheel.mp4",
    "timeisnow.mp4",
    "Gigi D' Agostino- Blablabla.mp4",
    "Daft Punk - Something About Us.mp4",
    "Gorillaz - Clint Eastwood.mp4",
    "Daft Punk - One More Time.mp4",
    "Oasis - Wonderwall - Official Video.mp4",
    "Gorillaz - Tomorrow Comes Today.mp4",
    "Oasis - Some Might Say - Official Video.mp4",
    "Gorillaz - Dirty Harry.mp4",
    "Sizarr - Boarding Time (Official Video).mp4",
    "Coldplay - Paradise [New Official Video].mp4",
    "Sizarr - Scooter Accident (Official Video).mp4",
    "Nirvana - Come As You Are - VIDEO.mp4",
    "Daft Punk - _Harder Better Faster Stronger_ (LIVE @ Alive 2007) (Official Music .mp4",
    "Dapayk & Padberg _Razorskit_ (Official Music Video).mp4",
    "Dapayk & Padberg _Layers_ (Official Video).mp4",
    "Joachim Pastor - Braumstig (original mix).mp4",
    "Joachim Pastor - Born and Left (official video)   Parquet 055.mp4",
    "Kollektiv Turmstrasse - Tristesse [HD 720p].mp4",
    "Urban Cone - Urban Photograph Official Video.mp4",
    "M83 - 01 - We Own The Sky (MELT! 2012).mp4",
    "The Kooks - Sway.mp4",
    "R.E.M. - Losing My Religion (Video).mp4",
    "Coldplay - Strawberry Swing.mp4",
    "Radiohead - Karma Police.mp4",
    "Radiohead - House of Cards.mp4",
    "Pixies - Where Is My Mind_ (Music Video).mp4",
    "Shift.mp4",
    "breakdance.mp4",
    "The Sound of Animals Fighting - Another Leather Lung (Official Video).mp4",
    "Star Slinger - Mornin' (Music Video Directed by Alan Jensen).mp4",
    "Laurel Halo - Embassy.mp4",
    "Regal Safari - Light.mp4",
    "Tove Lo - Habits (Stay High) - Hippie Sabotage Remix.mp4",
    "Tove Lo - Not On Drugs.mp4",
    "Lucas Nord feat. Tove Lo - Run On Love.mp4",
    "The Sound of Arrows - coming soon....mp4",
    "Jonathan Johansson - Stockholm.mp4",
    "The Sound of Arrows - Wonders.mp4",
    "Peter_ Bjorn & John - Young Folks.mp4",
    "Summer Like The Season -- If You're Not Weird_ Then You're Not Honest.mp4",
    "Boys Noize   Jeffer.mp4",
    "BOYS NOIZE - Jeffer (Music Video).mp4"
];

var fs = require('fs');
var cache = {
    '/etc': '/private/etc'
};
fs.realpath('/etc/passwd', cache, function(err, resolvedPath) {
    if (err) throw err;
    console.log(resolvedPath);
});

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
    video_1.setAttribute('src', 'videos/' + src);
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