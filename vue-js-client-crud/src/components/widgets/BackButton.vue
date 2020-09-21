<template>
  <vs-button
      radius
      color="warning"
      type="border"
      size="small"
      icon-pack="mdi"
      icon="mdi-chevron-left"
      @click="goBack()"
  ></vs-button>
</template>

<script>
  export default {
    name: "BackButton",

    props: {
      routeName: {
        type: String,
        default: null
      }
    },

    methods: {
      goBack() {
        if(this.routeName) {
          return this.$router.push({name: this.routeName})
        }

        this.$router.back()
      }
    },
  }
</script>

<style scoped>

</style>