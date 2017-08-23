<template lang="html">

  <section class="login">
<f7-login-screen id="login-screen">
			<f7-view>
				<f7-pages>
					<f7-page login-screen>
						<f7-login-screen-title>Login</f7-login-screen-title>
						<f7-list form>
							<f7-list-item>
								<f7-label>Username</f7-label>
								<f7-input name="email" placeholder="email" type="text" v-model="user.email"></f7-input>
							</f7-list-item>
							<f7-list-item>
								<f7-label>Password</f7-label>
								<f7-input name="password" type="password" placeholder="Password" v-model="user.password"></f7-input>
							</f7-list-item>
						</f7-list>
						<f7-list>
							<f7-list-item>
								User email: {{ user.email }}
							</f7-list-item>
							<f7-list-item>
								Password: {{user.password}}
							</f7-list-item>
						</f7-list>

						<f7-button v-on:click = "sign()">Sign in</f7-button>
						<f7-list>
							<f7-button  big raised color="red" title="Sign In" close-login-screen>close</f7-button>
							<f7-label>
								<p>Click Sign In to close Login Screen</p>
							</f7-label>
						</f7-list>
					</f7-page>
				</f7-pages>
			</f7-view>
		</f7-login-screen>
  </section>

</template>

<script lang="js">
	import authService from '../services/auth.service.js'
  export default  {
    name: 'login',
    props: [],
    mounted() {

    },
    data() {
      return {
				user: {
					email: '',
					password: '',
				}

      }
    },
    methods: {
			sign: function () {
					if(!this.isAuth) {
						authService.signIn(this.user)
						.then((user) => {
							alert(JSON.stringify(user));

						})
						.catch((err) => {
								alert(err.code);
								alert(err.message);
								authService.createUser(this.user)
								.then((user) => {
									alert(JSON.stringify(user));

								})
								.catch((err) => {
								alert(err.code);
								alert(err.message);
								});
						});


					}
					
			},
				
    },
    computed: {
			isAuth() {
        return authService.isAutentificated();
			}
		},
}
</script>

<style scoped lang="scss">
  .login {

  }
</style>
