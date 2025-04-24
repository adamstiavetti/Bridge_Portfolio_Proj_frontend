import {Project} from "../types/Project.ts";


export function fetchProjects(): Promise<Project[]> {
    return fetch("/api/projects")
        .then((res) => {
            if (!res.ok) {
                console.error("Could not get projects")
            }
            return res.json();
        })
}

export function fetchProjectById(id: number): Promise<Project> {
    
    return fetch(`/api/projects/${id}`)
        .then((res) => {
            if(!res.ok){
                console.error("Could not get project by id")
            }
            return res.json();
        });
}

export function createProject(project: Project): Promise<Project> {
    if (!project.id) console.error("No Project id")

    return fetch("/api/projects", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(project),
    }).then((res) => {
        if(!res.ok) {
            console.error("Could not create project")
        }
        console.log("Sending project to /api/projects:", project);
        return res.json();

    })
}

export function updateProject(project: Project): Promise<Project> {
    if (!project.id) console.error("No Project id")

    return fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(project)
    }).then((res) => {
        if(!res.ok) {
            console.error("Could not update project")
        }
        return res.json();
    })
}

export function deleteProject(id: number): Promise<void> {
    return fetch(`/api/projects/${id}`, {
        method: "DELETE",
    }).then((res) => {
        if (!res.ok) {
            console.error("Could not delete!")
        }
        return res.json();
    })
}