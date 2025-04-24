import {useEffect, useState} from "react";
import {fetchProjects} from "./project-service.ts";
import {Project} from "../types/Project.ts";
import ProjectCard from "./project-card.tsx";


type Props = {
    projects: Project[];
    onEdit: (project: Project) => void
    onDelete: (id: number) => void
}


const ProjectList = ({onEdit, onDelete}: Props) => {
    const[projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        fetchProjects().then(setProjects)
    })

    return (
        <>
            <h1>Project List</h1>
            <div className={projectListStyle}>
                {projects.map((project
            ) => (
                    <ProjectCard key={project.id} project={project} onEdit={() => onEdit(project)} onDelete={() => onDelete(project.id)}/>
                ))}
            </div>
        </>
    )
};

const projectListStyle = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6";


export default ProjectList;