<template>
	<div class="main-wrapper">
		<!---Navigation-->
		 <Navbar :topbarColor="topbarColor" :logo="require('@/assets/images/logo/logo-light-icon.png')" :title="logotitle" />
		<!---Sidebar-->
		 <SideBar parent=".main-wrapper" :sidebarLinks="sidebarLinks" :static-position="staticPosition"/>
		<!---Page Container-->
		<div class="main-container-fluid">

      <div>
        <router-view></router-view>
      </div>

		</div>	
	</div>
</template>

<script>
	
	import Navbar from './header/Navbar.vue';
	import SideBar from './sidebar/SideBar.vue';
	import sidebarLinks from './sidebar/sidebarlinks.js';

	export default {
		name: "MainContainer",
		components: {
      Navbar,
      SideBar
		},

		data:() => ({
			topbarColor: "#2962ff",
			logotitle: "Vuesax - LY",
			sidebarLinks: sidebarLinks,
      staticPosition: false,
		}),

		methods: {
			
		},
	}  	
</script>