import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";

function StudentHomePage() {
    const { studentViewCoursesList, setStudentViewCoursesList } =
        useContext(StudentContext);
    const { auth } = useContext(AuthContext)
    return (  );
}

export default StudentHomePage;