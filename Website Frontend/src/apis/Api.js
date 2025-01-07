import axios from "axios";

//creating backend Config!
const Api = axios.create({
    baseURL: "http://localhost:5500",
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data"
    }

})


//register api 
export const registerUserApi = (data) => Api.post("/api/user/create", data)

//login api
export const loginUserApi = (data) => Api.post("/api/user/login", data)


//config for token
const config = {
    headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }

} 