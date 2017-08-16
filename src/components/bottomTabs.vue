<template lang="html">

  <!-- <f7-toolbar bottom scrollable>
    <f7-link>Left Link</f7-link>
    <f7-link>Right Link</f7-link>
</f7-toolbar> -->
<f7-toolbar tabbar bottom labels>
    <f7-link tab-link="#tab1" class="bottom-tabs">Tab 1</f7-link>
  <f7-link tab-link="#tab2" class="bottom-tabs">Tab 2</f7-link>
  <f7-link tab-link="#tab3" class="bottom-tabs">Tab 3</f7-link>

</f7-toolbar>

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
