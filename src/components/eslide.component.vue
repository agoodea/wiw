<template lang="html">
  <section class="eslide">
    <f7-navbar sliding theme="red">
      <f7-nav-left>
        <f7-link class="close-popup" @click="clearSlide">
          <f7-icon f7="close_round" size="35px" color="#c0392b"></f7-icon>
        </f7-link>
      </f7-nav-left>
      <f7-nav-center v-if="isNewSlide">New slide </f7-nav-center>
      <f7-nav-center v-else>Edit slide</f7-nav-center>
      <f7-nav-right>
        <f7-link @click="addSlide" class="close-popup">
          <f7-icon f7="check_round" size="35px" color="#c0392b"></f7-icon>
        </f7-link>
      </f7-nav-right>
    </f7-navbar>
  
    <div form class="slide_title">
      <input type="text" placeholder="Title" v-model="slide.title" />
    </div>
    <img :src="img" class="lazy slide-img" id="myImage" style="display: none">
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
        <radial-progress-bar :diameter="200" :completed-steps="resValue" :total-steps="totalSteps">
          <f7-button :color="getColorRecord" @click="getRecord()" v-bind:disabled="recNow">
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
  
  export default {
    name: 'elide',
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
        sound: {},
        resValue: 0,
        completedSteps: 0,
        totalSteps: 50,
        timer: 5,
        isRecord: true,
        recNow: false,
        my_media: {},
        recordName: "",
        filename: "",
        pathImg: "",
        img: "",
      }
    },
    methods: {
      addSlide() {
        this.$emit('newslide', {
          slide: this.slide,
          new: this.isNewSlide
        });
        this.resValue = 0;
        this.img = "";
      },
      clearSlide() {
        this.resValue = 0;
        this.img = "";
      },
      getCamera: function() {
        navigator.camera.getPicture(this.onSuccessImg, this.captureErrorImg, setOptions(Camera.PictureSourceType.Camera));
      },
      openFilePicker: function(selection) {
  
        let srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
        let options = setOptions(srcType);
        let that = this;
  
        navigator.camera.getPicture((imageUri) => {
          this.pathImg = cordova.file.externalDataDirectory + "images/";
          if (this.isNewSlide) {
            this.now = Date.now();
            this.filename = "gdapp_" + this.now.toString() + ".jpeg";
          } else {
            this.filename = this.slide.img;
          }
          let image = document.getElementById('myImage');
          let src = "data:image/jpeg;base64," + imageUri;
          image.style.display = "block";
          this.slide.img = this.filename;
          this.saveImage(imageUri);
  
        }, function cameraError(error) {
          alert("Unable to obtain picture: " + error, "app");
        }, options);
      },
      onSuccessImg: function(imageUri) {
        this.pathImg = cordova.file.externalDataDirectory + "images/";
        if (this.isNewSlide) {
          this.now = Date.now();
          this.filename = "gdapp_" + this.now.toString() + ".jpeg";
        } else {
          this.filename = this.slide.img;
        }
        var image = document.getElementById('myImage');
        this.slide.img = this.filename;
        image.style.display = "block";
        this.saveImage(imageUri);
  
  
      },
      captureErrorImg: function(e) {
        console.log('captureError', e);
        console.log(e);
      },
      stratProgress() {
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
            that.isRecord = false;
            that.recNow = false;
            clearInterval(mediaTimer)
          } catch (error) {
            alert(error);
          }
        }, 5000);
      },
      getRecord() {
        if (this.isNewSlide) {
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
  
        this.my_media = new Media(this.recordSrc, this.onSuccessRecord, this.onErrorRecord, function(status) {
          if (status == 2 && that.recNow) {
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
          this.saveToStorage(this.filename, imageUri);
          mfsService.postImg(folderpath, this.filename, imageUri, contentType)
            .then((result) => {
              if (result.status) {
                console.log(`photograb success #2`);
                this.slide.img = this.filename;
                let src = "data:image/jpeg;base64," + imageUri;
                this.img = src;
              }
            })
            .catch((error) => {
              if (!error.status) {
                console.log(error.message);
              }
            });
        } catch (error) {
          alert(error);
        }
      },
      saveToStorage(filename, data) {
  
        try {
          let metadata = {
            'contentType': "image/jpeg"
          };
          let store = this.$root.store();
          let dataBlob = mfsService.b64toBlob(data, metadata.contentType);
          // alert(JSON.stringify(dataBlob));
  
          // alert(filename);
          //  let contentType = "image/jpeg";
          this.$root.store().child('images/' + filename)
            .put(dataBlob, metadata)
            .then(function(snapshot) {
              // alert('Uploaded', snapshot.totalBytes, 'bytes.');
              // alert(snapshot.metadata);
              let url = snapshot.downloadURL;
              // alert('File available at', url);
              // [START_EXCLUDE]
              // document.getElementById('linkbox').innerHTML = '<a href="' + url + '">Click For File</a>';
              // [END_EXCLUDE]
            }).catch(function(error) {
              // [START onfailure]
              alert('Upload failed:', error);
              // [END onfailure]
            });
        } catch (error) {
          alert(error);
        }
      }
    },
    computed: {
      getColorImg: function() {
        if (this.slide.img == "") return 'red';
        else return 'green';
      },
      getColorRecord: function() {
        if (this.slide.record == "") return 'red';
        else return 'green';
      },
      validation: function() {
        return {
          title: !!this.slide.title.trim(),
          img: !!this.slide.img.trim(),
          record: !!this.slide.record.trim(),
        }
      },
      isValid: function() {
        var validation = this.validation
        return Object.keys(validation).every(function(key) {
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
$black_50: #fddfdd;
$royal_blue: royalblue;
$white: blue;

.eslide
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
