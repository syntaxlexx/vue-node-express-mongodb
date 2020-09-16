import http from "../http-common";
const routePrefix = 'users'

class UserDataService {
  getAll(params) {
    return http.get(`/${routePrefix}`, { params });
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

  findByUsername(username) {
    return http.get(`/${routePrefix}?username=${username}`);
  }
}

export default new UserDataService();
