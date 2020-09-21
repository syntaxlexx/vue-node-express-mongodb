/**
 * Get pagination 
 * 
 * @param {*} page 
 * @param {*} size 
 */
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPaginationOptions = (page, size) => {
  return {
    page: page,
    limit: size,
  };
};

/**
 * Return data with pagination data
 *
 * @param data
 * @param limit
 * @returns {{data: (string|[*]), meta: {per_page: *, total: string, last_page: string, from: (number|string|Number), to: number, current_page: number}}}
 */
const returnPaginated = (data) => {
  return {
    meta: {
      total: data.totalDocs,
      per_page: data.limit,
      current_page: data.page,
      last_page: data.totalPages,
      from: data.page,
      to: data.docs.length,
      prev_page: data.prevPage,
      next_page: data.nextPage,
      has_prev_page: data.hasPrevPage,
      has_next_page: data.hasNextPage,
    },
    data: data.docs,
  }
}

module.exports = {
  getPagination,
  getPaginationOptions,
  returnPaginated,
};