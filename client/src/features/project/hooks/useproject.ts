import type {
  IProjectCreate,
  IProjectUpdate,
} from "../types/project.type";

import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addMember,
  removeMember,
} from "../api/project.api";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useGetProjects = () => {
  const getprojects = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const projects = Array.isArray(getprojects.data)
    ? getprojects.data
    : (getprojects.data as any)?.data || [];

  return { getprojects, projects, isLoading: getprojects.isLoading, isError: getprojects.isError };
};

export const useGetProjectById = (projectId: string) => {
  const getprojectid = useQuery({
    queryKey: ["projects", projectId],
    queryFn: () => getProjectById(projectId),
    enabled: Boolean(projectId),
  });

  const project = getprojectid.data;

  return { getprojectid, project, isLoading: getprojectid.isLoading, isError: getprojectid.isError };
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const createproject = useMutation({
    mutationFn: (projectData: IProjectCreate) =>
      createProject(projectData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });

  return { createproject, isPending: createproject.isPending };
};

export const useUpdateProject = (projectId: string) => {
  const queryClient = useQueryClient();

  const updateproject = useMutation({
    mutationFn: (projectData: IProjectUpdate) =>
      updateProject(projectId, projectData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", projectId],
      });

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });

  return { updateproject, isPending: updateproject.isPending };
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const deleteproject = useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });

  return { deleteproject, isPending: deleteproject.isPending };
};

export const useAddMember = (projectId: string) => {
  const queryClient = useQueryClient();

  const addmember = useMutation({
    mutationFn: (userId: string) =>
      addMember(projectId, userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", projectId],
      });

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });

  return { addmember, isPending: addmember.isPending };
};

export const useRemoveMember = (projectId: string) => {
  const queryClient = useQueryClient();

  const removemember = useMutation({
    mutationFn: (userId: string) =>
      removeMember(projectId, userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", projectId],
      });

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });

  return { removemember, isPending: removemember.isPending };
};


