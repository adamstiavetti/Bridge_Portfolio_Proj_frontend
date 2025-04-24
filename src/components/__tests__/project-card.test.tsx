import {render, screen} from "@testing-library/react";
import {expect} from "vitest";
import ProjectCard from '../../components/project-card.tsx';
import {Project} from "../../types/Project.ts";
import {userEvent} from "@testing-library/user-event";

describe('Project Card', () => {
    it('should display a project with attributes and a button for edit', () => {
        const mockProject:Project = {
            id: 1,
            title: 'Website1',
            description: 'This is a website',
            rating: 4.5,
            createdAt: '2023-09-05T12:00:00Z',
            durationDays: 14
        }
        render(<ProjectCard project={mockProject} onEdit={() => {}} onDelete={() => {}}/>)

        expect(screen.getByRole('heading', {name: mockProject.title})).toBeVisible();
        expect(screen.getByRole('button', {name: /edit/i})).toBeInTheDocument();
    });

    it('should render a delete button and delete a project when button is clicked ', async () => {
        const mockProject:Project = {
            id: 1,
            title: 'Delete Project',
            description: 'Desc',
            rating: 4.2,
            createdAt: '2025-01-01',
            durationDays: 1,
        }
        const onEdit = vi.fn();
        const onDelete = vi.fn();

        render(<ProjectCard project={mockProject} onEdit={onEdit} onDelete={onDelete}/>)

        const deleteBtn = screen.getByRole("button", { name: /delete/i });
        expect(deleteBtn).toBeInTheDocument();

        await userEvent.click(deleteBtn);
        expect(onDelete).toHaveBeenCalledTimes(1);
    });
});