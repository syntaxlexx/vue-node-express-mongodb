export const paginatorMixin = {
  data() {
    return {
      page: 1,
      pageSize: 3,
      pageSizes: [3, 6, 9],
    };
  },
  methods: {
    getRequestParams(search, page, pageSize) {
      let params = {};

      if (search) {
        params["search"] = search;
      }

      if (page) {
        params["page"] = page;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },
  },
}