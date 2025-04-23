import {render, screen} from "@testing-library/react";
import {expect} from "vitest";
import ProjectCard from '../../components/project-card.tsx';
import {Project} from "../../types/Project.ts";

describe('Project Card', () => {
    it('should display a project with attributes and a button for edit, and delete', () => {
        const project:Project = {
            id: 1,
            title: 'Website1',
            description: 'This is a website',
            rating: 4.5,
            createdAt: '2023-09-05T12:00:00Z',
            durationDays: 14
        }
        render(<ProjectCard project={project}/>)

        expect(screen.getByRole('heading', {name: project.title})).toBeVisible();
        expect(screen.getByRole('button', {name: 'Edit'})).toBeInTheDocument();
    });
});