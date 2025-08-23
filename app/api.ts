import axios from "axios";

interface LoginData{
    email:string
    password:string
}

const API_BASE_URL = "http://localhost:8080"

export async function login(data:LoginData){

    const response = await axios.post(`${API_BASE_URL}/login`,data)
    //This might return data along with cookie 
    return response.data
}

