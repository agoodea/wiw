<template>
	<!-- App -->
	<div id="app">
	
		<!-- Statusbar -->
		<f7-statusbar></f7-statusbar>
	
		<!-- Left Panel -->
		<!-- <panel></panel> -->
	
		<!-- Main Views -->
		<f7-views tabs toolbar-fixed :dynamic-navbar="true">
	
			<f7-view id="main-view" main active class="tab">
				<nav-bar v-bind:is-au="isAu" fixed></nav-bar>
				<f7-pages>
					<f7-page v-if="isAu">
						<albums-list v-bind:albums="albums" v-on:getEditAlbum="getEditAlbum" v-on:startSlideShow="startSlideShow"></albums-list>
					</f7-page>
				</f7-pages>
	
			</f7-view>
			<f7-view id="tab2" class="tab">
				<nav-bar v-bind:is-au="isAu" fixed></nav-bar>
				<f7-pages>
					<f7-page v-if="isAu">
						<f7-button big red @click="saveAlbum">save album</f7-button>
					</f7-page>
				</f7-pages>
	
			</f7-view>
			<f7-view id="tab3" class="tab">
				<!-- <nav-bar v-bind:is-au="isAu" fixed></nav-bar> -->
	
				<f7-pages>
					<f7-page v-if="isAu" class="album-container" hide-tabbar-on-scroll>
						<album-form v-on:newalbum="newAlbum" :album="editalbum" :isNewAlbum="isNewAlbum"></album-form>
					</f7-page>
				</f7-pages>
	
			</f7-view>
			<f7-view id="tab4" class="tab">
				<!-- <nav-bar v-bind:is-au="isAu" fixed></nav-bar> -->
				<f7-pages>
					<f7-page v-if="isAu" class="album-container">
						<!-- <slider :editalbum="editalbum"></slider> -->
						this is record view
					</f7-page>
				</f7-pages>
			</f7-view>
	
			<botton-tabs v-if="isAu && !isSlideShow" v-on:clearAlbum="clearAlbum"></botton-tabs>
		</f7-views>
	
		<user-screen></user-screen>
	</div>
</template>

<script>
	import authService from './services/auth.service.js'
	import dataService from './services/data.service'
	import mfsService from './services/mfs.service'
	import UserScreen from './components/user.components/user.component';
	
	// import Slider from './components/slider.component';
	
	import BottomTabs from './components/nav.components/bottom.tabs.component';
	import NavBar from './components/nav.components/navbar.component';
	
	import AlbumsList from './components/album.components/albums.list';
	import AlbumForm from './components/album.components/album.form';
	
	export default {
		computed: {
			isAu() {
				let _isAu = this.$root.user ? true : false;
				return _isAu;
			}
	
		},
		components: {
			'botton-tabs': BottomTabs,
			'albumsList': AlbumsList,
			'user-screen': UserScreen,
			'nav-bar': NavBar,
			'album-form': AlbumForm,
			// 'slider': Slider,
		},
		data() {
			return {
				myPhotoBrowserPage: {},
				currentUser: {},
				indexAlbums: {
					albums: []
				},
				dataJson: {
					is: "sfsdfdds",
				},
				// albums: [],
				albums: [],
				isNewAlbum: false,
				isSlideShow: false,
				editalbum: {
					id: "",
					name: "",
					description: "",
					created: "",
					modified: "",
					slides: [],
				},
				pathImg: "",
				records: [],
				recordSrc: "",
				photos: [],
			};
		},
		created() {
			mfsService.initMfs();
			document.addEventListener("deviceready", this.getMediaData, false);
		},
	
		methods: {
			player(url) {
				var my_media = new Media(url,
					// success callback
					function() {
						console.log("playAudio():Audio Success");
					},
					// error callback
					function(err) {
						console.log("playAudio():Audio Error: " + err);
					}
				);
	
				// Play audio
				my_media.play();
	
				// Pause after 10 seconds
				setTimeout(function() {
					my_media.stop();
					my_media.release();
				}, 5000);
			},
			letsPlay() {
				let evt = new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
					view: window
				});
				let slide = 0;
				let length = this.photos.length;
				this.player(this.records[slide]);
				let slider = setInterval(() => {
					slide++;
					if (slide >= length) {
						clearInterval(slider);
						this.myPhotoBrowserPage.close();
					}
					this.myPhotoBrowserPage.swiper.onClickNext(evt);
					this.player(this.records[slide]);
				}, 5000);
			},
			getEditAlbum(data) {
				this.editalbum = data.album;
				this.isNewAlbum = false;
				this.$f7.showTab("#tab3");
			},
			startSlideShow(data) {
				this.pathImg = cordova.file.externalDataDirectory + "images/";
				this.recordSrc = cordova.file.externalDataDirectory;
				let photos = [];
				if (data.album) {
					data.album.slides.forEach((item) => {
						this.photos.push(this.pathImg + item.img);
						this.records.push(this.recordSrc + item.record);
					});
				}
				this.myPhotoBrowserPage = this.$f7.photoBrowser({
					photos: this.photos,
					duration: 500,
					loop: false,
					onClick: () => {
						this.letsPlay();
					},
					backLinkText: 'Back',
				});
				this.myPhotoBrowserPage.open();
			},
			playRecord() {
	
			},
			clearAlbum() {
				this.editalbum = {
					id: "",
					name: "",
					description: "",
					created: "",
					modified: "",
					slides: [],
				};
				this.isNewAlbum = true;
			},
			newAlbum(data) {
	
				if (this.isNewAlbum) {
					this.albums.push(data.album);
				}
				dataService.saveAlbum(data.album)
					.then((res) => {
	
						this.indexAlbums.albums.push(data.album.fileName);
						dataService.saveIndexAlbums(this.indexAlbums);
					})
					.catch((err) => {
						alert(JSON.stringify(err));
					});
				this.clearAlbum();
	
			},
			saveAlbum(album) {
	
			},
			getMediaData() {
				let indexAlbums = {};
				let albums = [];
				// alert("!!!!!!");
				getSettings()
					.then((settings) => {
						this.$root.settings = settings;
					})
					.catch((error) => {
						alert(`main 6 ${error}`);
					});
				getIndexAlbums()
					.then((indexFile) => {
	
						if (indexFile.albums.length) {
							this.indexAlbums = indexFile;
						}
						getAlbums(indexFile)
							.then((albums_) => {
								this.albums = albums_;
							})
							.catch((error) => {
								alert(`main 4 ${error}`);
							});
					})
					.catch((error) => {
						alert(`main 5 ${error}`);
					});
			},
		}
	}
	let getSettings = function() {
		let fileName = `gd_settings.json`;
		let folderpath = '/data/'
		// alert(fileName);
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
	
	let getIndexAlbums = function() {
		let folderpath = "albums/";
		let filename = "indexalbums.json";
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
			let qx = dataService.getFile(name, folderpath);
			q.push(qx);
		});
		return Promise.all(q)
			.then(albums => {
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
</script>

