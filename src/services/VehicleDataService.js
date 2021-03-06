import http from "../http-common";

class VehicleDataService {
    getAll() {
        return http.get("/vehicles");
    }

    get(id) {
        return http.get(`/vehicles/${id}`);
    }

    create(data) {
        return http.post("/vehicles", data);
    }

    update(id, data) {
        return http.put(`/vehicles/${id}`, data);
    }

    delete(id) {
        return http.delete(`/vehicles/${id}`);
    }

    deleteAll() {
        return http.delete(`/vehicles`);
    }

    findByModel(model) {
        return http.get(`/vehicles?model=${model}`);
    }
}

export default new VehicleDataService();
