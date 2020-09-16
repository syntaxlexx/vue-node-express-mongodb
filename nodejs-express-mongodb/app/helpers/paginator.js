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

module.exports = {
  getPagination,
};