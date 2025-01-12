import axios from "axios";

    const api = axios.create({
        baseURL: "http://127.0.0.1:800/api-auth/",
    })

    export const fetchHelloMessage = async () => {
        try{
            const response = await api.get("/users/")
            return response.data
        } catch(error){
            console.error("Error fetch data", error)
            throw error
        }
    }