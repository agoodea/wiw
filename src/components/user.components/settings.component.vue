<template lang="html">
  <section class="Settings-component">
    <f7-navbar title="Settings" sliding theme="deeporange">
      <f7-nav-right>
        <f7-link class="close-popup">
  
          <f7-icon f7="close_round" size="35px" color="#c0392b"></f7-icon>
        </f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-list form>
      <f7-list-item>
        <f7-label>Synchronization: </f7-label>
        <f7-input type="switch" @change="onChange" :value="sync"></f7-input>
      </f7-list-item>
    </f7-list>
  </section>
</template>

<script lang="js">
  import dataService from '../../services/data.service'
  import _ from 'lodash'

  export default {
    name: 'Settings-component',
    props: [],
    mounted() {
  
    },
    data() {
      return {
  
      }
    },
    methods: {
      onChange() {
        this.$root.settings.sync = !this.$root.settings.sync;
        alert(JSON.stringify(this.$root.settings));
        this.saveSettingsDebounce();
      },
      saveSettingsDebounce: _.debounce(() => {
          console.log('Save settings no more than 2 seconds.');
          dataService.saveSettings(this.$root.settings);
        }, 2000)
    },
    computed: {
      sync() {
        return this.$root.settings.sync;
      }
  
    }
  }
</script>

<style scoped lang="scss">
  .setting-component {}
</style>
