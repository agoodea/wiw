<template lang="html">

  <section class="photograb">
          <f7-navbar sliding theme="red">
          <f7-nav-left>
            <f7-link class="close-popup">
              <f7-icon f7="close_round" size="35px" color="#c0392b"></f7-icon>
            </f7-link>
          </f7-nav-left>
          <f7-nav-center>New slide</f7-nav-center>
          <f7-nav-right>
            <f7-link @click="addSlide" class="close-popup" v-bind:disabled = "!isValid">
              <f7-icon f7="check_round" size="35px" color="#c0392b"></f7-icon>
            </f7-link>
          </f7-nav-right>
      </f7-navbar>

      <div form class = "slide_title">
         <input type="text" placeholder="Title"   v-model="slide.title" v-bind:class="{invalid: !isValid}"/>
      </div>

      <div> 
        <progress max="100" v-bind:value="resValue" color="red"></progress>
        <span id ="timerEl" style = "position: fixed; top: 30%; left: 20%;"> : </span>  
      </div>
  



      <img src="" class="lazy slide-img"  id="myImage" style="display: none">
      <div class="control-buttons"> 
        <f7-list>
          <f7-list-item>
              <f7-button color="red" v-on:click="getCamera()"><f7-icon material="camera" size="35px"></f7-icon></f7-button>
              <f7-button color="red" v-on:click="playRecord()"><f7-icon material="photo_library" size="35px"></f7-icon></f7-button>
              <f7-button color="green" v-on:click="getRecord()"><f7-icon material="mic" size="35px"></f7-icon></f7-button>
          </f7-list-item>
        </f7-list>
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
      saveToPhotoAlbum: false,
      // PictureSourceType: 0,
      //  targetWidth: 300,
      //  targetHeight: 400,

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
    created() {
      this.mediaRec = null;
      this.recTime = 0;
      this.audioSrc = null;
      this.recordSrc = "/android_asset/www/audio/1.amr";
      this.recProcess = 2;
      
        
    },
    computed: {
      // recProcess() {
      //   return this.recordProcess;
      // },
      
    },
    data() {
      return { 
        photoObj,
        // recordProgress,
        sound: {},
        slide: {
          title: "",
          img: "",
          record: "",
        },
        resValue: 10,
        amr: "rec.amr"
      }
    },
    methods: {
      

      addSlide: function() {
        this.$emit('newslide', {slide: this.slide, new: true});
        this.slide = {
          title: "",
          img: "",
          record: "",  
        }
      },

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

          navigator.camera.getPicture(function cameraSuccess(imageUri) {
              debugger
              var image = document.getElementById('myImage');
              let src = "data:image/jpeg;base64," + imageUri;
              image.src = "data:image/jpeg;base64," + imageUri;
              image.style.display = "block";

          }, function cameraError(error) {
              alert("Unable to obtain picture: " + error, "app");
          }, options);
      },
      onSuccess: function(imageURI) {
        var image = document.getElementById('myImage');
	      image.src = "data:image/jpeg;base64," + imageURI;
        this.slide.img = "";
        image.style.display = "block";
        try {
 
          let now = Date.now();
          var contentType = "image/jpeg";
          var folderpath = 'images'; 
          var filename = "gdapp_" + now.toString() + ".jpeg";
          mfsService.postImg(folderpath, filename, imageURI, contentType)
            .then((result) => {
                alert(JSON.stringify(result));
                if(result.status) {
                  console.log(`photograb success #2`);

                  this.slide.img = filename;
                }
            })
            .catch((error) => {
              if(!error.status) {
                console.log(error.message);
              }
            });
        } catch (error) {
          alert(error);
        }
        
      },
      captureError: function(e) {
        console.log('captureError' ,e);
        console.log(e);
      },
      captureSuccess: function(e) {
        // console.log('captureSuccess');
        // console.dir(e);
        alert(JSON.stringify(e[0]));
        this.sound.file = e[0].localURL;
        this.sound.filePath = e[0].fullPath;
        alert(JSON.stringify(this.sound.file));
        

    
      },
      seekTo() {
          console.log("seekTo()");
          if (media1) {
              media1.seekTo(15000);
          }
      },
      getRecord() {
        this.recordSrc = cordova.file.externalDataDirectory + "dg_amr1.amr";
        let my_media = new Media(this.recordSrc, this.onSuccessRecord, this.onErrorRecord);
        my_media.startRecord();
        alert("start");
        alert(JSON.stringify(my_media));
        setTimeout(function() {
            alert("stop????");
            alert(JSON.stringify(my_media));
            try {
              my_media.stopRecord();
              my_media.release();
              alert("stop");
            } catch (error) {
              alert("error!!!");
              alert(error);
            }
            
        }, 5000);
        alert("!!!");
        let timerEl = document.getElementById("timerEl");
        let mediaTimer = setInterval(function () {
            // get media amplitude
            let count = 0;
            my_media.getCurrentAmplitude(
                // success callback
                function (amp) {
                    count +=  amp;
                    timerEl.textContent = count + " sec";
                },
                // error callback
                function (e) {
                    alert("Error getting amp=");
                    alert(e);
                }
            );
        }, 100);
        // navigator.device.capture.captureAudio(this.captureSuccess,this.captureError,{limit:1, duration:10});
      },
      onSuccessRecord(e) {
        alert("!eeeee!");
        alert(e);
      },
      onErrorRecord(e) {
        alert("err");
        alert(JSON.stringify(e));
      },


      playRecord: function() {
          // alert("#3");
          // alert(JSON.stringify(this.sound.file));
          if(!this.sound.file) {
              navigator.notification.alert("Record a sound first.", null, "Error");
              // alert("#2");
              return;
          }

          try {
              var media = new Media(this.sound.file, function(e) {
                  media.release();
              
              }, function(err) {
              });
          } catch (error) {
            alert("#4");
          }
          this.resValue = 20;
          media.play();
          let timerEl = document.getElementById("timerEl");
          var mediaTimer = setInterval(function () {
          // get media position
              media.getCurrentPosition(
                  // success callback
                  function (position) {
                  
                      if (position > -1) {
                          // this.recordProcess = position*100;
                          // this.recProcess++;
                          
                          timerEl.textContent = position + " sec";
                          // this.resValue += 12;
                          alert(this.resValue);
                          this.resValue = this.resValue + 10;
                          
                      }
                  },
                  // error callback
                  function (e) {
                      console.log("Error getting pos=" + e);
                  }
              );
          }, 1000);
      }
    },
    computed: {
      validation: function () {
        return {
          title: !!this.slide.title.trim(),
        }
      },
      isValid: function () {
        var validation = this.validation
        return Object.keys(validation).every(function (key) {
          return validation[key]
        })
      },

    }
}



function onErrorLoadFs(err) {
  console.log(err);
}


function getSampleFile(params) {
  
}
</script>

<style scoped lang="sass">
.photograb
  height: 100vh
  background-repeat: no-repeat
  background-size: contain
  width: 100%
  height: 100%

  .control-buttons 
    position: fixed
    bottom: 0
    padding: 0 35px
    width: 100%

  .slide_title
    input
      padding: 4px 10px
      width: 100%;
      font-size: 24px;
      background: azure;
      border: none;

    .invalid
      background: rgba(244, 67, 54, 0.17)


.list-block 
  margin: 0 auto

.slide-img 
  min-width: 100%
  min-height: 100px
  max-height: 80%

.cordova-camera-capture 
  position: fixed !important
  top: 100px

//colors
$black_50: rgba(0, 0, 0, 0.5);
$royal_blue: royalblue;
$white: white;

progress[value] 
	appearance: none
	border: none
	width: 100%
	height: 20px
	background-color: whiteSmoke
	//Instead of the line below you could use @include border-radius($radius, $vertical-radius)
	border-radius: 3px
	//Instead of the line below you could use @include box-shadow($shadow-1, $shadow-2, $shadow-3, $shadow-4, $shadow-5, $shadow-6, $shadow-7, $shadow-8, $shadow-9, $shadow-10)
	box-shadow: 0 2px 3px $black_50 inset
	color: $royal_blue
	position: relative
	margin: 0 0 1.5em

progress[value]::-webkit-progress-bar 
	background-color: whiteSmoke
	//Instead of the line below you could use @include border-radius($radius, $vertical-radius)
	border-radius: 3px
	//Instead of the line below you could use @include box-shadow($shadow-1, $shadow-2, $shadow-3, $shadow-4, $shadow-5, $shadow-6, $shadow-7, $shadow-8, $shadow-9, $shadow-10)
	box-shadow: 0 2px 3px $black_50 inset

progress[value]::-webkit-progress-value 
	position: relative
	background-size: 35px 20px, 100% 100%, 100% 100%
	//Instead of the line below you could use @include border-radius($radius, $vertical-radius)
	border-radius: 3px
	animation: animate-stripes 5s linear infinite
	&:after 
		content: ''
		position: absolute
		width: 5px
		height: 5px
		top: 7px
		right: 7px
		background-color: $white
		//Instead of the line below you could use @include border-radius($radius, $vertical-radius)
		border-radius: 100%
	

@keyframes animate-stripes 
	100% 
		background-position: -100px 0
	

progress::-webkit-progress-value 

</style>