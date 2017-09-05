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
								<!-- <f7-button big red @click="getAlbum">get album</f7-button> -->
								{{dataJson}}
								<f7-list>
									<span v-for="album in albums">
										<f7-list-item title="album.name">!{{album.name}}!</f7-list-item>
									</span>
								</f7-list>
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
						<f7-list class="bottom">

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
			indexAlbums: {},
			dataJson: {
				is: "sfsdfdds",
			},
			// albums: [],
			albums: [],
		};
	},
	created() {

		// getIndexAlbums(filename, folderpath);
		// document.addEventListener("deviceready", getIndexAlbums, false);
		document.addEventListener("deviceready", this.getMediaData, false);
		this.albums = [{
			"id": "01",
			"name": "1",
			"fileName": "happyday.json",
			"created": "01.04.2017"
		},
		{
			"id": "02",
			"name": "2",
			"fileName": "wow.json",
			"created": "03.02.2017"
		}
		];
		//get albums
	},

	methods: {
		saveAlbum() {
			let _album = true;
			dataService.saveAlbum(_album);
		},
		getMediaData() {
			let indexAlbums = {};
			let albums = [];
			getIndexAlbums()
				.then((indexFile) => {
					this.albums = indexFile.albums;
					getAlbums(indexFile)
						.then((albums) => {
							alert('albums');

						})
						.catch((error) => {
							alert(`main 4 ${error}`);
						});
				})
				.catch((error) => {
					alert(`main 5 ${error}`);
				});
		}
		// getAlbum() {
		// 	alert("getAlbum");
		// 	let folderpath = "/albums/";
		// 	let filename = "album.json";
		// 	getAlbumFile(filename, folderpath)
		// 		.then((data) => {
		// 			this.indexAlbums = data;
		// 		})
		// 		.catch((err) => {
		// 			if (err) {
		// 				alert(err);
		// 			}
		// 		});
		// }
	}
}
let getIndexAlbums = function() {
	let folderpath = "albums/";
	let filename = "indexalbum.json";
	return new Promise((resolve, reject) => {
		dataService.getFile(filename, folderpath)
			.then((file) => {
				let file_ = file;
				resolve(file);
			})
			.catch((error) => {
				if (error.message) {
					alert(`main 1 ${error.message}`);
				}
				reject(error);
			});
	});
}

let getAlbums = function(indexFile) {
	let folderpath = "albums/";
	let names = [];
	let q = [];
	if (indexFile) {
		names = indexFile.albums;
	}
	names.forEach(function(name) {
		let qx = new Promise((resolve, reject) => {
			dataService.getFile(name.fileName, folderpath);
		});

		q.push(qx);
	});
	alert('getAlbums qq');
	return Promise.all(q)
		.then(albums => {
			console.log("Success albums!");
			return albums
		})
		.catch((error) => {
			if (error.message) {
				alert(`main 2 ${error.message}`);
			}
			alert(`main 3 ${error}`);
			throw error;
		});
}

// let getMediaData = function() {

// }

// function getIndexAlbums() {
// 	let folderpath = "/albums/";
// 	let filename = "indexalbum.json";
// 	getAlbumFile(filename, folderpath)
// 		.then((data) => {
// 			this.indexAlbums = data;
// 		})
// 		.catch((err) => {
// 			if (err) {
// 				this.indexAlbums = {}
// 				alert(err);
// 			}
// 		});

// }

// function getAlbumFile(filename, folderpath) {
// 	return dataService.getAlbum(filename, folderpath);
// }

</script>

