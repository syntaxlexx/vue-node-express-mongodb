<template>
  <div>
    <vs-loading :loading="loading"></vs-loading>

    <vs-card>
      <div class="tw-flex tw-justify-between">
        <vs-select
            class=""
            label="Items per Page:"
            v-model="pageSize"
            @change="handlePageSizeChange"
        >
          <vs-select-item
              v-for="size in pageSizes"
              :key="size"
              :value="size"
              :text="size"
          />
        </vs-select>

        <vs-paginator
            v-if="meta"
            :meta="meta"
            @change="handlePageChange"
        ></vs-paginator>

      </div>
    </vs-card>

    <vs-card>
      <div slot="header">
        <div class="tw-flex tw-justify-between">
          <h3>Users</h3>

          <vs-button
              color="info"
              type="filled"
              :to="{name: 'users-create'}"
          >
            Add New
          </vs-button>
        </div>
      </div>

      <div class="tw-flex tw-flex-wrap">
        <div class="tw-w-full tw-flex tw-justify-between tw-items-center">
          <div class="tw-flex">
            <vs-input
                icon="mdi-magnify"
                placeholder="Search"
                v-model="search"
            />

            <vs-button
                radius
                color="primary"
                type="border"
                icon="mdi-magnify"
                @click="page = 1; get();"
            ></vs-button>
          </div>

          <vs-button color="orange" @click="get()">Refresh</vs-button>
        </div>

        <div class="tw-w-full">
          <vs-divider></vs-divider>
        </div>

        <div class="tw-w-full lg:tw-w-1/2">
          <div v-if="loading">Loading...</div>

          <vs-table stripe :data="list">
            <template slot="header">
              <h3>List</h3>
            </template>
            <template slot="thead">
              <vs-th>#</vs-th>
              <vs-th>Username</vs-th>
              <vs-th>Email</vs-th>
              <vs-th>Roles</vs-th>
            </template>
            <template slot-scope="{data}">
              <vs-tr v-for="(item, i) in data" :key="i" >
                <vs-td>
                  {{ i + 1 }}.
                </vs-td>
                <vs-td :data="item.username">
                  <div @click="show(item, i)">{{ item.username }}</div>
                </vs-td>
                <vs-td :data="item.email">
                  <div @click="show(item, i)">{{ item.email }}</div>
                </vs-td>
                <vs-td>
                  <div>{{ item.roles.map(r => r.name.toUpperCase()).join(', ') }}</div>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>

          <vs-button type="gradient" color="danger" @click="removeAll">Remove All</vs-button>
        </div>

        <div class="tw-w-full lg:tw-w-1/2 lg:tw-pl-5">
          <vs-card v-if="selected">
            <div slot="header">
              <h3>{{ selected.username }}</h3>
            </div>
            <div>
              <p>Email: {{ selected.email }}</p>
              <p>Phone: {{ selected.phone }}</p>
              <p>Gender: {{ selected.gender }}</p>
              <p>Roles: {{ selected.roles.map(r => r.name.toUpperCase()).join(', ') }}</p>
            </div>
            <div slot="footer">
              <vs-row vs-justify="flex-end">
                <vs-button type="gradient" color="danger" icon-pack="mdi" icon="mdi-favorite" :to="{name: 'users-show', params: {id: selected.id}}">Edit</vs-button>
              </vs-row>
            </div>
          </vs-card>

          <div v-else>
            <br />
            <vs-alert active="true" color="info">
              Select a User to Show
            </vs-alert>
          </div>
        </div>
      </div>

    </vs-card>

  </div>
</template>

<script>
  import { paginatorMixin } from "@/mixins/paginatorMixin";
  import User from "@/libs/users/User";

  export default {
    name: "users-index",
    title: "Users Mgmt",

    mixins: [
      paginatorMixin,
    ],

    data() {
      return {
        obj: new User(),
        search: "",
        loading: false,
      };
    },

    computed: {
      users() {
        return this.obj.users
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
        if(this.users && this.users.data)
          return this.users.data

        return []
      },

      meta() {
        if(this.users && this.users.meta)
          return this.users.meta

        return null
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
        const params = this.getRequestParams(
            this.search,
            this.page,
            this.pageSize
        );

        this.loading = true
        this.obj.getAll(params)
      },

      handlePageChange(page) {
        this.page = page;
        this.get(page);
      },

      handlePageSizeChange() {
        this.page = 1;
        this.get(this.page);
      },

      refreshList() {
        this.get();
        this.obj.selected = null;
      },

      show(item, index) {
        this.obj.selected = item;
      },

      removeAll() {
        this.loading = true
        this.obj.deleteAll()
      },
    },

    mounted() {
      this.get();
    }
  };
</script>

<style>

</style>