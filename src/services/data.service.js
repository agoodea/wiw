import vue from "vue";

let mediaItem = {
    id: "",
    description: "some description",
    image: "name file images",
    record: "name record file",
}

let mediaList = [mediaItem];
let album = {
    id: "1",
    name: "first album",
    description: "some description album",
    mediaList: mediaList,
    create: "date",
}

export default {

    getAlbums() {

    },
    getAlbum() {
        let fileData;
        let folderpath = "/albums/";
        let filename = "album.json";
        let promise = new Promise((resolve, reject) => {

            readFromFile(filename, function(data) {
                fileData = data;
                resolve(fileData);
            });

        });

        // this.$log.debug('from file', fileData);
        return promise;
    },
    saveAlbum(_album) {

        if (_album) {
            let folderpath = "/albums/";
            let filename = "album.json";

            writeToFile(filename, album, folderpath);
        }


    },
    deleteAlbum(id) {

    }



}

function writeToFile(fileName, data, folderpath) {

    data = JSON.stringify(data, null, '\t');

    try {
        window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(directoryEntry) {
            directoryEntry.getFile(fileName, { create: true }, function(fileEntry) {
                fileEntry.createWriter(function(fileWriter) {
                    fileWriter.onwriteend = function(e) {
                        // for real-world usage, you might consider passing a success callback
                        console.log('Write of file "' + fileName + '"" completed.');
                    };

                    fileWriter.onerror = function(e) {
                        // you could hook this up with our global error handler, or pass in an error callback
                        console.log('Write failed: ' + e.toString());
                    };

                    var blob = new Blob([data], { type: 'text/plain' });
                    fileWriter.write(blob);
                }, errorHandler.bind(null, fileName));
            }, errorHandler.bind(null, fileName));
        }, errorHandler.bind(null, fileName));
    } catch (error) {

    }
}

function readFromFile(fileName, cb) {

    try {
        var pathToFile = cordova.file.externalDataDirectory + fileName;

        window.resolveLocalFileSystemURL(pathToFile, function(fileEntry) {
            fileEntry.file(function(file) {
                var reader = new FileReader();

                reader.onloadend = function(e) {
                    cb(JSON.parse(this.result));
                };

                reader.readAsText(file);
            }, errorHandler.bind(null, fileName));
        }, errorHandler.bind(null, fileName));
    } catch (error) {
        alert(error);

    }
}



var errorHandler = function(fileName, e) {
    var msg = '';

    switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'Storage quota exceeded';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'File not found';
            break;
        case FileError.SECURITY_ERR:
            msg = 'Security error';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'Invalid modification';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'Invalid state';
            break;
        default:
            msg = 'Unknown error';
            break;
    };

    console.log('Error (' + fileName + '): ' + msg);
}