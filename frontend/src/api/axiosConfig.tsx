import axios from "axios";
import { getAccessToken, getRefreshToken, logout } from "./authApi";

const api = axios.create({
    baseURL: "http://localhost:8000/auth-api/",
    withCredentials: true // Allows cookies/headers
})
// Add access token to headers
api.interceptors.request.use((config)=>{
    const token = getAccessToken();
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error)=>{
    return Promise.reject(error)
})


api.interceptors.response.use(
    (response) => response, async (error)=>{
        const originalRequest = error.config;

        if (error.responde?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true
            
            try{
                const refreshToken = getRefreshToken()
                const {data} = await axios.post("http://localhost/auth-api/token/refresh/",{refresh: refreshToken,})
                localStorage.setItem('accessToken', data.access)
                originalRequest.headers.Authorization = `Bearer ${data.access}`;
                return api(originalRequest)
            }catch(refreshError){
                console.error("Refresh failed", refreshError)
                logout()
                throw refreshError
            }
        }
        return Promise.reject(error)
    }
)

export default api