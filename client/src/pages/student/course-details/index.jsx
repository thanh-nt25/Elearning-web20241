import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function StudentViewCourseDetailsPage() {
    const {
        studentViewCourseDetails,
        setStudentViewCourseDetails,
        currentCourseDetailsId,
        setCurrentCourseDetailsId,
        loadingState,
        setLoadingState,
    } = useContext(StudentContext);

    const { auth } = useContext(Auth)

    const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview]
        = useState(null);
    const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);
    const [approvalUrl, setApprovalUrl] = useState("");
    const navigate = useNavigate();
    const { id } = useParams;
    const location = useLocation();
    return (  );
}

export default StudentViewCourseDetailsPage;