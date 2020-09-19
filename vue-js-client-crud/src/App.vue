<template>
  <div id="app">
     <Flash :details="{}" />

<!--    <vs-navbar v-model="active">-->
<!--      <div slot="title">-->
<!--        <vs-navbar-title>-->
<!--          <router-link :to="{name: 'home'}" class="navbar-brand" tag="a">My App</router-link>-->
<!--        </vs-navbar-title>-->
<!--      </div>-->

<!--      <vs-navbar-item index="0">-->
<!--        <router-link :to="{name: 'tutorials-index'}" tag="a">Tutorials</router-link>-->
<!--      </vs-navbar-item>-->
<!--      <vs-navbar-item index="1">-->
<!--        <router-link :to="{name: 'users-index'}" tag="a">Users</router-link>-->
<!--      </vs-navbar-item>-->
<!--      <vs-navbar-item index="2">-->
<!--        <router-link :to="{name: 'roles-index'}" tag="a">Roles</router-link>-->
<!--      </vs-navbar-item>-->
<!--    </vs-navbar>-->

    <div>
      <router-view />
    </div>

  </div>
</template>

<script>
  import Flash from '@/components/widgets/Flash'

  export default {
    name: 'App',

    components: {
      Flash,
    },

    data() {
      return {
        active: 0,
      }
    }
  }
</script>

<style>

</style>
