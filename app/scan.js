var fs = require('fs');
var vdir = 'videos';

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
                // remove -> app/ <-
                files_.push(name.substring(7));
                console.info(name);
            }
        }
    }
    return files_;
}
videos = getFiles(vdir);

console.info(videos);