import axiosClient from "./axiosClient";

const projectApi = {
    create: () => axiosClient.post("project"), 
    getAll: () => axiosClient.get("project"),
    getOne: (id) => axiosClient.get(`project/${id}`),
    update: (id, params) => axiosClient.put(`project/${id}`, params),
}

export default projectApi;