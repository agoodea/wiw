<template lang="html">
  <div class="album-form">
    <f7-navbar sliding theme="red">
      <!-- <f7-nav-left> -->
      <!-- <f7-link class="close-popup" @click="clearAlbum">
    							<f7-icon f7="close_round" size="35px" color="#c0392b"></f7-icon>
    						</f7-link> -->
      <!-- </f7-nav-left> -->
      <f7-nav-left v-if="isNewAlbum"> New album </f7-nav-left>
      <f7-nav-left v-else> Edit album</f7-nav-left>
      <f7-nav-center></f7-nav-center>
      <f7-nav-right>
        <f7-link class="close-popup" v-on:click="save()">
          <f7-icon f7="check_round" size="35px" color="#c0392b"></f7-icon>
        </f7-link>
      </f7-nav-right>
    </f7-navbar>
  
    <f7-list form>
      <f7-list-item>
        <f7-input type="text" placeholder="Name" v-model="album.name" />
      </f7-list-item>
      <f7-list-item>
        <f7-input type="textarea" placeholder="description" v-model="album.description"></f7-input>
      </f7-list-item>
    </f7-list>
    <div>
      <span v-for="slide in album.slides">
                    <div class="card facebook-card">
                      <div class="card-header no-border">
                        <div class="facebook-name">{{slide.title}}</div>
                      </div>
                      <div class="card-content"><img :src="pathImg + slide.img"></div>
                      <div class="card-footer no-border">
                        <f7-button color=green @click="playRecord(slide.record)"><f7-icon material="play_arrow" size="35px"></f7-icon></f7-button>
                        <f7-button color=green @click = "getEditSlide(slide)" data-popup=".popup-newslide"  class="color-deeporange open-popup"><f7-icon material="mode_edit" size="25px"></f7-icon></f7-button>
                      </div>
                    </div>
                </span>
    </div>
    <a href="#" class="floating-button color-deeporange open-popup" data-popup=".popup-newslide" @click="clearEditSlide()">
      <i class="icon icon-plus"></i>
    </a>
    <!-- <div class="control-buttons">
      <p class="buttons-row"> -->
        <!-- <a href="#" class="button button-big button-fill  color-green" v-on:click="save()">Save album</a> -->
        <!-- <a href="#" data-popup=".popup-newslide" class="button button-big button-fill  color-deeporange open-popup" @click="clearEditSlide()">New slide</a>
      </p>
    </div> -->
    <f7-popup tablet-fullscreen class="popup-newslide">
      <elside v-on:newslide="newslide" v-bind:slide="editslide" :isNewSlide="isNewSlide"></elside>
    </f7-popup>
  </div>
</template>

<script lang="js">
  import lib from '../../services/lib.service.js'
  
  import elside from '../eslide.component';
  
  export default {
    name: 'album-form',
    props: ['album', 'isNewAlbum'],
    components: {
      'elside': elside,
    },
    mounted() {
  
    },
    data() {
      return {
        records: [],
        count: 0,
        isNewSlide: true,
        editslide: {
          title: "",
          img: "",
          record: "",
        },
        pathImg: "",
      }
    },
    methods: {
      tempFn() {
        debugger;
      },
      getEditSlide(sl) {
        this.isNewSlide = false;
        this.editslide = sl;
      },
      clearEditSlide() {
        this.isNewSlide = true;
        this.editslide = {
          title: "",
          img: "",
          record: "",
        };
      },
      playRecord(record) {
        let recordSrc = cordova.file.externalDataDirectory + record;
        let my_media = new Media(recordSrc, function() {},
          function() {});
        my_media.play();
  
      },
      newslide(result) {
        this.pathImg = cordova.file.externalDataDirectory + "images/";
        if (result.new)
          this.album.slides.push(result.slide);
      },
      save() {
        if (this.isNewAlbum) {
          this.album.created = new Date().getTime();
          this.album.id = lib.ID();
        }
        this.album.modified = new Date().getTime();
        // this.album.slides = this.slides;
  
        this.$emit('newalbum', {
          album: this.album,
          new: true
        });
        this.$f7.mainView.refreshPage();
        this.$f7.showTab("#main-view");
      },
      createSlide() {
        let id = lib.ID();
        this.count++;
        this.album.slides.push({
          title: this.count + "_title" + id,
          content: this.count + "_content" + id,
          footer: this.count + "_footer" + id,
  
        });
  
      }
  
    },
    computed: {}
  
  }
</script>

<style scoped lang="sass">

.control-buttons
    position: fixed
    bottom: 20px
    width: 100%
    padding: 4px

.item-content 
    box-sizing: border-box
    padding-left: 16px
    min-height: 48px
    display: -webkit-box
    display: -ms-flexbox
    display: -webkit-flex
    display: flex
    -webkit-box-pack: justify
    -ms-flex-pack: justify
    -webkit-justify-content: space-between
    justify-content: space-between
    -webkit-box-align: center
    -ms-flex-align: center
    -webkit-align-items: center
    align-items: center


.inputs-list 
  .item-inner 
    display: block
    margin-bottom: 4px
    padding-bottom: 0

  .label 
    width: 100%
    font-size: 12px

.item-input 
  width: 100%
  -ms-flex: 1
  -webkit-box-flex: 1
  -ms-flex: 0 1 auto
  flex-shrink: 1
  font-size: 0
  position: relative
  margin-bottom: 4px
  min-height: 36px

.item-input 
  width: 100%
  -ms-flex: 1
  -webkit-box-flex: 1
  -webkit-flex-shrink: 1
  -ms-flex: 0 1 auto
  flex-shrink: 

  font-size: 0
  position: relative
  margin-bottom: 4px
  min-height: 36px

.item-input-field
  &:after 
    content: ''
    position: absolute
    left: 0
    bottom: 0
    right: auto
    top: auto
    height: 1px
    width: 100%
    background-color: rgba(0,0,0,.12)
    display: block
    z-index: 15
    -webkit-transform-origin: 50% 100%
    transform-origin: 50% 100%


textarea 
    -webkit-appearance: none
    -moz-appearance: none
    -ms-appearance: none
    appearance: none
    box-sizing: border-box
    border: none
    background: 0 0
    border-radius: 0
    box-shadow: none
    display: block
    padding: 0
    margin: 0
    width: 100%
    height: 36px
    color: #212121
    font-size: 16px
    font-family: inherit



.album-form
.list-block
  padding: 10px
  margin: 0

  .floating-label 
    width: 25%

.floating-button
  bottom: 56px
  position: fixed

.navbar
  .left
    margin: 0 auto
  .center
    margin: 0 auto
  .right
    margin: 0

</style>
