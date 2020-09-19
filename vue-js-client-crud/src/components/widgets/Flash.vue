<template>

</template>

<script>
  export default {
    name: "Flash",

    props: {
      details: {
        required: true
      },

      color: {
        default: 'success',
        type: String,
      },
    },

    methods: {
      flash(details){
        this.$vs.notify({
          // title: details.title,
          text: details.message,
          color: details.alert,
        })
      },
    },

    created() {
      Event.listen('flash', (details) => {
        // if(! details.title)
        //   details['title'] = "Attention"

        if(! details.message)
          details['message'] = "Attention Required!"

        if(! details.alert)
          details['alert'] = "info"

        if(details['alert'] === 'error')
          details['alert'] = "danger"

        this.flash(details)
      });
    }
  }
</script>

<style scoped>

</style>