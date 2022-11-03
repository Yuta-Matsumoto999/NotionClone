import axiosClient from "./axiosClient";

const colorApi = {
    getAll: () => axiosClient.get("color"),
}

export default colorApi;