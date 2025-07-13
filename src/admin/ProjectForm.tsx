import { useState, useEffect } from "react";
import { Project } from "../types/Project";
import axios from "axios";
import { useRouter } from "next/router";

type Props = {
  projectId?: string;
};

const ProjectForm = ({ projectId }: Props) => {
  const [form, setForm] = useState<Project>({
    title: "",
    image: "",
    description: "",
    url: "",
    repo: "",
    github: "",
    tags: [],
    category: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (projectId) {
      axios.get(`http://localhost:5000/api/projects/${projectId}`).then((res) => {
        setForm(res.data);
      });
    }
  }, [projectId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, tags: e.target.value.split(",") });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (projectId) {
      await axios.put(`http://localhost:5000/api/projects/${projectId}`, form);
    } else {
      await axios.post("http://localhost:5000/api/projects", form);
    }
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <input name="url" value={form.url} onChange={handleChange} placeholder="Project URL" />
      <input name="repo" value={form.repo} onChange={handleChange} placeholder="Repo URL" />
      <input name="github" value={form.github} onChange={handleChange} placeholder="GitHub URL" />
      <input name="tags" onChange={handleTags} value={form.tags.join(",")} placeholder="Comma separated tags" />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
      <button type="submit">{projectId ? "Update" : "Create"} Project</button>
    </form>
  );
};

export default ProjectForm;
