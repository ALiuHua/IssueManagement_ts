import React from "react";

import { Routes, Route, Navigate } from "react-router";
import { Link } from "react-router-dom";
import { EpicScreen } from "screens/epic";
import { KanbanScreen } from "screens/kanban";

export const ProjectScreen = () => {
  console.log("project screen 渲染上、");
  return (
    <div>
      <h1>Project screen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>

      <Routes>
        <Route path="/kanban" element={<KanbanScreen />}></Route>
        <Route path="/epic" element={<EpicScreen />}></Route>
        <Route path="*" element={<Navigate to={"kanban"} replace />} />
      </Routes>
    </div>
  );
};
