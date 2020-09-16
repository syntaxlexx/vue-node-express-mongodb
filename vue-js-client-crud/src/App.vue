<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link :to="{name: 'home'}" class="navbar-brand" tag="a">bezKoder</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="{name: 'tutorials-index'}" class="nav-link" tag="a">Tutorials</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'users-index'}" class="nav-link" tag="a">Users</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'roles-index'}" class="nav-link" tag="a">Roles</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>

  </div>
</template>

<script>

  export default {
    name: 'App',
    components: {
      
    }
  }
</script>

<style>

</style>
