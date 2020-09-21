<template>
  <div>
    <vs-loading :loading="loading"></vs-loading>

    <vs-card>
      <div slot="header">
        <vs-title back>
          Roles

          <template #right>
            <vs-button color="blue" @click="get()">Refresh</vs-button>
          </template>
        </vs-title>
      </div>

      <vs-table stripe :data="list">
        <template slot-scope="{data}">
          <vs-tr v-for="(item, i) in data" :key="i" >
            <vs-td>
              {{ i + 1 }}.
            </vs-td>
            <vs-td :data="item.name">
              <div>{{ item.name }}</div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>

      <div slot="footer">
        <vs-button type="gradient" color="danger" @click="removeAll">Remove All</vs-button>
      </div>
    </vs-card>

  </div>
</template>

<script>
  import { paginatorMixin } from "@/mixins/paginatorMixin";
  import Role from "@/libs/roles/Role";

  export default {
    name: "roles-index",

    mixins: [
      paginatorMixin,
    ],

    data() {
      return {
        obj: new Role(),
        loading: false,
      }
    },

    computed: {
      roles() {
        return this.obj.roles
      },

      selected() {
        return this.obj.selected
      },

      saved() {
        return this.obj.saved
      },

      deleted() {
        return this.obj.deleted
      },

      list() {
        if(this.roles && this.roles.data)
          return this.roles.data

        return []
      },

      submitted() {
        return this.obj.form.submitted
      },

      contaminated() {
        return this.obj.form.errorDetected
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
        if(val)
          this.get()
      },

      deleted(val) {
        if(val)
          this.get()
      },
    },

    methods: {
      get() {
        this.loading = true
        this.obj.getAll()
      },

      refreshList() {
        this.get();
        this.obj.selected = null;
      },

      removeAll() {
        this.loading = true
        this.obj.deleteAll()
      },
    },

    mounted() {
      this.get();
    }
  }
</script>

<style>

</style>