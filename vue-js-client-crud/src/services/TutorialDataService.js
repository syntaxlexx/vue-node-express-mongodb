import http from "../http-common";
const routePrefix = 'tutorials'

class TutorialDataService {
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

  findByTitle(title) {
    return http.get(`/${routePrefix}?title=${title}`);
  }
}

export default new TutorialDataService();
