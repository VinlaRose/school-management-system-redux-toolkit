import { useParams } from "react-router-dom";

export const IndividualTeacher = () => {
    const { teacherId } = useParams();

    return (
        <div>
            <h1>INDIVIDUAL TEACHER</h1>
            <p>Teacher ID: {teacherId}</p>
        </div>
    );
};
