<template>
  <div>
    <vs-loading :loading="loading"></vs-loading>

    <vs-card>
      <div slot="header">
        <vs-title back>Add New</vs-title>
      </div>

      <div v-if="! saved">
        <vs-input
            class=""
            placeholder="Title"
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

        <vs-error :errors="errors"></vs-error>

        <vs-button type="gradient" color="primary" @click="save">Submit</vs-button>
      </div>

      <div v-else>
        <h4>You submitted successfully!</h4>

        <vs-button type="gradient" color="success" @click="addNew">Add</vs-button>
      </div>

    </vs-card>

  </div>
</template>

<script>
  import Tutorial from "@/libs/tutorials/Tutorial";

  export default {
    name: "tutorials-create",
    title: "Add A Tutorial",

    data() {
      return {
        obj: new Tutorial(),
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