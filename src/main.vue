<template>
	<!-- App -->
	<div id="app">
		
		<!-- Statusbar -->
		<f7-statusbar></f7-statusbar>
		
		<!-- Left Panel -->
		<panel></panel>
		
		<!-- Main Views -->
		<f7-views>
			<f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
				<!-- Navbar -->
				<f7-navbar bottom>
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
					<f7-page>
						<photograb></photograb>
					</f7-page>
				</f7-pages>
			</f7-view>
		</f7-views>
	
	</div>
</template>

<script>
	import Panel from './components/panel';
	import BottomTabs from './components/bottomTabs';
	import Photograb from './components/Photograb';
	export default {
		components: {
    		'panel': Panel,
    		'botton-tabs': BottomTabs,
			'photograb': Photograb,
 		}
	}
</script>
