// import React from "react";
// import logo from "./logo.svg";
import "./App.css";
// import { ProjectListScreen } from "screens/project-list";
// import { TsReactTest } from "screens/project-list/zuoye";
import { LoginScreen } from "screens/login";

function App() {
  return (
    <div className="App">
      {/* <ProjectListScreen />
      <TsReactTest /> */}
      <LoginScreen />
    </div>
  );
}

export default App;

/*
GET 获取资源的信息
POST 添加资源
PUT 更新整个资源
PATCH 更新资源的部分信息
DELETE 删除资源'
*/
