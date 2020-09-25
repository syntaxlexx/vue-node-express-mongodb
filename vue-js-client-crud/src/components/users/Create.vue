<template>
  <div>
    <vs-loading :loading="loading"></vs-loading>

    <vs-card>
      <div slot="header">
        <vs-title back>Add New User</vs-title>
      </div>

      <form v-if="! saved" @submit.prevent="save">
        <div class="tw-flex tw-flex-wrap">
          <div class="tw-w-full md:tw-w-1/2 tw-my-1">
            <vs-input
                label="Username"
                placeholder="johndoe"
                v-model="obj.columns.username"
                name="username"
                id="username"
                required
                :danger="errors.has('username')"
                :danger-text="errors.get('username')"
                val-icon-danger="mdi-alert"
            />
          </div>

          <div class="tw-w-full md:tw-w-1/2 tw-my-1 md:tw-pl-4">
            <vs-input
                label="Email"
                placeholder="johndoe@gmail.com"
                type="email"
                v-model="obj.columns.email"
                name="email"
                id="email"
                required
                :danger="errors.has('email')"
                :danger-text="errors.get('email')"
                val-icon-danger="mdi-alert"
            />
          </div>

          <div class="tw-w-full md:tw-w-1/2 tw-my-1">
            <vs-input
                label-placeholder="Password"
                :type="passwordType"
                v-model="obj.columns.password"
                name="password"
                id="password"
                icon="mdi-eye"
                icon-after
                required
                v-on:icon-click="togglePassword = !togglePassword"
                :danger="errors.has('password')"
                :danger-text="errors.get('password')"
                val-icon-danger="mdi-alert"
            />
          </div>

          <div class="tw-w-full md:tw-w-1/2 tw-my-1 md:tw-pl-4">
            <vs-input
                label-placeholder="Confirm Password"
                :type="passwordType"
                v-model="obj.columns.password_confirmation"
                name="password_confirmation"
                id="password_confirmation"
                icon="mdi-eye"
                icon-after
                required
                :danger="errors.has('password')"
                :danger-text="errors.get('password')"
                val-icon-danger="mdi-alert"
            />
          </div>

          <div class="tw-w-full md:tw-w-1/2 tw-my-1">
            <vs-input
                label="First Name"
                placeholder="John"
                v-model="obj.columns.first_name"
                name="first_name"
                id="first_name"
                required
                :danger="errors.has('first_name')"
                :danger-text="errors.get('first_name')"
                val-icon-danger="mdi-alert"
            />
          </div>
          <div class="tw-w-full md:tw-w-1/2 tw-my-1 md:tw-pl-4">
            <vs-input
                label="Last Name"
                placeholder="Doe"
                v-model="obj.columns.last_name"
                name="last_name"
                id="last_name"
                required
                :danger="errors.has('last_name')"
                :danger-text="errors.get('last_name')"
                val-icon-danger="mdi-alert"
            />
          </div>

          <div class="tw-w-full md:tw-w-1/2 tw-my-1">
            <vs-input
                label-placeholder="Phone"
                type="tel"
                v-model="obj.columns.phone"
                name="phone"
                id="phone"
                required
                :danger="errors.has('phone')"
                :danger-text="errors.get('phone')"
                val-icon-danger="mdi-alert"
            />
          </div>

          <div class="tw-w-full md:tw-w-1/2 tw-my-1 md:tw-pl-4">
            <vs-select
                label="Gender"
                v-model="obj.columns.gender"
                :danger="errors.has('gender')"
                :danger-text="errors.get('gender')"
            >
              <vs-select-item
                  v-for="item in obj.systemGenders"
                  :key="item"
                  :value="item"
                  :text="item"
              />
            </vs-select>
          </div>

          <div class="tw-w-full md:tw-w-1/2 tw-my-1">
            <vs-select
                label="Role"
                v-model="obj.columns.roles"
                multiple
                :danger="errors.has('roles')"
                :danger-text="errors.get('roles')"
            >
              <vs-select-item
                  v-for="item in obj.systemRoles"
                  :key="item"
                  :value="item"
                  :text="item"
              />
            </vs-select>
          </div>

        </div>

        <vs-error :errors="errors"></vs-error>

        <vs-button type="gradient" color="primary" button="submit">Save</vs-button>
      </form>

      <div v-else>
        <h4>You submitted successfully!</h4>

        <vs-button type="gradient" color="success" @click="addNew">Add</vs-button>
      </div>

    </vs-card>

  </div>
</template>

<script>

  import User from "@/libs/users/User";

  export default {
    name: "users-create",
    title: "Add a New User",

    data() {
      return {
        obj: new User(),
        loading: false,
        togglePassword: false,
      };
    },

    computed: {
      passwordType() {
        return this.togglePassword ? 'text' : 'password'
      },
      saved() {
        return this.obj.saved
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
    },

    methods: {
      save() {
        this.loading = true
        this.obj.create()
      },

      addNew() {
        this.obj.reset();
        this.obj.saved = false
      }
    },

    mounted() {
      this.obj.reset();
    }
  };
</script>

<style>

</style>