import React, { useState, useEffect } from "react";
import { cleanObject, useMount, useDebounce } from "utils";
import * as qs from "qs";
import { List } from "./list";
import { SearchPanel } from "./search-panel";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen: React.FC = () => {
  const [param, setParam] = useState({ name: "", personId: "" });
  //这里list users没有定义应该是不对的
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debouncedParam = useDebounce(param, 200);
  useEffect(() => {
    console.log("run");
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedParam]);

  useMount(() => {
    console.log("running");
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });
  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
