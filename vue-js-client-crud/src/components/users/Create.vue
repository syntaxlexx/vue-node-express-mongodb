<template>
  <div>
    <vs-card>
      <div slot="header">
        <vs-title back>Add New User</vs-title>
      </div>

      <div v-if="! saved">
        <vs-input
            placeholder="Username"
            v-model="obj.columns.username"
            name="username"
            id="username"
            required
        />
        <br/>

        <vs-input
            placeholder="Email"
            type="email"
            v-model="obj.columns.email"
            name="email"
            id="email"
            required
        />
        <br/>

        <vs-input
            placeholder="Phone"
            type="tel"
            v-model="obj.columns.phone"
            name="phone"
            id="phone"
            required
        />
        <br/>

        <vs-select
            label="Gender"
            v-model="obj.columns.gender"
            icon-pack="mdi"
            icon="mdi-chevron-down"
        >
          <vs-select-item
              v-for="item in obj.systemGenders"
              :key="item"
              :value="item"
              :text="item"
          />
        </vs-select>
        <br/>

        <vs-select
            label="Role"
            v-model="obj.columns.roles"
            icon-pack="mdi"
            icon="mdi-chevron-down"
            icon-multiselect="mdi-check"
            multiple
        >
          <vs-select-item
              v-for="item in obj.systemRoles"
              :key="item"
              :value="item"
              :text="item"
          />
        </vs-select>
        <br/>

        <vs-error :errors="errors"></vs-error>

        <vs-button type="gradient" color="primary" @click="save">Save</vs-button>
      </div>

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
    data() {
      return {
        obj: new User(),
        loading: false,
      };
    },

    computed: {
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