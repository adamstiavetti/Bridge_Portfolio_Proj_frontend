import {useEffect, useState} from "react";
import {fetchProjects} from "./project-service.ts";
import {Project} from "../types/Project.ts";
import ProjectCard from "./project-card.tsx";


const ProjectList = () => {
    const[projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        fetchProjects().then(setProjects)
    })

    return (
        <>
            <div>
                <h1>Project List</h1>
            </div>
            <div>
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project}/>
                ))}
            </div>
        </>
    )
};

export default ProjectList;