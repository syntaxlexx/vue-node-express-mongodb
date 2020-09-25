<template>
  <div id="app">
    <Flash :details="{}" />

    <div>
      <router-view />
    </div>

  </div>
</template>

<script>
  import Flash from '@/components/widgets/Flash'
  import { logout } from "@/utils/Customs";

  export default {
    name: 'App',

    components: {
      Flash,
    },

    data() {
      return {
        active: 0,
      }
    },

    created() {
      Event.listen('APP_LOGOUT', component => {
        logout()

        this.$router.push('/login')
      })
    }
  }
</script>

<style>

</style>
