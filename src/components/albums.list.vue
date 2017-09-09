<template lang="html">

  <section class="albums-list">
    <h1>albums-list Component</h1>
      <f7-list>
				<span v-for="album in albums">
					<f7-list-item>!{{album.fileName}}!</f7-list-item>
				</span>
			</f7-list>
  </section>

</template>

<script lang="js">
  export default  {
    name: 'albums-list',
    props: ['albums'],
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

<style scoped lang="scss">
.albums-list {}
</style>
