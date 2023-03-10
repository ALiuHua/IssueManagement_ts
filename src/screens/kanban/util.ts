import { useCallback, useMemo } from "react";
import { useLocation } from "react-router";
import { useTask } from "utils/task";
import { useUrlQueryParam } from "utils/url";
import { useProject } from "utils/use-projects";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbansSearchParams = () => ({
  projectId: useProjectIdInUrl(),
});

export const useKanbansQueryKey = () => ["kanbans", useKanbansSearchParams()];

export const useTasksSearchParams = () => {
  console.log("useTasksSearchParams");
  const [param] = useUrlQueryParam(["name", "typeId", "processorId", "tagId"]);

  const projectId = useProjectIdInUrl();
  // const debouncedName = useDebounce(param.name, 200);

  return useMemo(() => {
    return {
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      name: param.name,
      tagId: Number(param.tagId) || undefined,
    };
  }, [param, projectId]);
};

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];

export const useTaskModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    "editingTaskId",
  ]);
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: "" });
  }, [setEditingTaskId]);
  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading,
  };
};
