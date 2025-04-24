import ProjectList from "./project-list.tsx";
import { useEffect, useState} from "react";
import {Project} from "../types/Project.ts";
import {fetchProjects} from "./project-service.ts";
import {useNavigate} from "react-router-dom";
import { deleteProject } from "./project-service.ts";


const ProjectPage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const navigate = useNavigate();

    const handleDelete = async (id: number) => {
        try {
            await deleteProject(id);
            setProjects((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            console.error("Could not dele the project")
        }
    }

    useEffect(() => {
        fetchProjects().then(setProjects);
    }, [])

    return (
        <div>
            <button onClick={() => navigate("/new")}>
                Add New Project
            </button>
            <ProjectList
                projects={projects}
                onEdit={(id) => navigate(`/edit/${id}`)}
                onDelete={(id) => handleDelete(id)}/>
        </div>
    );
};



export default ProjectPage;