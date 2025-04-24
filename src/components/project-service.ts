import {Project} from "../types/Project.ts";


export function fetchProjects(): Promise<Project[]> {
    const mockProjects: Project[] = [
        {
            id: 1,
            title: "Weather Watch",
            description: "A real-time weather dashboard using OpenWeather API.",
            rating: 4.7,
            createdAt: "2023-10-12T08:30:00Z",
            durationDays: 14,
        },
        {
            id: 2,
            title: "FitTrack Pro",
            description: "Tracks workouts and nutrition with progress charts.",
            rating: 4.5,
            createdAt: "2023-09-05T12:00:00Z",
            durationDays: 21,
        },
        {
            id: 3,
            title: "DevHub",
            description: "A portfolio and blog built with Spring Boot and React.",
            rating: 5.0,
            createdAt: "2024-03-10T14:00:00Z",
            durationDays: 30,
        },
        {
            id: 4,
            title: "JobJournal",
            description: "Track job applications and interview notes.",
            rating: 4.6,
            createdAt: "2024-04-01T16:20:00Z",
            durationDays: 28,
        },
        {
            id: 5,
            title: "BudgetBuddy",
            description: "Helps users track expenses and monthly budgets.",
            rating: 4.8,
            createdAt: "2024-01-20T09:45:00Z",
            durationDays: 18,
        },
    ]
    return Promise.resolve(mockProjects);
}

export function fetchProjectById(id: number): Promise<Project> {
    return fetch(`/api/projects/${id}`).then((r) => r.json());
}

export function createProject(project: Project): Promise<Project> {
    return fetch("/api/projects/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(project),
    }).then((r) => r.json())
}

export function updateProject(project: Project): Promise<Project> {
    return fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(project)
    }).then((r) => r.json())
}