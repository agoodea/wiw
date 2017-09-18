<template lang="html">

  <section class="album-card" >
    <div class="card demo-card-header-pic">
      <div v-bind:style='{ backgroundImage: "url(" + album.cover + ")", }' valign="bottom" 
          class="card-header color-white no-border">{{album.name}}</div>
      <div class="card-content">
      <div class="card-content-inner">
        <p class="color-gray">Created {{album.created}}</p>
        <p>Quisque eget vestibulum nulla...</p>
      </div>
      </div>
   
      <div class="card-footer">
        
        <a href="#" data-popup=".popup-video" class="link open-popup"><f7-icon material="play_arrow" size="35px"></f7-icon></a>
        <a href="#" class="link"><f7-icon material="mode_edit" size="25px"></f7-icon></a>
      </div>
     </div>



    <!-- <div class="card facebook-card"> -->
      <!-- <div class="card-header">
        <div class="facebook-name">{{album.name}}</div>
        <div class="facebook-date">{{album.created}}</div>
      </div> -->
      <!-- <div class="card-content"> -->
        <!-- <div class="facebook-name">{{album.name}}</div> -->
        <!-- <div class="card-content-inner"> -->
          <!-- <p>{{album.fileName}}</p> -->
          <!-- <img v-bind:src = "album.cover" width="100%"> -->
        <!-- </div> -->
      <!-- </div> -->
      <!-- <div class="card-footer">
        <a href="#" class="link">Like</a>
        <a href="#" class="link">Comment</a>
        <a href="#" class="link">Share</a>
      </div> -->
    <!-- </div>    -->
  </section>

</template>

<script lang="js">
  export default  {
    name: 'album-card',
    props: ['album'],
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {

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
