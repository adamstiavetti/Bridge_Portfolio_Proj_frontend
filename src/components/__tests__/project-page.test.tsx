import {render, screen} from "@testing-library/react";
import ProjectPage from "../project-page.tsx";
import {expect} from "vitest";
import * as projectService from "../project-service.ts"
import {MemoryRouter} from "react-router-dom";

vi.mock("../component/project-service");

describe('ProjectPage', () => {
    it('should render the project list with a add button', async () => {
        vi.spyOn(projectService, "fetchProjects").mockResolvedValue([
            {
                id: 1,
                title: "Test Project",
                description: "Test",
                rating: 4.5,
                createdAt: "2025-1-1",
                durationDays: 10,
            }
        ])
        render(<ProjectPage />, { wrapper: MemoryRouter });

        expect(await screen.findByText(/Test Project/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /new project/i})).toBeInTheDocument();
    });
});