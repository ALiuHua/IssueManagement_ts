import { createContext, useContext, useState } from "react";
import * as auth from "auth-provider";
import { AuthUser } from "auth-provider";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { useQueryClient } from "react-query";
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
  // const [user, setUser] = useState<AuthUser | null>(null);
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<AuthUser | null>();

  const queryClient = useQueryClient();
  useMount(() => {
    run(bootstrapUser());
  });
  if (isIdle || isLoading) return <FullPageLoading />;
  if (isError) return <FullPageErrorFallback error={error} />;
  const login = (form: AuthForm) =>
    // auth.login(form).then((user) => setUser(user));
    //point free
    auth.login(form).then(setUser);

  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      queryClient.clear();
    });
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
