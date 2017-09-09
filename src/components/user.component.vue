<template>
  <f7-login-screen id="login-screen">
    <f7-view navbar-through :dynamic-navbar="true">
      <f7-navbar title="Account" sliding theme="deeporange">
        <f7-nav-right>
          <f7-link class="close-login-screen">

            <f7-icon f7="close_round" size="35px" color="#c0392b"></f7-icon>
          </f7-link>
        </f7-nav-right>
      </f7-navbar>
      <f7-pages>
        <!-- <f7-page no-navbar no-toolbar no-swipeback layout="blue"> -->
        <f7-page layout="blue" v-if="!editProfileMode">
          <!-- Form for email sign in / registration / password reset -->
          <f7-list form id="app-framework-login-screen" inset v-if="!$root.user && ((mode === 'signIn') ||  (mode === 'registration'))">
            <f7-list-item v-if="(mode === 'signIn') || (mode === 'registration')">
              <f7-label>{{text.email}}</f7-label>
              <f7-input type="email" :placeholder="text.email" v-model="email" />
            </f7-list-item>
            <f7-list-item v-if="(mode === 'signIn') || (mode === 'registration')">
              <f7-label>{{text.password}}</f7-label>
              <f7-input type="password" :placeholder="text.password" v-model="password" />
            </f7-list-item>
            <f7-list-item v-if="(mode === 'registration')">
              <f7-label>{{text.password}}</f7-label>
              <f7-input type="password" :placeholder="text.passwordConfirmation" v-model="passwordConfirmation" />
            </f7-list-item>
          </f7-list>

          <!-- Email sign in buttons -->
          <f7-block v-if="mode === 'signIn'">
            <f7-button big raised color="green" fill @click="handleSignIn">{{text.signIn}}</f7-button big>
          </f7-block>

          <!-- Email registration buttons -->
          <f7-block v-if="mode === 'signIn'">
            <f7-button big raised color="green" @click="mode='registration'">{{text.createAccount}}</f7-button big>
          </f7-block>
          <f7-block v-if="mode === 'registration'">
            <f7-button big raised color="green" fill @click="handleRegistration">{{text.handleRegistration}}</f7-button big>
          </f7-block>

          <f7-block v-if="mode === 'signOut'" class="logout">
            <f7-link @click="handleSignOut">
              <f7-icon f7="logout" size="35px" color="deeporange"></f7-icon>
              <!-- <i class="f7-icons" size="44px">logout</i> -->
            </f7-link>
          </f7-block>
          <f7-block v-if="mode === 'signOut'">
            Options
            <div class="card">
              <div class="card-content">
                <!-- <a href="#" data-popup=".popup-about" class="open-popup">Open About Popup </a> -->
                <div class="list-block">
                  <f7-list>                
                      <f7-list-item link="#" title="Profile" data-popup=".popup-profile" class="open-popup"
                         media="<i class='icon f7-icons color-deeporange' style='font-size: 35px;'>person</i>">
                     </f7-list-item>
                  </f7-list>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <div class="list-block">
                  <f7-list>
                    <f7-list-item link="/albums1/" title="Albums" badge="5" badge-color="red" media="<i class='icon f7-icons color-deeporange' style='font-size: 35px;'>film</i>"></f7-list-item>
                    <f7-list-item link="/images/" title="Images" badge="13" badge-color="red" media="<i class='icon f7-icons color-deeporange' style='font-size: 35px;'>images</i>"></f7-list-item>
                    <f7-list-item link="#" class="tab-link" data-tab="#tab3" title="Records" badge="13" badge-color="red" media="<i class='icon f7-icons color-deeporange' style='font-size: 35px;'>albums</i>"></f7-list-item>
                  </f7-list>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <div class="list-block">
                  <f7-list>
                    <f7-list-item link="/settings/" title="Settings" media="<i class='icon f7-icons color-deeporange' style='font-size: 35px;'>settings</i>"></f7-list-item>
                    <f7-list-item link="/profile/" title="Help" media="<i class='icon f7-icons color-deeporange' style='font-size: 35px;'>help</i>"></f7-list-item>
                  </f7-list>
                </div>
              </div>
            </div>

          </f7-block>

        </f7-page>
        <!-- <f7-page v-else>
                  Profile
                  <div class="card">
                      <div class="card-content">
                        <div class="list-block">
                          <f7-list>
                            <f7-list-item @click="editProfileMode = !editProfileMode" title="Profile" badge="5" badge-color="lightblue"
                              media="<i class='icon f7-icons color-deeporange' style='font-size: 35px;'>film</i>"></f7-list-item>
                          </f7-list>
                        </div>
                      </div>
                    </div>
                </f7-page>  -->
      </f7-pages>
    </f7-view>
    <f7-popup tablet-fullscreen class="popup-profile">
      <!-- Popup content goes here -->
       <f7-navbar title="Profile" sliding theme="yellow">
        <f7-nav-right>
          <f7-link class="close-popup">

            <f7-icon f7="close_round" size="35px" color="#c0392b"></f7-icon>
          </f7-link>
        </f7-nav-right>
      </f7-navbar>
      <div class="card">
        <div class="card-content">
          <!-- <div class="list-block">
            <f7-list>
              <f7-list-item class="close-popup">
                <a href="#" class="close-popup">
                  <i class='icon f7-icons color-deeporange' style='font-size: 35px;'>close</i>
                </a>

              </f7-list-item>
            </f7-list>
          </div> -->
        </div>
      </div>
    </f7-popup>
  </f7-login-screen>
</template>
<script lang="js">
  // Define text patterns
  let text = {
    en: {
      titleSignIn: 'Sign in',
      titleSignOut: 'Sign out',
      currentlyDisabled: 'The sign in is currently disabled.',
      email: 'Email',
      password: 'Password',
      passwordConfirmation: 'Confirmation',
      handleRegistration: 'Create account',
      handleReset: 'Reset password',
      signIn: 'Sign in',
      signOut: 'Sign out',
      createAccount: 'Create new account',
      resetPassword: 'Reset your password',
      cancel: 'Back',
      emailSent: 'Email sent',
      checkYourInbox: 'Please check your inbox.',
      signOutDone: 'Sign out done',
      accountCreated: 'Account created',
      error: 'Error!!',
      errorOffline: 'This action is offline not possible.',
      errorNoEmail: 'Please enter your email address.',
      errorNoPassword: 'Please enter a password.',
      errorPasswordsDifferent: 'You entered two different passwords.',
      firebaseErrors: {
        'auth/email-already-in-use': 'The email address is already linked to another account.',
        'auth/invalid-email': 'The email address is invalid.',
        'auth/operation-not-allowed': 'Login is currently disabled.',
        'auth/weak-password': 'The password is not safe enough.',
        'auth/user-not-found': 'No account found for that email address.',
        'auth/user-disabled': 'Your account is deactivated.',
        'auth/wrong-password': 'The password is wrong.'
      }
    },
    de: {
      titleSignIn: 'Anmelden',
      titleSignOut: 'Abmelden',
      currentlyDisabled: 'Die Anmeldung ist zurzeit deaktiviert.',
      email: 'E-Mail',
      password: 'Passwort',
      passwordConfirmation: 'Bestätigung',
      handleRegistration: 'Konto erstellen',
      handleReset: 'Passwort zurücksetzen',
      signIn: 'Anmelden',
      signOut: 'Abmelden',
      createAccount: 'Neues Konto erstellen',
      resetPassword: 'Passwort zurücksetzen',
      cancel: 'Abbrechen',
      emailSent: 'E-Mail verschickt',
      checkYourInbox: 'Bitte schau in deinem Posteingang.',
      signOutDone: 'Abmeldung erfolgreich',
      accountCreated: 'Konto erstellt',
      error: 'Fehler',
      errorOffline: 'Diese Aktion ist offline nicht möglich.',
      errorNoEmail: 'Bitte gib Deine E-Mail-Adresse ein.',
      errorNoPassword: 'Bitte gib ein Passwort ein.',
      errorPasswordsDifferent: 'Du hast zwei unterschiedliche Passwörter eingegeben.',
      firebaseErrors: {
        'auth/email-already-in-use': 'Die E-Mail-Adresse wird bereits verwendet.',
        'auth/invalid-email': 'Die E-Mail-Adresse ist fehlerhaft.',
        'auth/operation-not-allowed': 'Anmelden ist zurzeit nicht möglich.',
        'auth/weak-password': 'Dein Passwort ist nicht sicher genug.',
        'auth/user-not-found': 'Kein Konto mit dieser E-Mail-Adresse gefunden.',
        'auth/user-disabled': 'Dein Konto ist deaktiviert.',
        'auth/wrong-password': 'Das Passwort ist falsch.'
      }
    }
  }
  
  export default  {
    name: 'login-component',
    props: [],
    mounted() {

    },
    data: function () {
      return {
        email: '',
        password: '',
        passwordConfirmation: '',
        mode: '',
        text: {},
        editProfileMode: false,
      }
    },
    created() {
      this.text = text['en'] || text['en']
      this.mode = this.$root.user ? 'signOut' : 'signIn';
    },
    methods: {
      cancel: function () {
        // Reset form
        this.email = ''
        this.password = ''
        this.passwordConfirmation = ''
        this.mode = this.$root.user ? 'signOut' : 'signIn'
        // Navigate back
        let viewId = null
        window.f7.views.map((view, id) => {
          if (view.selector === window.localStorage.requestedView) viewId = id
        })
        window.localStorage.removeItem('requestedView')
        window.localStorage.removeItem('requestedUrl')
      },
      handleSignIn: function () {
        if (navigator.onLine === false) {
          window.f7.alert(this.text.errorOffline, this.text.error)
        } else if (this.email === '') {
          window.f7.alert(this.text.errorNoEmail, this.text.error)
        } else if (this.password === '') {
          window.f7.alert(this.text.errorNoPassword, this.text.error)
        } else {
          // Show loading indicator
          window.f7.showIndicator()
          // Sign in user
          window.firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            // On success
            .then(user => {
              this.handleSignInDone()
            })
            // On error, show alert
            .catch(err => {
               debugger
              // Hide loading indicator
              window.f7.hideIndicator()
              // Shoe error alert
              window.f7.alert(this.text.firebaseErrors[err.code], this.text.error)
              window.f7.alert('#1')
            })
        }
      },
      handleSignInDone: function ()  {
        // Hide loading indicator
        window.f7.hideIndicator()
        // Reset form
        this.email = ''
        this.password = ''
        this.passwordConfirmation = ''
        this.mode = 'signOut'
        // Show requested URL or navigate back
        let viewId = null
        window.f7.views.map((view, id) => {
          if (view.selector === window.localStorage.requestedView) viewId = id
        })
        if (window.localStorage.requestedUrl) {
          let url = window.localStorage.requestedUrl
          setTimeout(() =>{
            window.f7.views.main.router.back({animatePages: false})
            setTimeout(() => {
              window.f7.views.main.router.load({url: url})
            })
          })
        } 
        // Reset local storage
        window.localStorage.removeItem('requestedView')
        window.localStorage.removeItem('requestedUrl')
      },
      handleSignOut: function () {
        window.firebase.auth().signOut()
          .then(() => {
            // Reset form
            this.mode = 'signIn'
            // Navigate back
            let viewId = null
            window.f7.views.map((view, id) => {
              if (view.selector === window.localStorage.requestedView) viewId = id
            })
            // window.f7.views[viewId || 'main'].router.back()
            // Show notification
            window.f7.addNotification({
              title: this.text.signOut,
              message: this.text.signOutDone,
              hold: 3000,
              closeIcon: false
            });
            debugger
           myApp.loginScreen();

          })
      },
      handleRegistration: function () {
        if (navigator.onLine === false) {
          window.f7.alert(this.text.errorOffline, this.text.error)
        } else if (this.email === '') {
          window.f7.alert(this.text.errorNoEmail, this.text.error)
        } else if (this.password === '') {
          window.f7.alert(this.text.errorNoPassword, this.text.error)
        } else if (this.passwordConfirmation !== this.password) {
          window.f7.alert(this.text.errorPasswordsDifferent, this.text.error)
        } else {
          // Show loading indicator
          window.f7.showIndicator()
          // Create new user
          window.firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            // On success, sign in user
            .then(user => {
              // Hide loading indicator
              window.f7.hideIndicator()
              // Show notification
              window.f7.addNotification({
                title: this.text.accountCreated,
                message: this.text.checkYourInbox,
                hold: 3000,
                closeIcon: false
              })
              // Handle sign in
              this.handleSignInDone()
            })
            // On error, show alert
            .catch(err => {
              // Hide loading indicator
              window.f7.hideIndicator()
              // Show error alert
              window.f7.alert(this.text.firebaseErrors[err.code], this.text.error)
            })
        }
      },
      handleReset: function () {
        if (navigator.onLine === false) {
          window.f7.alert(this.text.errorOffline, this.text.error)
        } else if (this.email === '') {
          window.f7.alert(this.text.errorNoEmail, this.text.error)
        } else {
          // Show loading indicator
          window.f7.showIndicator()
          // Send reset link
          window.firebase.auth().sendPasswordResetEmail(this.email)
            .then(user => {
              // Hide loading indicator
              window.f7.hideIndicator()
              // Update mode
              this.mode = 'signIn'
              // On success, show notfication and login screen again
              window.f7.addNotification({
                title: this.text.emailSent,
                message: this.text.checkYourInbox,
                hold: 3000,
                closeIcon: false
              })
              this.mode = 'signIn'
            })
            .catch(err => {
              // Hide loading indicator
              window.f7.hideIndicator()
              // Show error alert
              window.f7.alert(this.text.firebaseErrors[err.code], this.text.error)
            })
        }
      },
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
    //   mode() {
    //     return this.$root.user ? 'signOut' : 'signIn'
		// }

    }
}
</script>

<style scoped lang="sass">
.login-component
.page
  .content-block
  .logout
    position: absolute
    left: calc(50% - 35px)
    bottom: 0
    margin: 20px 0
</style>
