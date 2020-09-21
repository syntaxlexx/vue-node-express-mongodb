<template>
  <div>
    <vs-alert
        v-if="errors !== undefined && errors.any()"
        :active="true"
        color="danger"
        icon="mdi-alert"
        class="tw-my-4"
    >
      <div v-html="errors.display()"></div>
    </vs-alert>

    <vs-alert
        v-if="show !== undefined"
        :active="true"
        :color="type"
        icon="mdi-alert"
        class="tw-my-4"
    >
      <div><slot></slot></div>
    </vs-alert>

  </div>
</template>

<script>
  export default {
    name: "Error",
    props: {
      errors: {
        type: Object,
        default: undefined,
      },

      show: {
        type: Boolean,
        default: undefined,
      },

      type: {
        type: String,
        default: 'error',
      }
    }
  }
</script>

<style scoped>

</style>