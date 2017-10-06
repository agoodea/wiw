<template lang="html">
  <section class="albums-list">
    <f7-list>
      <span v-for="album in albums">
    					<f7-list-item>
                <album-card v-bind:album="album" v-on:getEditAlbum = "getEditAlbum" v-on:startSlideShow="startSlideShow"></album-card>
    
              </f7-list-item>
    				</span>
    </f7-list>
    <!-- <div class="popup popup-video">
      <div class="content-block">
        <p>About</p>
        <audio ref="audioTag" v-bind:src="file1" controls="controls"></audio>
        <a href="" v-on:click="play();return false;">Play</a>
        <p><a href="#" class="close-popup">Close popup</a></p>
        <iframe src="https://www.youtube.com/embed/2Qx7-KwtbMI" frameborder="0" allowfullscreen></iframe>
      </div>
    </div> -->
  
  </section>
</template>

<script lang="js">
  import wav from '../../assets/data/1.wav';
  import AlbumCard from './album.card';
  
  export default {
    name: 'albums-list',
    props: ['albums'],
    mounted() {
  
    },
    components: {
      'album-card': AlbumCard,
    },
    data() {
      return {
        file1: wav,
      }
    },
    methods: {
      startSlideShow(data) {
        this.$emit('startSlideShow', data);
      },
      getEditAlbum(data) {
        this.$emit('getEditAlbum', data);
      },
      // play() {
      //   console.log("Alert!");
      //   this.$refs.audioTag.play();
      // }
    },
    computed: {
  
    }
  }
</script>

<style scoped lang="scss">
  .albums-list {}
  
  li {
    list-style-type: none;
  }
  
  .list-block {
    margin: 16px 0;
  }
</style>
