import api from "./axiosConfig";

const TOKEN_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

type CredentialsProps = {
    username: string, 
    password: string
}


export const login = async (credentials:CredentialsProps)=>{
    try{
        const response = await api.post('login/', credentials);
        const {access, refresh} = response.data.tokens;

        localStorage.setItem(TOKEN_KEY, access);
        localStorage.setItem(REFRESH_KEY, refresh);
       
        window.location.href='home/'

        return response.data;
    }catch(error){
        console.error("Error:", error);
        alert(error)
    }
}

export const fetchProfile = async () =>{
    const response = await api.get("profile/")
    return response.data
}

export const fetchUsers = async () =>{
    const response = await api.get("users/")
    return response.data
}

export const fetchRecoverUser = async () =>{
    const response = await api.get("recover_user/")
    return response.data
}

export const fetchCreateUser = async (userData:{username:string; email?:string; password: string}) =>{
    const response = await api.post("create/", userData)
    return response.data
}

export const fetchUpdateUser = async(userData:{username: string; email?: string; password?: string; is_active: boolean; is_staff?: boolean; is_superuser?: boolean}) =>{
    const response = await api.put("update_user/", userData)
    return response.data
}

export const fetchDetail = async (id: string | undefined) =>{
    const response = await api.get(`detail/${id}/`)
    //if(response.status === 404){return response.status}
    console.log(response.data)
    return response.data
}

export const logout =()=>{
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_KEY)
}

export const getAccessToken =()=> localStorage.getItem(TOKEN_KEY);
export const getRefreshToken =()=> localStorage.getItem(REFRESH_KEY);
export const isAutheticated =()=> !!getAccessToken;