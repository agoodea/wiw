<template lang="html">

  <div class="album-form">
    <f7-list form>
      <f7-list-item>
         <f7-input type="text" placeholder="Name"   v-model="album.name"/>

      </f7-list-item>

      <f7-list-item>
        <f7-input type="textarea" placeholder="description"  v-model="album.description"></f7-input>
      </f7-list-item>
      
    </f7-list>
    <!-- <f7-list> -->
      <div>
      <span v-for="slide in slides">
        <!-- <f7-list-item> -->
          <f7-card :title="slide.title" :content="slide.content" :footer="slide.footer"></f7-card>
        <!-- </f7-list-item> -->
      </span>
      </div>
    <!-- </f7-list> -->
    <div class="control-buttons">
      <p class="buttons-row">
        <a href="#" class="button button-big button-fill  color-green" v-on:click = "save()">Save album</a>
        <a href="#" data-popup=".popup-newslide"  class="button button-big button-fill  color-deeporange open-popup">New slide</a>
      </p>        
    </div>
    <f7-popup tablet-fullscreen class="popup-newslide">
        <!-- Popup content goes here -->

          <photograb  v-on:newslide="newslide"></photograb>
  </f7-popup>

    
</div>



</template>

<script lang="js">
  import lib from '../services/lib.service.js'

  import Photograb from './Photograb';

  export default  {
    name: 'album-form',
    props: [],
    components: {
      	'photograb': Photograb,
    },
    mounted() {

    },
    data() {
      return {
        album: {
          id: "",
          name: "",
          description: "",
          created: "",
          modified: "",
          slides: [],
          records: [],
        },
        slides: [],
        records: [],
        count: 0,

      }
    },
    methods: {
      newslide(result) {
        alert(JSON.stringify(result.slide));
      },
      save() {
        this.album.created = new Date().getTime();
        this.album.modified = new Date().getTime();
        this.album.id = lib.ID();

        this.$emit('newalbum', {album: this.album, new: true});
      },
      createSlide() {
        let id = lib.ID();
        this.count++;
        this.slides.push({
          title: this.count + "_title" +id,
          content: this.count + "_content" +id,
          footer: this.count + "_footer" +id,

        });
        
      }

    },
    computed: {
      // reverseSlides() {
      //   return this.slides.reverse();
      // }
    }
  
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


.navbar
  .center
    margin: 0 auto
  .right
    margin: 0


</style>
