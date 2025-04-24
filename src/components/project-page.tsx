import ProjectList from "./project-list.tsx";
import { useEffect, useState} from "react";
import {Project} from "../types/Project.ts";
import {fetchProjects} from "./project-service.ts";
import {useNavigate} from "react-router-dom";


const ProjectPage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects().then(setProjects);
    }, [])

    return (
        <div>
            <button onClick={() => navigate("/new")}>
                Add New Project
            </button>
            <ProjectList projects={projects} onEdit={(id) => navigate(`/edit/${id}`)}/>
        </div>
    );
};



export default ProjectPage;