<template lang="html">

  <section class="photograb">
    <f7-navbar sliding theme="red">
        <f7-nav-left>
            <f7-link class="close-popup" @click="clearSlide">
                <f7-icon   f7="close_round" size="35px" color="#c0392b"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-center v-if = "isNewSlide">New slide </f7-nav-center>
        <f7-nav-center v-else>Edit slide</f7-nav-center>
        <f7-nav-right>
            <f7-link @click="addSlide" class="close-popup">
            <!-- <f7-link @click="addSlide" class="close-popup" v-bind:disabled="!isValid"> -->
                <!-- v-bind:disabled = "!isValid" -->
                <f7-icon f7="check_round" size="35px" color="#c0392b"></f7-icon>
            </f7-link>
        </f7-nav-right>
    </f7-navbar>

    <div form class="slide_title">
        <input type="text" placeholder="Title" v-model="slide.title" />
    </div>
    <img :src="slide.imgData" class="lazy slide-img" id="myImage" style="display: none">
    <div class="control-buttons">
        <f7-list>
            <f7-list-item>
                <f7-button :color="getColorImg" v-on:click="getCamera()">
                    <f7-icon material="camera" size="35px"></f7-icon>
                </f7-button>
                <f7-button :color="getColorImg" v-on:click="openFilePicker()">
                    <f7-icon material="photo_library" size="35px"></f7-icon>
                </f7-button>
                <f7-button :color="getColorRecord" data-picker=".picker-1" class="open-picker" @click="newRecord()">
                    <f7-icon material="mic" size="35px"></f7-icon>
                </f7-button>
            </f7-list-item>
        </f7-list>
    </div>
    <div class="picker-modal picker-1">
        <div class="toolbar">
            <div class="toolbar-inner" style="color: white; padding: 0 20px;">
                <div class="left">New Record</div>
                <div class="right"><a href="#" class="close-picker" style="color: white">Done</a></div>
            </div>
        </div>
        <div class="picker-modal-inner">
          <audio id="player" v-bind:src="recordSrc"></audio>
          <radial-progress-bar :diameter="200"
                               :completed-steps="resValue"
                               :total-steps="totalSteps">
          <f7-button :color="getColorRecord" @click="getRecord()"  v-bind:disabled="recNow">
              <f7-icon material="mic" size="35px"></f7-icon>
          </f7-button>
          <h3>{{ timer.toFixed(1) }}</h3>
           <f7-button :color="getColorRecord" @click="playRecord()" v-if="!isRecord" v-bind:disabled="recNow"> 
              <f7-icon material="play_arrow" size="35px"></f7-icon>
          </f7-button>
            
          </radial-progress-bar>
        </div>
    </div>

</section>

</template>

<script lang="js">
 import mfsService from '../services/mfs.service.js'
 import RadialProgressBar from './v-circle/RadialProgressBar'

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

  export default  {
    name: 'photograb',
    props: ['slide', 'isNewSlide'],
    mounted() {

    },
    components: {
      RadialProgressBar,
    },
    created() {
      this.mediaRec = null;
      this.recTime = 0;
      this.audioSrc = null;
      this.recordSrc = "";
      this.recProcess = 2;

    },
    data() {
      return { 
        // recordProgress,
        sound: {},
        // isNewSlide: true,
        resValue: 0,
        completedSteps: 0,
        totalSteps: 50,
        timer: 5,
        isRecord: true,
        recNow: false,
        my_media: {},
        recordName: "",
        filename: "",
      }
    },
    methods: {
      addSlide() {
        this.$emit('newslide', {slide: this.slide, new: this.isNewSlide});
        this.resValue = 0;
        // let image = document.getElementById('myImage');
        // image.src = "";
        
      },
      clearSlide() {
        this.resValue = 0;
        // let image = document.getElementById('myImage');
        // image.src = "";
      },
      getCamera: function () {
			  navigator.camera.getPicture(this.onSuccessImg, this.captureErrorImg, setOptions(Camera.PictureSourceType.Camera));
		  },
      openFilePicker: function(selection) {

          let srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
          let options = setOptions(srcType);
          let that = this;

          navigator.camera.getPicture((imageUri) => {
             if(this.isNewSlide) {
                this.now = Date.now(); 
                this.filename = "gdapp_" + this.now.toString() + ".jpeg";
                } else {
                  this.filename = this.slide.img; 
                }
                let image = document.getElementById('myImage');
                let src = "data:image/jpeg;base64," + imageUri;
                // image.src = src;
                image.style.display = "block";
                this.slide.img = this.filename;
                this.slide.imgData = src;
                this.saveImage(imageUri);
          }, function cameraError(error) {
              alert("Unable to obtain picture: " + error, "app");
          }, options);
      },
      onSuccessImg: function(imageUri) {
        if(this.isNewSlide) {
          this.now = Date.now(); 
          this.filename = "gdapp_" + this.now.toString() + ".jpeg";
        } else {
          this.filename = this.slide.img; 
        }
        var image = document.getElementById('myImage');
	      // image.src = "data:image/jpeg;base64," + imageUri;
        this.slide.img = this.filename;
        this.slide.imgData = "data:image/jpeg;base64," + imageUri;
        image.style.display = "block";
        this.saveImage(imageUri);
        
      },
      captureErrorImg: function(e) {
        console.log('captureError' ,e);
        console.log(e);
      },
      stratProgress(){
        let that = this;
        that.completedSteps = 0;
        that.recNow = true;
        that.resValue = 0;
        that.timer = 5;
        let mediaTimer = setInterval(() => {
          that.resValue += 1;
          that.timer -= 0.1;
        }, 100);
        setTimeout(function() {
            try {
              // my_media.stopRecord();
              that.isRecord = false;
              that.recNow = false;
              clearInterval(mediaTimer)
              // my_media.release();

            } catch (error) {
              alert(error);
            }
            
        }, 5000);
        
      },
      getRecord() {

        if(this.isNewSlide) {
          this.now = Date.now();
          this.recordName = "gdapp_" + this.now.toString() + ".amr"; 
        } else {
          this.filename = this.slide.record; 
        }  
        this.recordSrc = cordova.file.externalDataDirectory + this.recordName;
        this.completedSteps = 0;
        this.recNow = true;
        this.resValue = 0;
        this.timer = 5;
        let that = this;

        this.my_media = new Media(this.recordSrc, this.onSuccessRecord, this.onErrorRecord, function(status){
          if(status == 2 && that.recNow) {
              that.completedSteps = 0;
              that.resValue = 0;
              that.timer = 5;
              let mediaTimer = setInterval(() => {
                that.resValue += 1;
                that.timer -= 0.1;
              }, 100);
              setTimeout(function() {
                try {
                  that.my_media.stopRecord();
                  that.my_media.release();
                  that.slide.record = that.recordName;   
                  that.isRecord = false;
                  that.recNow = false;
                  clearInterval(mediaTimer);

                } catch (error) {
                  alert(error);
                }
                  
              }, 5000);
            } else if (status == 4) {
              if (!that.recNow) {
                this.my_media.pause();
              }
            }
    
        });
        try {
           this.my_media.startRecord();
        } catch (error) {
          // alert("object");
          alert(error);
        }
      },
      onSuccessRecord(e) {
        this.slide.record = this.recordName;    
      },
      onErrorRecord(e) {
        alert("err");
        alert(JSON.stringify(e));
      },
      playRecord() {
        if (this.recordSrc) {
          this.my_media.play();
        }
      },
      saveImage(imageUri) {
        try {
            let contentType = "image/jpeg";
            let folderpath = 'images'; 
            mfsService.postImg(folderpath, this.filename, imageUri, contentType)
              .then((result) => {
                // alert(JSON.stringify(result));
                if(result.status) {
                  console.log(`photograb success #2`);
                  this.slide.img = this.filename;
                  let src = "data:image/jpeg;base64," + imageUri;
                  this.slide.imgData = src;
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
      }
    },
    computed: {
      getColorImg: function(){
        if (this.slide.img == "") return 'red';
        else return 'green';
      },
      getColorRecord: function(){
        if (this.slide.record == "") return 'red';
        else return 'green';
      },
      validation: function () {
        return {
          title: !!this.slide.title.trim(),
          img: !!this.slide.img.trim(),
          record: !!this.slide.record.trim(),
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
//colors
$black_50: #fddfdd;
$royal_blue: royalblue;
$white: blue;

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
  width: 100%
  min-height: 100px
  max-height: calc(100% - 150px)

.cordova-camera-capture 
  position: fixed !important
  top: 100px

</style>


  // progress
  //   background: #fddfdd
  //   position: fixed
  //   bottom: 0
  //   height: 52px
  //   background: #fddfdd
  //   width: 100%

  // progress[value] 
  //   position: fixed
  //   bottom: 0
  //   appearance: none
  //   border: none
  //   width: 100%
  //   height: 52px
  //   background-color: whiteSmoke
  //   //Instead of the line below you could use @include border-radius($radius, $vertical-radius)
  //   border-radius: 3px
  //   //Instead of the line below you could use @include box-shadow($shadow-1, $shadow-2, $shadow-3, $shadow-4, $shadow-5, $shadow-6, $shadow-7, $shadow-8, $shadow-9, $shadow-10)
  //   box-shadow: 0 2px 3px $black_50 inset
  //   color: $royal_blue
  //   position: relative
  //   margin: 0 0 1.5em

  // progress[value]::-webkit-progress-bar 
  //   background-color: whiteSmoke
  //   //Instead of the line below you could use @include border-radius($radius, $vertical-radius)
  //   border-radius: 3px
  //   //Instead of the line below you could use @include box-shadow($shadow-1, $shadow-2, $shadow-3, $shadow-4, $shadow-5, $shadow-6, $shadow-7, $shadow-8, $shadow-9, $shadow-10)
  //   box-shadow: 0 2px 3px $black_50 inset

  // progress[value]::-webkit-progress-value 
  //   position: relative
  //   background-size: 35px 20px, 100% 100%, 100% 100%
  //   //Instead of the line below you could use @include border-radius($radius, $vertical-radius)
  //   border-radius: 3px
  //   animation: animate-stripes 5s linear infinite
  //   &:after 
  //     content: ''
  //     position: absolute
  //     width: 5px
  //     height: 5px
  //     top: 7px
  //     right: 7px
  //     background-color: $white
  //     //Instead of the line below you could use @include border-radius($radius, $vertical-radius)
  //     border-radius: 100%
    

  // @keyframes animate-stripes 
	// 100% 
	// 	background-position: -100px 0
	

// progress::-webkit-progress-value 

