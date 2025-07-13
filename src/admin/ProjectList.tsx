import { useEffect, useState } from "react";
import axios from "axios";
import { Project } from "../types/Project";
import { useRouter } from "next/router";

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();

  const fetchProjects = async () => {
    const res = await axios.get("http://localhost:5000/api/projects");
    setProjects(res.data);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/projects/${id}`);
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      <button onClick={() => router.push("/create")}>Add Project</button>
      {projects.map((project) => (
        <div key={project._id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <button onClick={() => router.push(`/edit/${project._id}`)}>Edit</button>
          <button onClick={() => handleDelete(project._id!)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
