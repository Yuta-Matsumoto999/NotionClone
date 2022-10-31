import axiosClient from "./axiosClient";

const projectApi = {
    create: () => axiosClient.post("project"), 
}

export default projectApi;