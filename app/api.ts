import axios from "axios";
/*
    Interfaces : LoginData & RegistrationData
        -> Both of them will be referenced in files /auth/page.tsx & /auth/register/page.tsx
        -> Hence they are exported
*/

export interface LoginData{
    email:string
    password:string
}

export interface RegistrationData{
    user_id : string
    name:string
    email:string
    password:string
    user_name: string
}

const API_BASE_URL = "http://localhost:8080"

export async function login(data:LoginData){

    const response = await axios.post(`${API_BASE_URL}/login`,data, {
       //Set this otherwise cookies won't be retrieved or send
        withCredentials:true
    })
    return response.data
}

export async function register(data:RegistrationData){
    const response = await axios.post(`${API_BASE_URL}/register`, data)
    return response.data
}

export async function autoLogin(){
    const response = await axios.get(`${API_BASE_URL}/me`, {
        withCredentials:true
    })
    return response.data
}

export async function refreshToken() {
    console.log("Refresh Token triggered")
    const response = await axios.post(`${API_BASE_URL}/refresh`, null, {
        withCredentials:true
    })
    return response.data
}

export async function logout(){
    const response = await axios.post(`${API_BASE_URL}/logout`, null, {
        withCredentials:true
    })
    return response.data
}

export async function getUserData(user_id:string){
    console.log("User id : ", user_id)
    const response = await axios.post(`${API_BASE_URL}/user`, {"user_id":user_id}, {
        withCredentials:true
    })

    return response.data
}