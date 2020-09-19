<template>
  <div class="tw-flex tw-flex-wrap tw-items-center tw-text-center tw-mt-5" v-if="meta">
    <div :class="[ border ? 'tw-w-full md:tw-w-2/2 lg:tw-w-5/5 tw-py-3' : 'tw-hidden' ]">
      <hr class="fading" />
    </div>

    <div :class="[ showInfo ? 'tw-w-full md:tw-w-1/2 lg:tw-w-2/5' : 'tw-hidden' ]">
      <span v-if="meta.from">Showing {{ meta.from }} to {{ meta.to }} of </span>
      <span>{{ meta.total }} records</span>
      <span v-if="! meta.from"> found</span>
    </div>
    <div :class="[ showInfo ? 'tw-w-full md:tw-w-1/2 lg:tw-w-3/5' : 'tw-w-full' ]">
<!--      :total-visible="totalVisible"-->
      <vs-pagination
          :total="meta.last_page"
          v-model="page"
          icon-pack="mdi"
          prev-icon="mdi-chevron-left"
          next-icon="mdi-chevron-right"
          @change="input"
      ></vs-pagination>

    </div>
  </div>
</template>

<script>
  import { scrollToTop } from '@/utils/Util'

  export default {
    name: "Paginator",
    props: {
      meta: {
        required: true,
      },

      totalVisible: {
        type: Number,
        default: 7,
      },

      border: {
        default: false,
        type: Boolean,
      },

      showInfo: {
        default: true,
        type: Boolean,
      },

      color: {
        type: String,
        default: 'primary'
      }
    },

    data() {
      return {
        page: this.meta.current_page,
      }
    },

    computed: {
      //
    },

    watch: {
      // page(val) {
      //     this.$emit('change', val)
      // },

      meta(val) {
        this.page = val.current_page
      },
    },

    methods: {
      input(page) {
        scrollToTop()
        this.$emit('change', page)
      },
    },

    mounted() {

    }
  }
</script>

<style scoped>

</style>