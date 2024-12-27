import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
    checkCoursePurchaseInfoService,
    createPaymentService,
    fetchStudentViewCourseDetailsService,
    createFreeCourseOrderService
} from "@/services";
import { CheckCircle, Globe, Lock, PlayCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Định nghĩa trang chi tiết khóa học cho sinh viên
function StudentViewCourseDetailsPage() {

    // Sử dụng Context để quản lý trạng thái và thông tin khóa học
    const {
        studentViewCourseDetails,
        setStudentViewCourseDetails,
        currentCourseDetailsId,
        setCurrentCourseDetailsId,
        loadingState,
        setLoadingState,
    } = useContext(StudentContext);

    const { auth } = useContext(AuthContext);

    const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] =
        useState(null);
    const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);
    const [approvalUrl, setApprovalUrl] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    // Hàm lấy thông tin chi tiết khóa học từ server
    async function fetchStudentViewCourseDetails(courseId) {
        try {
            const response = await fetchStudentViewCourseDetailsService(courseId);

            if (response?.success) {
                setStudentViewCourseDetails(response?.data);
            } else {
                setStudentViewCourseDetails(null);
            }
        } catch (error) {
            console.error('Error fetching course details:', error);
            setStudentViewCourseDetails(null);
        } finally {
            setLoadingState(false);
        }
    }

    // Xử lý hiển thị video xem trước miễn phí
    function handleSetFreePreview(getCurrentVideoInfo) {
        console.log(getCurrentVideoInfo);
        setDisplayCurrentVideoFreePreview(getCurrentVideoInfo?.videoUrl);
    }

    async function handleCreatePaymentOrEnroll() {
        if (studentViewCourseDetails?.pricing === 0) {
            try {
                const freeCoursePayload = {
                    userId: auth?.user?._id,
                    userName: auth?.user?.userName,
                    userEmail: auth?.user?.userEmail,
                    instructorId: studentViewCourseDetails?.instructorId,
                    instructorName: studentViewCourseDetails?.instructorName,
                    courseImage: studentViewCourseDetails?.image,
                    courseTitle: studentViewCourseDetails?.title,
                    courseId: studentViewCourseDetails?._id,
                };

                const response = await createFreeCourseOrderService(freeCoursePayload);

                if (response?.success) {
                    window.location.href = "/student-courses";
                    console.log("Free course enrolled successfully:", response.data);
                    toast.success("Enrolled in this free course successfully!");
                } else {
                    console.error("Failed to enroll in free course:", response?.message);
                    toast.error("Failed to enroll in the free course!");
                }
            } catch (error) {
                console.error("Error enrolling in free course:", error);
                toast.error("An error occurred while enrolling in the course!");
            }
        } else {
            const paymentPayload = {
                userId: auth?.user?._id,
                userName: auth?.user?.userName,
                userEmail: auth?.user?.userEmail,
                orderStatus: "pending",
                paymentMethod: "paypal",
                paymentStatus: "initiated",
                orderDate: new Date(),
                paymentId: "",
                payerId: "",
                instructorId: studentViewCourseDetails?.instructorId,
                instructorName: studentViewCourseDetails?.instructorName,
                courseImage: studentViewCourseDetails?.image,
                courseTitle: studentViewCourseDetails?.title,
                courseId: studentViewCourseDetails?._id,
                coursePricing: studentViewCourseDetails?.pricing,
            };

            console.log(paymentPayload, "paymentPayload");
            const response = await createPaymentService(paymentPayload);

            if (response?.success) {
                sessionStorage.setItem(
                    "currentOrderId",
                    JSON.stringify(response?.data?.orderId)
                );
                setApprovalUrl(response?.data?.approveUrl);
            } else {
                console.error("Failed to create payment:", response?.message);
            }
        }
    }

    // Sử dụng useEffect để theo dõi các thay đổi của state và thực hiện các hành động phù hợp
    useEffect(() => {
        if (displayCurrentVideoFreePreview !== null) setShowFreePreviewDialog(true);
    }, [displayCurrentVideoFreePreview]);

    useEffect(() => {
        if (currentCourseDetailsId !== null) fetchStudentViewCourseDetails();
    }, [currentCourseDetailsId]);

    useEffect(() => {
        if (id) {
            console.log('Fetching details for course id:', id);
            setLoadingState(true);
            setStudentViewCourseDetails(null);
            fetchStudentViewCourseDetails(id);
        }
    }, [id]);

    // useEffect(() => {
    //     if (!location.pathname.includes("course/details"))
    //         setStudentViewCourseDetails(null),
    //             setCurrentCourseDetailsId(null),
    //             setCoursePurchaseId(null);
    // }, [location.pathname]);
    useEffect(() => {
        if (!location.pathname.includes("course/details")) {
            setStudentViewCourseDetails(null);
            // Removed setCoursePurchaseId(null);
        }
    }, [location.pathname]);

    // Hiển thị loader nếu đang tải dữ liệu
    if (loadingState) return <Skeleton />;

    // Chuyển hướng nếu có URL phê duyệt thanh toán
    if (approvalUrl !== "") {
        window.location.href = approvalUrl;
    }

    // Xác định chỉ số của video xem trước miễn phí
    const getIndexOfFreePreviewUrl =
        studentViewCourseDetails !== null
            ? studentViewCourseDetails?.curriculum?.findIndex(
                (item) => item.freePreview
            )
            : -1;

    // Xây dựng giao diện người dùng cho trang chi tiết khóa học
    return (
        <div className=" mx-auto p-4">
            <div className="bg-gray-900 text-white p-8 rounded-t-lg">
                <h1 className="text-3xl font-bold mb-4">
                    {studentViewCourseDetails?.title}
                </h1>
                <p className="text-xl mb-4">{studentViewCourseDetails?.subtitle}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                    <span>Created By {studentViewCourseDetails?.instructorName}</span>
                    <span>Created On {studentViewCourseDetails?.date.split("T")[0]}</span>
                    <span className="flex items-center">
                        <Globe className="mr-1 h-4 w-4" />
                        {studentViewCourseDetails?.primaryLanguage}
                    </span>
                    <span>
                        {studentViewCourseDetails?.students.length}{" "}
                        {studentViewCourseDetails?.students.length <= 1
                            ? "Student"
                            : "Students"}
                    </span>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 mt-8">
                <main className="flex-grow">
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="text-left">What you'll learn</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                {studentViewCourseDetails?.objectives
                                    .split(",")
                                    .map((objective, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                                            <span>{objective}</span>
                                        </li>
                                    ))}
                            </ul>
                        </CardContent>
                    </Card>
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="text-left">Course Description</CardTitle>
                        </CardHeader>
                        <CardContent className="text-left">{studentViewCourseDetails?.description}</CardContent>
                    </Card>
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="text-left">Course Curriculum</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {studentViewCourseDetails?.curriculum?.map((curriculumItem, index) => (
                                <li
                                    key={index}
                                    className={`${curriculumItem?.freePreview ? "cursor-pointer" : "cursor-not-allowed"} flex items-center mb-4`}
                                    onClick={
                                        curriculumItem?.freePreview
                                            ? () => handleSetFreePreview(curriculumItem)
                                            : null
                                    }
                                >
                                    {curriculumItem?.freePreview ? (
                                        <PlayCircle className="mr-2 h-4 w-4" />
                                    ) : (
                                        <Lock className="mr-2 h-4 w-4" />
                                    )}
                                    <span>{curriculumItem?.title}</span>
                                </li>
                            ))}
                        </CardContent>
                    </Card>
                </main>
                <aside className="w-full md:w-[500px]">
                    <Card className="sticky top-4">
                        <CardContent className="p-6">
                            <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                                <VideoPlayer
                                    url={
                                        getIndexOfFreePreviewUrl !== -1
                                            ? studentViewCourseDetails?.curriculum[
                                                getIndexOfFreePreviewUrl
                                            ].videoUrl
                                            : ""
                                    }
                                    width="450px"
                                    height="200px"
                                />
                            </div>
                            <div className="mb-4">
                                <span className="text-3xl font-bold">
                                    ${studentViewCourseDetails?.pricing}
                                </span>
                            </div>
                            {studentViewCourseDetails?.pricing === 0 ? (
                                <Button
                                    onClick={handleCreatePaymentOrEnroll}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    Enroll Now
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleCreatePaymentOrEnroll}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    Buy Now
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </aside>
            </div>
            <Dialog
                open={showFreePreviewDialog}
                onOpenChange={() => {
                    setShowFreePreviewDialog(false);
                    setDisplayCurrentVideoFreePreview(null);
                }}
            >
                <DialogContent className="w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Course Preview</DialogTitle>
                    </DialogHeader>
                    <div className="aspect-video rounded-lg flex items-center justify-center">
                        <VideoPlayer
                            url={displayCurrentVideoFreePreview}
                            width="450px"
                            height="200px"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        {studentViewCourseDetails?.curriculum
                            ?.filter((item) => item.freePreview)
                            .map((filteredItem) => (
                                <p
                                    onClick={() => handleSetFreePreview(filteredItem)}
                                    className="cursor-pointer text-[16px] font-medium"
                                >
                                    {filteredItem?.title}
                                </p>
                            ))}
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default StudentViewCourseDetailsPage;
