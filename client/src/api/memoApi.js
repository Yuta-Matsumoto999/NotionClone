import axiosClient from "./axiosClient";

const memoApi = {
    create: (tagId) => axiosClient.post(`memo/${tagId}`), 
    getAll: () => axiosClient.get("memo"),
    getAllByTagId: (tagId) => axiosClient(`memo/byTag/${tagId}`),
    getOne: (id) => axiosClient.get(`/memo/${id}`),
    update: (id, params) => axiosClient.put(`/memo/${id}`, params),
    delete: (id) => axiosClient.delete(`/memo/${id}`),
}

export default memoApi;