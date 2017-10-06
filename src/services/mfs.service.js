import vue from "vue";


/**
 * Convert a base64 string in a Blob according to the data and contentType.
 * 
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return Blob
 */
function _b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}


function chepPath(path) {

    try {
        window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(fileSystem) {
            fileSystem.getDirectory(path, { create: true, exclusive: false },
                function(dir) {
                    let msg = path + " success!"
                        // alert(msg);
                },
                function(error) {
                    alert(error.code);
                });
        }, function(error) {
            alert(error.code);
        });
    } catch (error) {

    }


}

export default {
    /**
     * Create a Image file according to its database64 content only.
     * 
     * @param folderpath {String} The folder where the file will be created
     * @param filename {String} The name of the file that will be created
     * @param content {Base64 String} Important : The content can't contain the following string (data:image/png[or any other format];base64,). Only the base64 string is expected.
     */
    b64toBlob(b64Data, contentType) {
        return _b64toBlob(b64Data, contentType);
    },
    postImg(folderpath, filename, content, contentType) {

        debugger

        let promise = new Promise((resolve, reject) => {
            // Convert the base64 string in a Blob
            var DataBlob = _b64toBlob(content, contentType);
            window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(fileSystem) {
                fileSystem.getDirectory(folderpath, { create: true, exclusive: false },
                    function(dir) {
                        dir.getFile(filename, { create: true }, function(file) {
                            file.createWriter(function(fileWriter) {
                                fileWriter.write(DataBlob);
                                let result = {
                                    status: true,
                                    message: "File created succesfully.",
                                }


                                resolve(result);
                            }, function() {
                                let msg = 'Unable to save file in path ' + folderpath;
                                let result = {
                                    status: false,
                                    message: msg,
                                }
                                reject(result);
                            });
                        });
                    },
                    function(error) {
                        alert(error.code);
                    });
            }, function(error) {
                alert(error.code);
            });
        });

        return promise;
    },


    initMfs() {
        let paths = ['images', 'records', 'albums'];
        paths.forEach((p) => {
            chepPath(p)
        });
    }
}