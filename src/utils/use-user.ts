import { useQuery } from "react-query";
import { User } from "types/user";
import { useHttp } from "./http";

export const useUser = (param?: Partial<User>) => {
  const client = useHttp();
  return useQuery<User[]>(["users", param], () =>
    client("users", { data: param })
  );
};
