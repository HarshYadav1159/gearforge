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

    const response = await axios.post(`${API_BASE_URL}/login`,data)
    //This might return data along with cookie 
    return response.data
}

export async function register(data:RegistrationData){
    const response = await axios.post(`${API_BASE_URL}/register`, data)
    return response.data
}
