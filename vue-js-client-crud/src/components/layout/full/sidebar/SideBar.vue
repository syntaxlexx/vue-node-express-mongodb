<template lang="html">
  <div id="parentx">
    <vs-sidebar
        :static-position="staticPosition"
        default-index="1"
        :parent="parent"
        :hiddenBackground="doNotClose"
        color="primary"
        class="sidebarx"
        spacer
        v-model="isSidebarActive"
        :click-not-close="doNotClose"
    >
      <div class="header-sidebar text-center" slot="header">
          <vs-avatar size="70px" src="https://randomuser.me/api/portraits/men/85.jpg"/>
          <h4>Lexx YungCarter<br/>
            <small>lexxyungcarter@gmail.com</small>
          </h4>
      </div>
      <template v-for="(sidebarLink, index) in sidebarLinks" >
          <vs-sidebar-item 
            :icon="sidebarLink.icon" 
            :to="sidebarLink.url"
            :key="`sidebarLink-${index}`" 
            :index="index"
            @click="handleClicked(sidebarLink)"
          >
            <span class="hide-in-minisidebar">{{ sidebarLink.name }}</span>
          </vs-sidebar-item>
      </template>

      <vs-sidebar-item
          icon="mdi-logout"
          @click="logout()"
      >
        <span class="hide-in-minisidebar">Logout</span>
      </vs-sidebar-item>
    
      <div class="footer-sidebar" slot="footer">
          <vs-button icon="mdi-github" icon-pack="mdi" color="danger" type="flat" href="https://github.com/lexxyungcarter/vue-node-express-mongodb">Github</vs-button>
      </div>

    </vs-sidebar>
  </div>

</template>

<script>
  export default {
    name: "SideBar",
    props: {
      parent: {
          type: String
      },
      sidebarLinks: {
        type: Array,
        required: true,
      },
      staticPosition: {
        type: Boolean,
        default: true,
      },
      index: {
        default: null,
        type: [String, Number]
      }
    },

    data:() => ({
      windowWidth: window.innerWidth,
      doNotClose: false,
    }),

    computed: {
      //This is for mobile trigger
      isSidebarActive: {
        get() {
          return this.$store.state.isSidebarActive
        },
        set(val) {
          this.$store.commit('IS_SIDEBAR_ACTIVE', val)
        }
      }
    },

    watch: {
        
    },

    methods: {
      handleWindowResize(event) {
        this.windowWidth = event.currentTarget.innerWidth;
        this.setSidebar();
      },
      setSidebar() {
        if (this.windowWidth < 1170) {
          this.$store.commit('IS_SIDEBAR_ACTIVE', false);
          this.doNotClose= false
        } 
        else {
          this.$store.commit('IS_SIDEBAR_ACTIVE', true);
          this.doNotClose= true 
        }
      },
      handleClicked(sidebarLink) {
        if(! this.doNotClose) {
          this.$store.commit('IS_SIDEBAR_ACTIVE', false);
          this.doNotClose= false
        }
      },

      logout() {
        Event.fire('APP_LOGOUT', 'sidebar')
      }
    },

    mounted() {
      this.$nextTick(() => {
        window.addEventListener('resize', this.handleWindowResize);
      });
      this.setSidebar();
    },

    beforeDestroy() {
      window.removeEventListener('resize', this.handleWindowResize);
      this.setSidebar();
    }
  }
</script>