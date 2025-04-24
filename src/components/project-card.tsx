
import {Project} from "../types/Project.ts";

type Props = {
    project: Project;
    onEdit: () => void;
}

const ProjectCard = ({ project, onEdit}: Props) => {
    return (
        <div className={cardStyle} >
            <h1 className={cardTitleStyle} role={'heading'}>{project.title}</h1>
            <p className={cardDetailStyle}>{project.description}</p>
            <p className={cardDetailStyle}>Rating: {project.rating}</p>
            <p className={cardDetailStyle}>Date Created: {project.createdAt}</p>
            <p className={cardDetailStyle}>Build Days: {project.durationDays}</p>
            <button onClick={onEdit}>Edit</button>
        </div>
    );
};

const cardStyle = "bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition-shadow duration-300";

const cardTitleStyle = "text-xl font-bold text-gray-800 mb-2";

const cardDetailStyle = "text-sm text-gray-600 mb-1";

export default ProjectCard;