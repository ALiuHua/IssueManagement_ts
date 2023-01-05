export {};
/*

import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "store/index";
import { Project } from "screens/project-list/list";

interface State {
  projects: Project[];
}

const initialState: State = { projects: [] };

export const projectsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setProjects(state, action) {
      state.projects = action.payload;
    },
  },
});

const { setProjects } = projectsSlice.actions;

//redux-thunk
export const refreshProjects = (param: any) => (dispatch: AppDispatch) =>
  fetchProjects(param).then((projects) => dispatch(setProjects(projects)));

*/
