const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};

const publicDocumentDir = 'public';

/**
* file_get
*
* GET: /api/facial-recognition/file/{path}
* 
*/
exports.handler = function file_get(req, res, next) {
    var fileName = req.params.fileName;
    var filePath = path.join(process.cwd(), publicDocumentDir, decodeURI(fileName));
    var stats;

    try {
        stats = fs.lstatSync(filePath);

        if(stats.isFile()) {
            var mimeType = mimeTypes[path.extname(filePath).split('.').reverse()[0]];
            res.writeHead(200, {'Content-Type': mimeType});

            try {
                var fileStream = fs.createReadStream(filePath);
                fileStream.pipe(res);
            } catch (e) {
                console.log(`Unexpected error reading file. ${JSON.stringify(e)}`);
            }
        } else if (stats.isDirectory()) {
            res.send(500, 'Specified file is a directory.');
        } else {
            res.send(500, 'Unknown file type.  May be a symlinc.');
        }
    } catch (e) {
        res.send(404, 'File not found');
    }
    next();
};