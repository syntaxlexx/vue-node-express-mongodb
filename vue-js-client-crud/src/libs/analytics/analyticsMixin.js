/**
 * @author Lexx YungCarter
 * @email lexxyungcarter@gmail.com
 * Github:  https://github.com/lexxyungcarter
 * @modify date 2020-09-24 21:10
 */
import Analytics from "@/libs/analytics/Analytics";
import { paginatorMixin } from "@/mixins/paginatorMixin";
import moment from "moment";

export const analyticsMixin = {
  mixins: [
    paginatorMixin,
  ],

  data() {
    return {
      obj: new Analytics(),
      loading: false,
      decoratorKey: null,
      search: null,
      pageSize: 10,
      pageSizes: [5, 10, 20, 30],
      chartData: {},
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
    }
  },

  computed: {
    info() {
      return this.obj.info
    },

    submitted() {
      return this.obj.form.submitted
    },

    list() {
      if(this.info && this.info.data)
        return this.info.data

      return []
    },

    meta() {
      if(this.info && this.info.meta)
        return this.info.meta

      return null
    },
  },

  watch: {
    submitted(val) {
      if(val)
        this.loading = false
    }
  },

  methods: {
    getPaginatorOptions() {
      return this.getRequestParams(
        this.search,
        this.page,
        this.pageSize
      );
    },

    handlePageChange(page) {
      this.page = page;
      this.get();
    },

    handlePageSizeChange() {
      this.page = 1;
      this.get();
    },

    formatDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },

    formatDateInterval(date) {
      return moment(date).from(new Date())
    },

    get() {
      if(! this.decoratorKey) {
        throw Error("Please provide the decoratorKey tp proceed")
      }

      const params = this.getPaginatorOptions()

      this.loading = true
      this.obj.get(this.decoratorKey, params)
    }
  },

  mounted() {
    this.get()
  }
}