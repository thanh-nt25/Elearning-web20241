import { checkCoursePurchaseInfoService } from "@/services";
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

    async function fetchStudentViewCourseDetails() {
        const checkCoursePurchaseInfoResponse =
            await checkCoursePurchaseInfoService(
                currentCourseDetailsId,
                auth?.user._id
            );

        if (checkCoursePurchaseInfoResponse?.success &&
            checkCoursePurchaseInfoResponse?.data
        ) {
            navigate(`/course-progress/${currentCourseDetailsId}`)
            return;
        }
    }




    return (  );
}

export default StudentViewCourseDetailsPage;