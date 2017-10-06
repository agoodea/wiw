<template>
  <f7-page no-navbar no-toolbar no-swipeback layout="white">

    <!-- Title -->
    <f7-block style="text-align: center; font-size: 25px;">{{!$root.user ? text.titleSignIn : text.titleSignOut}}</f7-block>

    <!-- Sign in disabled alert -->
    <f7-block inner inset v-if="mode === 'signIn'">{{text.currentlyDisabled}}</f7-block>

    <!-- Form for email sign in / registration / password reset -->
    <f7-list form id="app-framework-login-screen" inset v-if="!$root.user && (mode === 'registration')">
      <f7-list-item v-if="(mode === 'registration')">
        <f7-label>{{text.email}}</f7-label>
        <f7-input type="email" :placeholder="text.email" v-model="email" />
      </f7-list-item>
      <f7-list-item v-if="(mode === 'signIn') || (mode === 'registration')">
        <f7-label>{{text.password}}</f7-label>
        <f7-input type="password" :placeholder="text.password" v-model="password" />
      </f7-list-item>
      <f7-list-item v-if="mode === 'registration'">
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

    <!-- Email reset buttons -->
    <f7-block v-if="mode === 'signIn'">
      <f7-button big raised color="orange" @click="mode='reset'">{{text.resetPassword}}</f7-button big>
    </f7-block>
    <f7-block v-if="mode === 'reset'">
      <f7-button big raised color="orange" fill @click="handleReset">{{text.handleReset}}</f7-button big>
    </f7-block>

    <!-- Logout button -->
    <f7-block v-if="mode === 'signOut'">
      <f7-button big raised color="red" fill @click="handleSignOut">{{text.signOut}}</f7-button big>
    </f7-block>

    <!-- Cancel button -->
    <f7-block>
      <f7-button big raised color="red" @click="cancel" close-login-screen back>{{text.cancel}}</f7-button big>
    </f7-block>

  </f7-page>
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
      cancel: 'Cancel',
      emailSent: 'Email sent',
      checkYourInbox: 'Please check your inbox.',
      signOutDone: 'Sign out done',
      accountCreated: 'Account created',
      error: 'Error',
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
        text: {}
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
        window.f7.views[viewId || 'main'].router.back()
        // Reset local storage
        window.localStorage.removeItem('requestedView')
        window.localStorage.removeItem('requestedUrl')
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

    }
}
</script>

<style scoped lang="scss">
  .login-component {

  }
</style>
