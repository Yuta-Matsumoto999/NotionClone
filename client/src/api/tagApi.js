import axiosClient from "./axiosClient";

const tagApi = {
    create: (id, params) => axiosClient.post(`tag/${id}`, params),
}

export default tagApi;