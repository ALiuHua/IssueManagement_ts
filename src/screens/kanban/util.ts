import { useMemo } from "react";
import { useLocation } from "react-router";
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
  const [param, setParam] = useUrlQueryParam([
    "name",
    "typeId",
    "processorId",
    "tagId",
  ]);

  const projectId = useProjectIdInUrl();

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
