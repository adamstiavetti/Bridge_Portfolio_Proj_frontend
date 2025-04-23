import {beforeEach, expect} from "vitest";
import {waitFor} from "@testing-library/dom";
import {render, screen} from "@testing-library/react";
import ProjectList from "../project-list.tsx";
import * as projectService from '../project-service.ts'

describe('Project List', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });


    const doRender = async () => {
        await waitFor(() => {
            render(<ProjectList/>)
        })
    }

    it('should display project list header', async () => {
        // vi.spyOn(projectService, 'fetchProjects').mockResolvedValue([])
        await doRender()
        expect(await screen.findByRole('heading', {name: 'Project List'})).toBeVisible();
    });

    it('should call the project service', async () => {
        const mockFetchProjects = vi.spyOn(projectService, 'fetchProjects').mockResolvedValue([]);
        await doRender()
        expect(mockFetchProjects).toHaveBeenCalledTimes(1)
        expect(await screen.findByRole('heading', {name: 'Project List'})).toBeVisible();
    });
})