import authApi from "../api/authApi";

const authUtils = {
    // JWTチェック
    isAuthenticated: async () => {
        const token = localStorage.getItem("token");
        
        // ユーザーがJWTを持っていない場合
        if(!token) return false;

        // ユーザーのJWTを検証するApiを叩く
        try {
            const res = await authApi.verifyToken();
            return res.user;
        } catch {
            return false;
        }
    }
}

export default authUtils;
