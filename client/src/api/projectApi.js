import axiosClient from "./axiosClient";

const projectApi = {
    create: () => axiosClient.post("project"), 
    getAll: () => axiosClient.get("project"),
    getOne: (id) => axiosClient.get(`project/${id}`),
}

export default projectApi;