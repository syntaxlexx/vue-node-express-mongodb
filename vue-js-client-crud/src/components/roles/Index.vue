<template>
  <div>
    Roles

    <ul class="list-group">
      <li class="list-group-item"
        :class="{ active: index == currentIndex }"
        v-for="(item, index) in list"
        :key="index"
        @click="setActiveItem(item, index)"
      >
        {{ item.name }}
      </li>
    </ul>

    <button class="m-3 btn btn-sm btn-danger" @click="removeAllItems">
      Remove All
    </button>
    
  </div>
</template>

<script>
  // import RoleDataService from "@/services/RoleDataService";

  export default {
    name: "roles-index",
    data() {
      return {
        list: [],
        currentItem: null,
        currentIndex: -1,
      }
    },

    methods: {
      initialise() {
        // RoleDataService.getAll()
        //   .then((response) => {
        //     const { data } = response.data;
        //     this.list = data;
        //   })
        //   .catch((e) => {
        //     console.log(e);
        //   });
      },

      refreshList() {
        this.initialise();
        this.currentItem = null;
        this.currentIndex = -1;
      },

      setActiveItem(item, index) {
        this.currentItem = item;
        this.currentIndex = index;
      },

      removeAllItems() {
        // RoleDataService.deleteAll()
        //   .then(response => {
        //     this.refreshList();
        //   })
        //   .catch(e => {
        //     console.log(e);
        //   });
      },
    },

    mounted() {
      this.initialise();
    }
  }
</script>

<style>

</style>