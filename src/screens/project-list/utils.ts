import { useMemo } from "react";
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";
import { useProject } from "utils/use-projects";

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(() => {
      return {
        ...param,
        personId: Number(param.personId) || undefined,
      };
    }, [param]),
    setParam,
  ] as const;
};

export const useProjectQueryKey = () => {
  const [parmas] = useProjectsSearchParams();
  return ["projects", parmas];
};
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);

  const setUrlParams = useSetUrlSearchParam();

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );
  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => {
    //这里会出现无法得到预期的把两个值都设置为undefined的情况，这是因为在set函数中的 console.log({ ...Object.fromEntries(searchParams) });
    //得到的都是最初的原始值
    // setEditingProjectId({ editingProjectId: undefined });
    // setProjectCreate({ projectCreate: undefined });

    setUrlParams({ editingProjectId: undefined, projectCreate: undefined });
  };
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });
  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
  // return [projectCreate === "true", open, close] as const;
  // it's better to return tuple when we return params less than 3 so that we can rename the params easier
};
