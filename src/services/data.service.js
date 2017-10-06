import vue from "vue";


// import _ from 'lodash'

export default {

    saveSettings(settings) {

        fileName = 'gd_settings.json';
        folderpath = '/data/'
        return writeToFile(fileName, settings);
    },

    getFile(filename, folderpath) {
        // alert("datagetfile");
        // alert(filename);
        // alert(folderpath);
        let promise = new Promise((resolve, reject) => {

            readFromFile(filename, folderpath, function(data) {
                resolve(data);
            }, function(err) {
                alert("#1");
            });

        });

        // this.$log.debug('from file', fileData);
        return promise;
    },
    getAlbum(fileName, filePath) {
        let fileData;
        let promise = new Promise((resolve, reject) => {
            readFromFile(filename, function(data) {
                fileData = data;
                resolve(fileData);
            }, (err) => {
                alert("#2");
            });

        });

        // this.$log.debug('from file', fileData);
        return promise;
    },
    saveAlbum(_album) {

        let folderpath = "/albums/";
        let fileName = `gd_${_album.id}.json`;
        _album.fileName = fileName;

        return writeToFile(fileName, _album, folderpath);



    },

    saveIndexAlbums(ia) {
        let folderpath = "albums/";
        let fileName = `indexalbums.json`;
        writeToFile(fileName, ia, folderpath);

    },
    deleteAlbum(id) {

    }



}

function writeToFile(fileName, data, folderpath) {

    let promise = new Promise((resolve, reject) => {
        data = JSON.stringify(data, null, '\t');

        try {
            window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(fileSystem) {
                    fileSystem.getDirectory(folderpath, { create: true, exclusive: false },
                        function(dir) {
                            dir.getFile(fileName, { create: true }, function(fileEntry) {
                                fileEntry.createWriter(
                                    function(fileWriter) {
                                        var blob = new Blob([data], { type: 'text/plain' });
                                        fileWriter.write(blob);
                                        let result = {
                                            status: true,
                                            message: "Album created succesfully.",
                                        }
                                        resolve(result);
                                    },
                                    function() {
                                        let msg = 'Unable to save file in path ' + folderpath;
                                        let result = {
                                            status: false,
                                            message: msg,
                                        }
                                        reject(result);
                                    });

                            });
                        },
                        errorHandler.bind(null, fileName));
                },
                errorHandler.bind(null, fileName));
        } catch (error) {
            errorHandler.bind(null, error);
        }
    });
    return promise;
}

function readFromFile(fileName, filePath, cb) {
    var pathToFile = cordova.file.externalDataDirectory + filePath + fileName;
    window.resolveLocalFileSystemURL(pathToFile, function(fileEntry) {
            fileEntry.file(function(file) {
                var reader = new FileReader();
                reader.onloadend = function(e) {
                    cb(JSON.parse(this.result));
                };
                reader.readAsText(file);
            }, errorHandler.bind(null, "fileName 1"));
        },
        (err) => {
            console.log("Let start!");
        }
    );
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