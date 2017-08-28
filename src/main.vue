<template>
	<!-- App -->
	<div id="app">

		<!-- Statusbar -->
		<f7-statusbar></f7-statusbar>

		<!-- Left Panel -->
		<panel></panel>

		<!-- Main Views -->
		<f7-views>
			<f7-view id="main-view" navbar-through :dynamic-navbar="true" main v-if="isAu">
				<!-- Navbar -->
				<f7-navbar>
					<!-- <f7-nav-left>
							<f7-link icon="icon-bars" open-panel="left"></f7-link>
						</f7-nav-left> -->
					<f7-nav-center sliding>Who is who?</f7-nav-center>
					<f7-nav-right>
						<f7-link icon="icon-bars" open-panel="right"></f7-link>
					</f7-nav-right>

				</f7-navbar>
				<botton-tabs></botton-tabs>
			
				
				<!-- <f7-navbar> -->
				<!-- Pages -->
				<f7-pages>
					<f7-page v-if="isAu">
						
						<f7-tabs>
							<f7-tab id="tab1" active>Tab 1 content...</f7-tab>
							<f7-tab id="tab2">
								<f7-button big red @click="saveAlbum">save album</f7-button>
								<f7-button big red @click="getAlbum">get album</f7-button>
								{{dataJson}}

								<!-- {{ currenUser}} -->
							</f7-tab>
							<f7-tab id="tab3">
								<photograb></photograb>
							</f7-tab>
						</f7-tabs>

					</f7-page>
				</f7-pages>
				
			</f7-view>
			<f7-view id="login-view" v-if="!isAu">
				<f7-pages>
						<f7-page>
							
						<!-- <f7-list> -->
							<h1>Login</h1>
							<f7-list class = "bottom">
            
								<f7-list-item link="/login/" title="login"></f7-list-item>
							</f7-list>
							<!-- <loginscreen></loginscreen> -->
							<!-- <f7-list-item  v-if="true" link="/login/" title="login"></f7-list-item>
							<f7-list-item link="/form/" title="Form" link-view="#main-view"></f7-list-item> -->
							<!-- <f7-list-item link="/dynamic-route/blog/45/post/125/?foo=bar#about" title="Dynamic Route"></f7-list-item> -->
						<!-- </f7-list> -->
				
				  		</f7-page>
					</f7-pages>
			</f7-view>
			<!-- <f7-view id="login-main"> -->
				<!-- <loginscreen></loginscreen> -->
			<!-- </f7-view> -->

		</f7-views>

	</div>
</template>

<script>


// console.log("firebase ", firebase);
import authService from './services/auth.service.js'
import dataService from './services/data.service'
import Panel from './components/panel';
import BottomTabs from './components/bottomTabs';
import Photograb from './components/Photograb';
// import LoginScreen from './components/login';

// alert("this.$root.data");
// alert(this.$root);
export default {
	computed: {
	 	isAu() {
			//  debugger
			 let _isAu = this.$root.user ? true : false;
			 return _isAu; 
			// return authService.isAutentificated();
	 	}

 	},
	components: {
		'panel': Panel,
		'botton-tabs': BottomTabs,
		'photograb': Photograb,
		// 'loginscreen': LoginScreen,
	},
	data() {
		return {
			currentUser: {},
			dataJson: {
				is: "sfsdfdds",
			},
		};
	},
	methods: {
		saveAlbum() {
			let _album = true;
			dataService.saveAlbum(_album);
		},
		getAlbum() {
			dataService.getAlbum()
			.then((data) => {
				this.dataJson = JSON.stringify(data);	
			})
			.catch((err) => {
				alert(err);
			});
		}
	}
}
</script>

