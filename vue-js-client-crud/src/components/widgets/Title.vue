<template>
  <div class="tw-w-full tw-flex tw-flex-wrap tw-items-center tw-pl-5 md:tw-pl-0">
    <div class="md:tw-w-auto tw-mb-5" :class="[back !== undefined ? 'tw-w-3/4' : 'tw-w-full']">
      <h3 :class="textClasses">
        <slot></slot>
      </h3>

      <div v-if="subtitle" class="subtitle" :class="subtitleClasses" v-html="subtitle"></div>
    </div>

    <div class="tw-w-1/4 md:tw-w-auto tw-mb-5 tw-pl-4" v-if="back !== undefined">
      <back-button></back-button>
    </div>

    <div class="tw-w-full md:tw-w-auto md:tw-ml-auto tw-pl-4 md:tw-pl-0 tw-mb-4">
      <slot name="right"></slot>
    </div>

  </div>
</template>

<script>
  import BackButton from './BackButton'

  export default {
    name: "Title",

    props: {
      back: {
        default: undefined
      },
      subtitle: {
        type: String,
        default: null,
      },
      white: {
        type: String,
        default: undefined,
      },
      gray: {
        type: String,
        default: undefined,
      },
      truncate: {
        type: Boolean,
        default: undefined,
      },
    },

    components: {
      BackButton
    },

    computed: {
      isDarkModeEnabled() {
        return false
      },

      textClasses() {
        let cls = ''
        this.white !== undefined ? cls += ' tw-text-white' : cls += ' '
        this.gray !== undefined ? cls += ' tw-text-gray-500' : cls += ' '
        this.truncate !== undefined ? cls += ' tw-truncate' : ''

        return cls;
      },

      subtitleClasses() {
        let cls = ''
        this.isDarkModeEnabled ? cls = 'tw-text-gray-200' : cls = 'tw-text-gray-700'
        this.white !== undefined ? cls = ' tw-text-white' : cls += ' '
        return cls;
      }
    }
  }
</script>

<style scoped>

</style>