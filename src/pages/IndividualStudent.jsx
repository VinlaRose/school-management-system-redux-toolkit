import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const IndividualStudent = () => {
    const { studentId } = useParams();
    const [studentData, setStudentData] = useState();

    const getStudentDataById = async (studentId) => {
        console.log(studentId)
        try {
            const response = await fetch(`https://5a1ece93-aa90-49b4-a19b-b3af704a6f63-00-2jejhrwamybei.riker.replit.dev/students/${studentId}`);
            console.log(response)

            if (!response.ok) {
                throw new Error(`Failed to fetch student data: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data)
            setStudentData(data.data); 
            console.log(studentData)
        } catch (error) {
            console.error('Error fetching student data by ID:', error);
        }
    };

    useEffect(() => {
        getStudentDataById(studentId);
    }, [studentId]); 


    return (
        <div>
            
            {studentData && (
                <div class="flash-card">
                <div class="profile-picture">
                  <img src="https://pixlok.com/wp-content/uploads/2022/02/Profile-Icon-SVG-09856789-300x300.png" alt="Profile Picture"/>
                </div>
                <div>
                    <h1> {studentData.name}</h1>
                    <p>Age: {studentData.age}</p>
                    <p>Attendance: {studentData.attendance}</p>
                    <p>Class: {studentData.class}</p>
                    <p>Gender: {studentData.gender}</p>
                    <p>Marks: {studentData.marks}</p>
                </div>
              </div>
                
            )}
        </div>
    );
};
