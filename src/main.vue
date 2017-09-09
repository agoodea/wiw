<template>
	<!-- App -->
	<div id="app">

		<!-- Statusbar -->
		<f7-statusbar></f7-statusbar>

		<!-- Left Panel -->
		<!-- <panel></panel> -->

		<!-- Main Views -->
		<f7-views>
			<f7-view id="main-view" navbar-through :dynamic-navbar="true" main v-if="isAu" active>
				<!-- Navbar -->
				<nav-bar v-bind:is-au="isAu"></nav-bar>	
				<!-- tabs	 -->
				<botton-tabs></botton-tabs>
				<!-- Pages -->
				<f7-pages>
					<f7-page v-if="isAu">
						<f7-tabs>
							<f7-tab id="tab1" active>
								<albums-list v-bind:albums="albums"></albums-list>
							</f7-tab>
							<f7-tab id="tab2">
								<f7-button big red @click="saveAlbum">save album</f7-button>
							</f7-tab>
							<f7-tab id="tab3">
								<photograb></photograb>
							</f7-tab>
						</f7-tabs>
					</f7-page>
				</f7-pages>

			</f7-view>
			<f7-view id="right-view" :dynamic-navbar="true" :animate-pages="false">


			</f7-view>
			<!-- <f7-view id="login-main"> -->
				
			<!-- </f7-view> -->

		</f7-views>
		<user-screen></user-screen>
	</div>
</template>

<script>


// console.log("firebase ", firebase);
import authService from './services/auth.service.js'
import dataService from './services/data.service'
// import Panel from './components/panel';
import UserScreen from './components/user.component';
import BottomTabs from './components/bottomTabs';
import Photograb from './components/Photograb';
import AlbumsList from './components/albums.list';
import NavBar from './components/navbar.component';
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
		// 'panel': Panel,
		'botton-tabs': BottomTabs,
		'photograb': Photograb,
		'albumsList': AlbumsList,
		'user-screen': UserScreen,
		'nav-bar': NavBar,
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


		// document.addEventListener("deviceready", this.getMediaData, false);
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
					if (indexFile.albums.length) {
						this.albums = indexFile.albums;
					}
					getAlbums(indexFile)
						.then((albums_) => {
							alert(albums_.length);
						})
						.catch((error) => {
							alert(`main 4 ${error}`);
						});
				})
				.catch((error) => {
					alert(`main 5 ${error}`);
				});
		}
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

