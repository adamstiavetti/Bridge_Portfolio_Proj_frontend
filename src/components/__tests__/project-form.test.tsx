import {expect, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import ProjectForm from "../project-form.tsx";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {userEvent} from "@testing-library/user-event";
import * as projectService from "../project-service.ts";
import {waitFor} from "@testing-library/dom";

vi.mock("../../components/project-service");

describe('ProjectForm', () => {
    it('create and save a project', async () => {
        const mockCreate = vi.spyOn(projectService, "createProject").mockResolvedValue({
            id: 2,
            title: "New Project",
            description: "Test",
            rating: 4.5,
            createdAt: "2024-04-23T14:00:00Z",
            durationDays: 13,
        })
        render(<ProjectForm />, { wrapper: MemoryRouter });

        await userEvent.type(screen.getByPlaceholderText(/title/i), "New Project");
        await userEvent.type(screen.getByPlaceholderText(/description/i), "Test");
        await userEvent.type(screen.getByPlaceholderText(/rating/i), "4.5");
        await userEvent.type(screen.getByPlaceholderText(/created At/i), "2024-04-23T14:00:00Z");
        await userEvent.type(screen.getByPlaceholderText(/duration/i), "13");

        await userEvent.click(screen.getByRole("button", { name: /create project/i }));

        expect(mockCreate).toHaveBeenCalledWith({
            id: 0,
            title: "New Project",
            description: "Test",
            rating: 4.5,
            createdAt: "2024-04-23T14:00:00Z",
            durationDays: 13,
        })
    });

    it('should be able to edit and save a project', async () => {
        const mockProject = {
            id: 1,
            title: "Old Project",
            description: "Old Desc",
            rating: 4.5,
            createdAt: "2024-04-23T14:00:00Z",
            durationDays: 13,
        };

        vi.spyOn(projectService, "fetchProjectById").mockResolvedValue(mockProject)

        const mockUpdate = vi
            .spyOn(projectService,"updateProject")
            .mockResolvedValue({...mockProject, title: "New Project"})

        render(
            <MemoryRouter initialEntries={["/edit/1"]}>
                <Routes>
                    <Route path="/edit/:id" element={<ProjectForm/>}/>
                </Routes>
            </MemoryRouter>
        );

        expect(await screen.findByDisplayValue(/old project/i)).toBeInTheDocument();

        const titleInput = screen.getByPlaceholderText(/title/i);

        await userEvent.clear(titleInput)
        await userEvent.type(titleInput, "New Project");

        await userEvent.click(screen.getByRole("button", { name: /update project/i}));

        await waitFor(() => {
            expect(mockUpdate).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: 1,
                    title: "New Project"
                })
            )
        })

    });
});