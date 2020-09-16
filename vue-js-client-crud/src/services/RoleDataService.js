import http from "../http-common";
const routePrefix = 'roles'

class RoleDataService {
  getAll() {
    return http.get(`/${routePrefix}`);
  }

  get(id) {
    return http.get(`/${routePrefix}/${id}`);
  }

  create(data) {
    return http.post(`/${routePrefix}`, data);
  }

  update(id, data) {
    return http.put(`/${routePrefix}/${id}`, data);
  }

  delete(id) {
    return http.delete(`/${routePrefix}/${id}`);
  }

  deleteAll() {
    return http.delete(`/${routePrefix}`);
  }
}

export default new RoleDataService();
