import axios from "axios";

const BASE_URL = "http://localhost:5050/api/v1";

const getToken = () => {
    localStorage.getItem("token");
}

const axiosClient = axios.create({
    baseURL: BASE_URL
});

// API request時の前処理を行う
axiosClient.interceptors.request.use(async (config) =>  {
    return {
        // configへheaderの情報を追加する。
        ...config,
        headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${getToken()}`,  // request headerにJWTを付けてサーバーに渡す
        },
    };
});

// API Response時の前処理を行う
axiosClient.interceptors.response.use(async (response) => {
    return response;
    }, 
    (err) => {
        throw err.response;
    }
);

export default axiosClient;