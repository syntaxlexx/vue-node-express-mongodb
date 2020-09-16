<template>
  <div class="list row">
    <div class="col-md-4">
      <router-link :to="{name: 'tutorials-create'}" class="btn btn-primary" tag="a"> Add New </router-link>
    </div>
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" 
          class="form-control" 
          placeholder="Search by title"
          v-model="searchTitle"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="page = 1; retrieveTutorials();"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Tutorials List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in list"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <h4>Tutorial</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentTutorial.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentTutorial.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentTutorial.published ? "Published" : "Pending" }}
        </div>

        <router-link 
          tag="a" 
          class="badge badge-warning" 
          :to="{name: 'tutorials-show', params: {id: currentTutorial.id}}"
        >
          Edit
        </router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
      </div>
    </div>
    <div class="col-md-12">
      <div class="mb-3">
        Items per Page:
        <select v-model="pageSize" @change="handlePageSizeChange($event)">
          <option v-for="size in pageSizes" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>

      <b-pagination
        v-model="page"
        :total-rows="count"
        :per-page="pageSize"
        prev-text="Prev"
        next-text="Next"
        @change="handlePageChange"
        pills
      ></b-pagination>
    </div>
  </div>
</template>

<script>
  import TutorialDataService from "@/services/TutorialDataService";
  import { paginatorMixin } from "@/mixins/paginatorMixin";

  export default {
    name: "tutorials-index",
    mixins: [
      paginatorMixin,
    ],
    data() {
      return {
        list: [],
        currentTutorial: null,
        currentIndex: -1,
        searchTitle: "",
      };
    },
    methods: {
      retrieveTutorials() {
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize
        );

        TutorialDataService.getAll(params)
          .then((response) => {
            const { data, total } = response.data;
            this.list = data;
            this.count = total;
          })
          .catch((e) => {
            console.log(e);
          });
      },

      handlePageChange(value) {
        this.page = value;
        this.retrieveTutorials();
      },

      handlePageSizeChange(event) {
        this.pageSize = event.target.value;
        this.page = 1;
        this.retrieveTutorials();
      },

      refreshList() {
        this.retrieveTutorials();
        this.currentTutorial = null;
        this.currentIndex = -1;
      },

      setActiveTutorial(tutorial, index) {
        this.currentTutorial = tutorial;
        this.currentIndex = index;
      },

      removeAllTutorials() {
        TutorialDataService.deleteAll()
          .then(response => {
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      },
    },
    
    mounted() {
      this.retrieveTutorials();
    }
  };
</script>

<style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
</style>