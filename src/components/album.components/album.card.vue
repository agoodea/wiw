<template lang="html">
  <section class="album-card"> 
    <div class="card facebook-card">
      <div class="card-header no-border">
        <div class="facebook-name">{{album.name}}</div>
      </div>
      <div class="card-content">
        <div class="card-content-inner">
          <p>{{album.description}}</p>
          <span v-for="slide in fSlides">
                  <img :src="pathImg + slide.img" style="padding: 0px; margin: 0px; display: inline-block; max-width: calc( 100% / 3 ) ">
              </span>
        </div>
      </div>
  
  
      <div class="card-footer no-border">
        <f7-button color=green class="link" @click = "startSlideShow(album)">
        <!-- <f7-button color=green data-popup=".popup-video" class="link open-popup"> -->
          <f7-icon material="play_arrow" size="35px"></f7-icon>
        </f7-button>
        <f7-button color=green class="link" @click="getEditAlbum">
          <f7-icon material="mode_edit" size="25px"></f7-icon>
        </f7-button>
      </div>
    </div>
  </section>
</template>

<script lang="js">
  export default {
    name: 'album-card',
    props: ['album'],
    mounted() {
  
    },
    data() {
      return {}
    },
    methods: {
      startSlideShow(album) {
        this.$emit('startSlideShow', {
          album: this.album
        });
        
      },
      getEditAlbum(data) {
        this.$emit('getEditAlbum', {
          album: this.album
        });
      },
    },
    computed: {
      pathImg() {
        return cordova.file.externalDataDirectory + "images/";
      },
      fSlides() {
        if (this.album.slides.lenght && this.album.slides.lenght > 9) {
          return this.album.slides.slice(0, 9);
        } else {
          return this.album.slides;
        }
      }
    }
  }
</script>

<style scoped lang="css">
  .album-card {
    width: 100%;
  }
  
  .demo-card-header-pic .card-header {
    height: 40vw;
    background-size: cover;
    background-position: center;
  }
</style>
