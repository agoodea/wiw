<template lang="html">


    <f7-panel left reveal layout="dark" panel-cover>
			<f7-view id="left-panel-view" navbar-through :dynamic-navbar="true">
				<f7-navbar  v-if="isAuth" class="panel-navbar">
            <f7-block class="panel-navbar--block">
              <div class="chip">
                <div class="chip-media"><img src="http://lorempixel.com/100/100/people/9/"></div>
                <div class="chip-label">Jane Doe</div>
              </div>
            </f7-block>
            <!-- <f7-block-title>Block Title</f7-block-title> -->
            
        </f7-navbar>
				<f7-pages>
					<f7-page>
            
						<f7-list>
              <f7-list-item title="Item 1" badge="5" badge-color="red"></f7-list-item>
              <f7-list-item title="Item 2" badge="3" badge-color="red"></f7-list-item>
              <f7-list-item title="Items Divider" divider></f7-list-item>
              <f7-list-item title="Item 3"></f7-list-item>
              <f7-list-item link="/about/" title="About" badge="5" badge-color="red"></f7-list-item>
              <f7-list-item link="/contacts/" title="Contacts" badge="3" badge-color="red"></f7-list-item>
            </f7-list>

						<f7-button  v-on:click="logOut()" close-panel class = "logout-bottom"><i class="f7-icons size-50">logout</i></f7-button>
            
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

<style scoped lang="css">
  body.with-panel-left-cover .statusbar-overlay {
    background-color: #333;
  }

  .panel {}
  .panel-navbar{
    background: #c0392b;
    color:white;
  }
  .panel-navbar .panel-navbar--block .chip {
      font-size: 13px;
      font-weight: 400;
      color: white;
      background: #c0392b; 
      display: inline-block;
      height: 32px;
      line-height: 32px;
      border-radius: 16px;
      padding: 0 12px;
      box-sizing: border-box;
      vertical-align: middle;
      display: -webkit-inline-box;
      display: -ms-inline-flexbox;
      display: -webkit-inline-flex;
      display: inline-flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      margin: 2px 0;
  }

  .logout-bottom {
    position: absolute;
    left: calc( 50% - 30px);
    bottom: 30px;
  }
  .logout-bottom i {

    color: #c0392b;
    font-size: 35px; 
    font-weight: bold;
  }
</style>
