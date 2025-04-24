import React, {useEffect, useState} from 'react';
import {Project} from "../types/Project.ts";
import {useNavigate, useParams} from "react-router-dom";
import {createProject, fetchProjectById, updateProject} from "./project-service.ts";

const ProjectForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditing = Boolean(id);

    const [formData, setFormData] = useState<Project>({
        title: "",
        description: "",
        rating: 0,
        createdAt: "",
        durationDays: 0,
    });

    useEffect(() => {
        if (isEditing && id) {
            fetchProjectById(Number(id)).then(setFormData)
            }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "rating" || name === "durationDays" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const {...rest } = formData;

        if (isEditing) {

           await updateProject(formData);
        }else {
            await createProject(rest);
        }
        navigate("/");
    }

    return (
       <div className={formContainerStyle}>
           <h2>{isEditing ? "Edit Project" : "New Project"}</h2>
           <form onSubmit={handleSubmit}>
               <input
               name="title"
               placeholder="Title"
               value={formData.title}
               className={formInputStyle}
               onChange={handleChange}
               />

               <input
                   name="description"
                   placeholder="Description"
                   value={formData.description}
                   className={formInputStyle}
                   onChange={handleChange}
               />

               <input
                   name="rating"
                   type="number"
                   placeholder="Rating"
                   value={formData.rating}
                   className={formInputStyle}
                   onChange={handleChange}
               />

               <input
                   name="createdAt"
                   placeholder="Created At"
                   value={formData.createdAt}
                   className={formInputStyle}
                   onChange={handleChange}
               />

               <input
                   name="durationDays"
                   type="number"
                   placeholder="Build Duration Days"
                   value={formData.durationDays}
                   className={formInputStyle}
                   onChange={handleChange}
               />
               <button type="submit">
                   {isEditing ? "Update Project" : "Create Project"}
               </button>
           </form>
       </div>

    );
};

const formInputStyle = "w-full px-3 py-2 border rounded text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400";

const formContainerStyle = "max-w-xl mx-auto bg-white shadow-md rounded-xl p-6 border space-y-4";



export default ProjectForm;