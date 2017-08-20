<template lang="html">

  <section class="photograb">
    <h1>photograb Component</h1>
    <div>
        <f7-button big raised color="red" v-on:click="getCamera()">make photo</f7-button>
        <div>
			    <img src="" id="myImage"></img>
		    </div>
        <f7-button big color="red" v-on:click="saveImg();">save photo</f7-button>
        <f7-button big color="red" v-on:click="thereCav();">giv cam</f7-button>
        <f7-button big raised color="blue" v-on:click="openFilePicker();">giv pic</f7-button>

    </div>
  </section>

</template>

<script lang="js">
 import mfsService from '../services/mfs.service.js'

  function setOptions(srcType) {
     var options = { 
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: srcType,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: false,
      // correctOrientation: true,
      // saveToPhotoAlbum: true,
      // PictureSourceType: 0,
      targetWidth: 400,
      targetHeight: 300,

      }
      return options;
    }

    let photoObj = {
      fileUri: "",
      fileImg64: "",
    }

  export default  {
    name: 'photograb',
    props: [],
    mounted() {

    },
    data: function () {
      return photoObj
    },
    methods: {
      saveImg: function() {
        console.log("data ", this.photoObj);
        alert("save success!");
      },
      getCamera: function () {
			  navigator.camera.getPicture(this.onSuccess, function () { (err) => alert(err); }, setOptions(Camera.PictureSourceType.Camera));
		  },
      thereCav: function () {
        let cam = document.querySelectorAll(".cordova-camera-capture")[0];
        cam.style.position = "fixed";
        cam.style.top = "100px";
      },
      openFilePicker: function(selection) {

          var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
          var options = setOptions(srcType);
          // var func = createNewFileEntry;

          navigator.camera.getPicture(function cameraSuccess(imageUri) {

              var image = document.getElementById('myImage');
              image.src = "data:image/jpeg;base64," + imageUri;
              // image.src = imageUri;

          }, function cameraError(error) {
              alert("Unable to obtain picture: " + error, "app");

          }, options);
      },
      onSuccess: function(imageURI) {
	      var image = document.getElementById('myImage');
	      image.src = "data:image/jpeg;base64," + imageURI;
	      // image.src = imageURI;
        
        photoObj.fileUri = imageURI;
        photoObj.fileImg64 = image.src;
        // console.log(blob);
        try {
          // alert('createNewFileEntry begin');
          let now = Date.now();
          // To define the type of the Blob
          var contentType = "image/jpeg";
          // if cordova.file is not available use instead :
          var folderpath = cordova.file.externalDataDirectory + "/images/"; 
          //cordova.file.externalDataDirectory
          var filename = "gdapp_" + now.toString() + ".jpeg";
          mfsService.post(folderpath, filename, imageURI, contentType);

          // createNewFileEntry(imageURI);
        } catch (error) {
          alert(error);
        }
        
      }

    },
    computed: {

    }
}



// function createNewFileEntry(imgUri) {
//     window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function success(dirEntry) {

//         // JPEG file
//         let now = Date.now();
//         alert(now);
//         alert(cordova.file.dataDirectory);
//         alert(cordova.file.cashDirectory);
//         alert(cordova.file.externalDataDirectory);
//         let fileName = "gdapp_" + now.toString() + ".jpeg";
//         dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {

//             alert(fileName);
//             // Do something with it, like write to it, upload it, etc.
//             writeFile(fileEntry, imgUri);
//             alert("#1 got file: " + fileEntry.fullPath);
//             // alert("#1 got file: " + fileEntry.fullPath);
//             // for (var key in fileEntry) {
//             //   alert("#1_1 got file: " + fileEntry[key]);  
//             // }
            
//             // displayFileData(fileEntry.fullPath, "File copied to");

//         }, (err) => alert(err));

//     }, (err) => alert(err));
// }

// function writeFile(fileEntry, dataObj) {
//     // Create a FileWriter object for our FileEntry (log.txt).
//     fileEntry.createWriter(function (fileWriter) {

//         fileWriter.onwriteend = function() {
//             alert("Successful file write...");
//             if (dataObj.type == "image/png") {
//                 readBinaryFile(fileEntry);
//             }
//             else {
//                 readFile(fileEntry);
//             }
//         };

//         fileWriter.onerror = function (e) {
//             alert("Failed file write: " + e.toString());
//         };

//         // If data object is not passed in,
//         // create a new Blob instead.
//         if (!dataObj) {
//             // dataObj = new Blob(['some file data'], { type: 'text/plain' });
//         }

//         fileWriter.write(dataObj);
//     });
// }

function onErrorLoadFs(err) {
  console.log(err);
}


function getSampleFile(params) {
  
}
</script>

<style scoped lang="css">
.photograb {
  border: 4px solid red;
}

.cordova-camera-capture {
  position: fixed !important;
  top: 100px;
}
</style>
