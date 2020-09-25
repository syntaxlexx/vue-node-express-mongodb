<template>
  <div>
    <vs-loading :loading="loading"></vs-loading>

    <vs-card>
      <div v-if="selected" class="edit-form">
        <div slot="header">
          <vs-title back>Tutorial</vs-title>
        </div>

        <form>
          <vs-input
              class=""
              placeholder="Placeholder"
              v-model="obj.columns.title"
              title="Title"
              name="title"
              id="title"
              required
          />

          <br/>

          <vs-textarea
              v-model="obj.columns.description"
              name="description"
              placeholder="Description"
          />

          <div class="form-group">
            <label><strong>Status:</strong></label>
            {{ obj.columns.published ? "Published" : "Pending" }}
          </div>
        </form>

        <vs-error :errors="errors"></vs-error>

        <vs-button v-if="obj.columns.published" color="warning" @click="updatePublished(false)">UnPublish</vs-button>
        <vs-button v-else color="primary" @click="updatePublished(true)">Publish</vs-button>

        <vs-button color="danger" @click="deleteItem">Delete</vs-button>

        <vs-button color="success" @click="update">Update</vs-button>

        <p>{{ message }}</p>
      </div>

      <div v-else>
        <div slot="header">
          <vs-title back>No Tutorial Selected</vs-title>
        </div>

        <p>Please click on a Tutorial...</p>
      </div>
    </vs-card>
  </div>

</template>

<script>
  import Tutorial from "@/libs/tutorials/Tutorial";

  export default {
    name: "tutorials-show",
    title: "View/Edit Tutorial",

    data() {
      return {
        obj: new Tutorial(),
        loading: false,
        message: ''
      };
    },

    computed: {
      saved() {
        return this.obj.saved
      },

      deleted() {
        return this.obj.deleted
      },

      submitted() {
        return this.obj.form.submitted
      },

      contaminated() {
        return this.obj.form.errorDetected
      },

      errors() {
        return this.obj.form.errors
      },

      selected() {
        return this.obj.selected
      },
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
          this.message = 'The tutorial was updated successfully!';
      },

      deleted(val) {
        if(val)
          this.$router.go(-1) // back
      },
    },

    methods: {
      get(id) {
        this.obj.get(id, true);
      },

      updatePublished(status) {
        this.obj.columns.published = status
        return this.update()
      },

      update() {
        this.loading = true
        this.obj.update(this.selected.id, true)
      },

      deleteItem() {
        this.loading = true
        this.obj.delete(this.selected.id)
      }
    },

    mounted() {
      this.message = '';
      this.get(this.$route.params.id);
    }
  };
</script>

<style>
  .edit-form {
    max-width: 300px;
    margin: auto;
  }
</style>