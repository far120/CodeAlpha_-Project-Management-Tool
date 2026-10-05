import { useGetProjects } from "../hooks/useproject";

export default function ProjectList() {
  const { getprojects } = useGetProjects();
  

  if (getprojects.isLoading) {
    return <div>Loading...</div>;
  }

  if (getprojects.isError) {
    return <div>Error: {getprojects.error.message}</div>;
  }

  const projects = getprojects.data?.data;
  console.log("Projects:", projects);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects?.map((project) => (
        <div
          key={project._id}
          className="bg-white p-4 rounded shadow"
        >
          <h2 className="text-xl font-bold">
            {project.name}
          </h2>

          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}

