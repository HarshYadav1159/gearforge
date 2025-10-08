import axios from "axios";
import { User } from "./models/user_model";
/*
    Interfaces : LoginData & RegistrationData
        -> Both of them will be referenced in files /auth/page.tsx & /auth/register/page.tsx
        -> Hence they are exported
*/

export interface LoginData {
  email: string;
  password: string;
}

export interface RegistrationData {
  user_id: string;
  name: string;
  email: string;
  password: string;
  user_name: string;
}

export interface LoginResponseData {
  status: string;
  data: User;
}

const API_BASE_URL = "http://localhost:8080";

export async function login(data: LoginData): Promise<LoginResponseData> {
  const response = await axios.post(`${API_BASE_URL}/login`, data, {
    //Set this otherwise cookies won't be retrieved or send
    withCredentials: true,
  });
  return response.data;
}

export async function register(data: RegistrationData) {
  const response = await axios.post(`${API_BASE_URL}/register`, data);
  return response.data;
}

export async function autoLogin() {
  const response = await axios.get(`${API_BASE_URL}/me`, {
    withCredentials: true,
  });
  return response.data;
}

export async function refreshToken() {
  console.log("Refresh Token triggered");
  const response = await axios.post(`${API_BASE_URL}/refresh`, null, {
    withCredentials: true,
  });
  return response.data;
}

export async function logout() {
  const response = await axios.post(`${API_BASE_URL}/logout`, null, {
    withCredentials: true,
  });
  return response.data;
}

export async function getUserData(user_id: string) {
  console.log("User id : ", user_id);
  const response = await axios.post(
    `${API_BASE_URL}/user`,
    { user_id: user_id },
    {
      withCredentials: true,
    }
  );

  return response.data;
}

export async function verifyResetLink(token: string) {
  console.log("Reset Token is : ", token);
  const response = await axios.post(
    `${API_BASE_URL}/reset_pwd/verify`,
    { token: token },
    {
      withCredentials: true,
    }
  );
  return response.data;
}

export async function updateUserPassword(user_id: string, password: string) {
  const response = await axios.patch(
    `${API_BASE_URL}/update_pwd`,
    { user_id: user_id, password: password },
    {
      withCredentials: true,
    }
  );

  return response.data;
}

export async function requestPasswordReset(email: string) {
  const response = await axios.post(
    `${API_BASE_URL}/reset_pwd_req`,
    { email: email },
    {
      withCredentials: true,
    }
  );
  return response.data;
}

export async function updateUser(userId: string, username?: string | null, name?: string | null) {
  // Build the payload shape:
  
  // {
  //   "data": { "user_id": "...", "user_name": "...", "name": "..." }
  // }
  
  const data: { user_id: string; user_name?: string; name?: string } = {
    user_id: userId,
  };

  const hasUsername = typeof username === "string" && username.trim().length > 0;
  const hasName = typeof name === "string" && name.trim().length > 0;

  if (hasUsername) data.user_name = username!.trim();
  if (hasName) data.name = name!.trim();

  // Require at least one updatable field
  if (!hasUsername && !hasName) {
    throw new Error("Nothing to update. Provide username and/or name.");
  }

  const res = await axios.patch(
    `${API_BASE_URL}/update_user`,
    { data }, // <-- matches your required payload format
    { withCredentials: true }
  );

  return res.data;
}
