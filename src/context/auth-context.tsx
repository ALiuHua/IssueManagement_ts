import { createContext, useContext, useState } from "react";
import * as auth from "auth-provider";
import { AuthUser } from "auth-provider";
interface AuthForm {
  username: string;
  password: string;
}

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
