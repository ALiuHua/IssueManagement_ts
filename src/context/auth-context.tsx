import { createContext, useContext, useState } from "react";
import * as auth from "auth-provider";
import { AuthUser } from "auth-provider";
import { http } from "utils/http";
import { useMount } from "utils";
interface AuthForm {
  username: string;
  password: string;
}
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};
const AuthContext = createContext<
  | {
      user: AuthUser | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  console.log("auth con===text", user);
  useMount(() => {
    bootstrapUser().then((user) => {
      if (user) {
        setUser(user);
        console.log("setuser runnin", user);
      }
    });
  });
  const login = (form: AuthForm) =>
    // auth.login(form).then((user) => setUser(user));
    //point free
    auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));
  return (
    <AuthContext.Provider
      //   children={children}
      value={{ user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.log(context);
    throw new Error("Make sure only using useAuth hook within AuthProvider");
  }
  return context;
};
