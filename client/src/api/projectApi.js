import axiosClient from "./axiosClient";

const projectApi = {
    create: () => axiosClient.post("project"), 
    getAll: () => axiosClient.get("project"),
}

export default projectApi;