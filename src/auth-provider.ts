import { User } from "types/user";
const apiUrl = process.env.REACT_APP_API_URL;
export interface AuthUser extends User {
  token: string;
}
const localStorageKey = "__auth_provider_token__";
export const getToken = () => localStorage.getItem(localStorageKey);
export const handleUserResponse = ({ user }: { user: AuthUser }) => {
  localStorage.setItem(localStorageKey, user.token || "");
  return user;
};
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
      //throw new error will avoid return undefined
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (response: Response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
      //throw new error will avoid return undefined
    }
  });
};

export const logout = async () => localStorage.removeItem(localStorageKey);
