import axios from "axios";
import axiosClient from "./axiosClient";

const tagApi = {
    create: (id, params) => axiosClient.post(`tag/${id}`, params),
    update: (id, params) => axiosClient.put(`tag/${id}`, params)
}

export default tagApi;