<template lang="html">


    <f7-panel left reveal layout="dark">
			<f7-view id="left-panel-view" navbar-through :dynamic-navbar="true">
				<!-- <f7-navbar  v-if="isAuth" title = "this.email"></f7-navbar> -->
				<f7-pages>
					<f7-page>
            <!-- <f7-list>
              {{isAuth}}
							<f7-list-item  v-if="!isAuth" link="/login/" title="login" link-view="#main-view" close-panel></f7-list-item>
							<!-- <f7-list-item link="/form/" title="Form" link-view="#main-view"></f7-list-item> -->
							<!-- <f7-list-item link="/dynamic-route/blog/45/post/125/?foo=bar#about" title="Dynamic Route"></f7-list-item> -->
						</f7-list>
						<!-- <f7-button open-login-screen="#login-screen"  v-if="!isAuth">Login Screen {{data.isAuth}}</f7-button> -->
						<f7-button  v-on:click="logOut()" close-panel bottom>Log Out</f7-button>
            
					</f7-page>
				</f7-pages>
			</f7-view>
		</f7-panel>


</template>

<script lang="js">
import authService from '../services/auth.service.js'
  export default  {
    name: 'panel',
    // props: [
    //   'isAuth'
    // ],
    
    created () {
      this.isAuth = this.$root.user ? true : false;
      
      // if (this.isAuth) 
      //   this.email = this.$root.user.email;
    },
    mounted() {
      // debugger
      // this.$root.$on('is-auth', function (isAuth) {
      //   debugger
      //   this.isAuth = isAuth;
  // ...
      // })
    },
    data: function () {
      return {
        email: '',
        mode: '',
        text: {},
        isAuth: false,
      }
    },
    methods: {
      logOut() { 
         window.firebase.auth().signOut()
          .then(() => {
            // Reset form
            this.isAuth = false;
            // Navigate back
            let viewId = null
            // window.f7.views.map((view, id) => {
            //   if (view.selector === window.localStorage.requestedView) viewId = id
            // })
            // // window.f7.views.leftPanelView.router.back()
            // // Show notification
            
            // window.f7.addNotification({
            //   title: this.text.signOut,
            //   message: this.text.signOutDone,
            //   hold: 3000,
            //   closeIcon: false
            // });
            // debugger
            
            // window.f7.views[viewId || 'main'].router.reloadPage({ignoreCache:true})
            // this.$router.reloadPage();
          })
        } 

    },
    watch: {
		
		},
    computed: {

		}
}
</script>

<style scoped lang="scss">
  .panel {

  }
</style>
