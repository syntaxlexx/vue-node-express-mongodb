<template>
  <div class="tw-flex tw-justify-center tw-items-center">
    <vs-card class="tw-max-w-3xl tw-text-center">
      <div slot="header">
        <h3>Login</h3>
      </div>

      <img src="@/assets/logo.png" class="img-fluid" alt="Logo!" style="max-height: 120px;">

      <div v-if="! authenticated">
        <form class="tw-flex tw-flex-col tw-items-center tw-my-10" @submit.prevent="submit">
          <vs-input
              label-placeholder="Username"
              v-model="obj.columns.username"
              name="username"
              id="username"
              required
          />
          <br/>

          <vs-input
              label-placeholder="Password"
              v-model="obj.columns.password"
              :type="passwordType"
              name="password"
              id="password"
              icon="mdi-eye"
              icon-after
              v-on:icon-click="togglePassword = !togglePassword"
              val-icon-danger="mdi-alert"
              required
          />
          <br/>

          <vs-error :errors="errors"></vs-error>

          <vs-button type="gradient" color="primary" button="submit">Login</vs-button>
        </form>

      </div>

      <div v-else>
        <vs-alert
            :active="true"
            color="success"
            icon="mdi-check"
            class="tw-my-4"
        >
          <div>Successfully Logged In</div>
        </vs-alert>

        <div class="tw-text-center">
          Welcome back, {{ user.username }}.
        </div>
      </div>

    </vs-card>
  </div>
</template>

<script>
  import Auth from "@/libs/auth/Auth";

  export default {
    name: "Login",

    data() {
      return {
        obj: new Auth(),
        loading: false,
        togglePassword: false,
      }
    },

    computed: {
      passwordType() {
        return this.togglePassword ? 'text' : 'password'
      },

      user() {
        return this.obj.user
      },

      authenticated() {
        return this.obj.authenticated
      },

      submitted() {
        return this.obj.form.submitted
      },

      contaminated() {
        return this.obj.form.errorDetected
      },

      errors() {
        return this.obj.form.errors
      }
    },

    watch: {
      contaminated(val) {
        this.loading = false
      },

      submitted(val) {
        if(val)
          this.loading = false
      },

      saved(val) {
        if(val) {
          // handle added
        }
      },

      user(val) {
        if(val) {

        }
      }
    },

    methods: {
      submit() {
        this.loading = true
        this.obj.signin()
      },

      setUser() {
        this.$store.commit('IS_SIDEBAR_ACTIVE', this.user);
      }
    },

    mounted() {
      this.obj.reset();
    }
  }
</script>

<style scoped>

</style>