import React, { useState, useEffect } from "react";
import { cleanObject, useMount, useDebounce } from "utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useHttp } from "utils/http";

export const ProjectListScreen: React.FC = () => {
  const [param, setParam] = useState({ name: "", personId: "" });
  //这里list users没有定义应该是不对的
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debouncedParam = useDebounce(param, 200);

  const client = useHttp();
  useEffect(() => {
    console.log("running");
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
    // console.log("run");
    // fetch(
    //   `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    // ).then(async (response) => {
    //   if (response.ok) {
    //     setList(await response.json());
    //   }
    // });
  }, [debouncedParam, client]);

  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
