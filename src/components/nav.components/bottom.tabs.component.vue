<template lang="html">
<div class="toolbar toolbar-bottom tabbar" hide-tabbar-on-scroll>
  <div class="toolbar-inner">
    <a href="#main-view" class="tab-link active" data-tab="#main-view">
      <!-- <f7-icon if-ios="f7:home" if-material="material:home_fill"></f7-icon> -->
      <i class="f7-icons">home</i>
    </a>
    <a href="#tab2" class="tab-link" data-tab="#tab2">
      <!-- <f7-icon if-material="material:images_fill"></f7-icon> -->
      <i class="f7-icons">images</i>
    </a>
    <a href="#tab3" class="tab-link" data-tab="#tab3" @click="clearData()">
      <!-- <f7-icon if-material="material:add_round_fill"></f7-icon> -->
      <i class="f7-icons">add_round</i>
    </a>
  </div>
</div>
 <!-- <div class="toolbar tabbar">
    <div class="toolbar-inner">
      <a href="#tab1" class="tab-link active"><i class="icon demo-icon-1"></i></a>
      <a href="#tab2" class="tab-link"><i class="icon demo-icon-2"></i></a>
      <a href="#tab3" class="tab-link"><i class="icon demo-icon-3"></i></a>
    </div>
  </div> -->
<!-- 
      <f7-toolbar tabbar labels>
        <f7-link icon="iconfont icon-ios7homeoutline" tab-link="#home" active></f7-link>
        <f7-link icon="iconfont icon-ios7chatbubbleoutline"  tab-link="#contacts"></f7-link>
        <f7-link icon="iconfont icon-ios7gearoutline"  tab-link="#settings"></f7-link>
    </f7-toolbar>
    <f7-tabs>
      <f7-tab id="home" active v-on:click="tabActived('home')">
        <home-view></home-view>  
      </f7-tab>
      <f7-tab id="contacts" v-on:click="tabActived('contacts')">
        <contacts-view></contacts-view>
      </f7-tab>
      <f7-tab id="settings" v-on:click="tabActived('settings')">
        <settings-view></settings-view>
      </f7-tab>
    </f7-tabs> -->
</template>

<script lang="js">
  export default  {
    name: 'BottonTabs',
    props: [],
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {
      clearData() {
        this.$emit('clearAlbum', {});
      },
      tabActived(tab) {
        this.activedTab = tab
      }

    },
    computed: {

    }
}
</script>

<style scoped lang="css">
.bottom-tabs {
  align-items: center;
  justify-content: center;
}
</style>
