<template lang="html">

  <section class="navbar-component">
    <f7-navbar>
      <f7-nav-center sliding>Who is who?</f7-nav-center>
			<f7-nav-right>
				<f7-link  class = "open-login-screen">
          
					<f7-icon f7="login" size="35px" color="#c0392b" v-if="!isAu"></f7-icon>
					<!-- <f7-icon f7="home" size="35px" color="#c0392b"  v-else></f7-icon> -->
           <f7-block class="panel-navbar--block" v-else>
              <div class="chip">
                
                <div class="chip-label">Jane Doe</div>
                <div class="chip-media"><img src="http://lorempixel.com/100/100/people/9/"></div>
              </div>
            </f7-block>
				</f7-link>
			</f7-nav-right>
		</f7-navbar>
  </section>

</template>

<script lang="js">
  export default  {
    name: 'navbar-component',
    props: ['isAu'],
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

<style scoped lang="sass">
// .navbar-component {}
.chip 
  padding-right: 0

  .chip-label
    margin-right: 20px
</style>
