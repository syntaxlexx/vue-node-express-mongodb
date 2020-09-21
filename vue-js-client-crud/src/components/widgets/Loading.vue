<template>

</template>

<script>
  export default {
    name: "Loading",

    props: {
      loading: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: 'default', // default, point, radius, corners, border, sound, material
      },
    },

    watch: {
      loading(val) {
        if(val)
          this.$vs.loading()
        else
          this.$vs.loading.close()
      }
    },
  }
</script>

<style scoped>

</style>