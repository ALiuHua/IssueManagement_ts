import React, { useState, useEffect } from "react";
import { cleanObject } from "utils";
import * as qs from "qs";
import { List } from "./list";
import { SearchPanel } from "./search-panel";

const apiUrl = process.env.REACT_APP_API_URL;
//react 如何确定读取哪个env下的值， 当运行npm start的时候会读取env.development  而运行npm build时会读取env下的值
/* ${apiUrl}/projects?name=${param.name}&personId=${param.personId}
如果name=&personId=1 会引起歧义： 可能有两种结果，1.后端会返回name为空值，id为1的数据， 2. 会返回忽略name值，id为1的所有数据
*/

export const ProjectListScreen = () => {
  const [param, setParam] = useState({ name: "", personId: "" });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      }
    );
  }, [param]);
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);
  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
