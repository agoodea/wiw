function setOptions(srcType) {
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: false,
        // correctOrientation: true,
        // saveToPhotoAlbum: true,
        PictureSourceType: 0,
        targetWidth: 400,
        targetHeight: 300,

    }
    return options;
}

let photoObj = {
    fileUri: "",
    fileImg64: "",
}

export default {
    name: 'photograb',
    props: [],
    mounted() {

    },
    data: function() {
        return photoObj
    },
    methods: {
        saveImg: function() {
            console.log("data ", this.photoObj);
            alert("save success!");
        },
        getCamera: function() {
            navigator.camera.getPicture(this.onSuccess, function() {
                (err) => alert(err); }, setOptions());
        },
        thereCav: function() {
            let cam = document.querySelectorAll(".cordova-camera-capture")[0];
            console.log(cam);
            cam.style.position = "fixed";
            cam.style.top = "100px";


        },
        openFilePicker: function(selection) {

            // var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
            // var options = setOptions(srcType);
            // // var func = createNewFileEntry;

            // navigator.camera.getPicture(function cameraSuccess(imageUri) {

            //     var image = document.getElementById('myImage');
            //     image.src = "data:image/jpeg;base64," + imageUri;

            // }, function cameraError(error) {
            //     alert("Unable to obtain picture: " + error, "app");

            // }, options);
        }
        onSuccess: function(imageURI) {
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageURI;
            debugger;
            photoObj.fileUri = imageURI;
            photoObj.fileImg64 = image.src;
            // console.log(blob);
            try {
                alert('createNewFileEntry begin');
                createNewFileEntry(imageURI);
            } catch (error) {
                alert(error);
            }

        }

    },
    computed: {

    }
}



function createNewFileEntry(imgUri) {
    window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {

        // JPEG file
        let fileName = "gdApp_" + Math.random().toString(36) + ".jpg";
        dirEntry.getFile(fileName, { create: true, exclusive: false }, function(fileEntry) {

            // Do something with it, like write to it, upload it, etc.
            writeFile(fileEntry, imgUri);
            alert("#1 got file: " + fileEntry.fullPath);
            // alert("#1 got file: " + fileEntry.fullPath);
            // for (key in fileEntry) {
            //   alert("#1_1 got file: " + fileEntry[key]);  
            // }

            // displayFileData(fileEntry.fullPath, "File copied to");

        }, (err) => alert(err));

    }, (err) => alert(err));
}

function getFileEntry(imgUri) {
    window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {

        // Do something with the FileEntry object, like write to it, upload it, etc.
        writeFile(fileEntry, imgUri);
        alert("#2 got file: " + fileEntry.fullPath);
        alert("#2_1 got file: " + fileEntry);
        // displayFileData(fileEntry.nativeURL, "Native URL");

    }, function() {
        // If don't get the FileEntry (which may happen when testing
        // on some emulators), copy to a new FileEntry.
        createNewFileEntry(imgUri);
    });
}

function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function(fileWriter) {

        fileWriter.onwriteend = function() {
            alert("Successful file write...");
            readFile(fileEntry);
        };

        fileWriter.onerror = function(e) {
            alert("Failed file write: " + e.toString());
        };

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob(['some file data'], { type: 'text/plain' });
        }

        fileWriter.write(dataObj);
    });
}

function onErrorLoadFs(err) {
    console.log(err);
}

function getSampleFile(params) {



    // var blob = new Blob([this.response], { type: 'image/png' });
    // saveFile(dirEntry, blob, "downloadedImage.png");

}