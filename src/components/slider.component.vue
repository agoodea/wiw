<template lang="html">
  <section class="slider-component">
    <f7-navbar sliding theme="red" fixed>
      <f7-nav-left>
        <f7-link class="close-popup" @click="clearSlide">
          <f7-icon f7="close_round" size="35px" color="#c0392b"></f7-icon>
        </f7-link>
      </f7-nav-left>
      <f7-nav-center v-if="isNewSlide">s </f7-nav-center>
      <f7-nav-center v-else>dd</f7-nav-center>
      <f7-nav-right>
        <f7-link @click="letsPlay" class="">
          <f7-icon f7="check_round" size="35px" color="#c0392b"></f7-icon>
        </f7-link>
      </f7-nav-right>
    </f7-navbar>


  </section>
</template>

<script lang="js">
  export default {
    name: 'slider-component',
    props: ['editalbum'],
    mounted() {
  
    },
    data() {
      return {
  
      }
    },
    methods: {
      letsPlay() {
          debugger
        let myPhotoBrowserPage = this.$f7.photoBrowser({
					photos: [
						'http://lorempixel.com/1024/1024/sports/1/',
						'http://lorempixel.com/1024/1024/sports/2/',
						'http://lorempixel.com/1024/1024/sports/3/',
					],
					type: 'popup',
					backLinkText: 'Back'
				});
				myPhotoBrowserPage.open(2);
      }
  
    },
    computed: {
  
    }
  }
</script>

<style scoped lang="scss">
  .slider-component {}
</style>
