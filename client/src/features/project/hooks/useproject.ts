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

  return { getprojects };
};

export const useGetProjectById = (projectId: string) => {
  const getprojectid = useQuery({
    queryKey: ["projects", projectId],
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId,
  });

  return { getprojectid };
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

  return { createproject };
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

  return { updateproject };
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const deleteproject = useMutation({
    mutationFn: deleteProject,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });

  return { deleteproject };
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

  return { addmember };
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

  return { removemember };
};

