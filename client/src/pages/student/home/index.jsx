import { courseCategories } from "@/config";
import banner from "../../../assets/banner-img.png";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";

// Định nghĩa trang chủ dành cho sinh viên
function StudentHomePage() {
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [purchaseStatus, setPurchaseStatus] = useState({});

  // Hàm xử lý chuyển hướng đến trang danh sách khóa học theo danh mục
  function handleNavigateToCoursesPage(getCurrentId) {
    console.log(getCurrentId);
    sessionStorage.removeItem("filters");
    const currentFilter = {
      category: [getCurrentId],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    navigate("/courses");
  }

  // Hàm lấy danh sách khóa học từ server
  async function fetchAllStudentViewCourses() {
    const response = await fetchStudentViewCourseListService();
    if (response?.success) setStudentViewCoursesList(response?.data);
  }

  // Hàm xử lý hiển thị nút mua hoặc tiếp tục học tùy thuộc vào tình trạng mua khóa học
  async function handleBuyButtonDisplay(courseId) {
    if (!auth?.user?._id) return false;
    const response = await checkCoursePurchaseInfoService(
      courseId,
      auth.user._id
    );
    if (response?.success) {
      return response?.data;
    }
    return false;
  }

  // Hàm lấy trạng thái mua hàng cho tất cả các khóa học hiển thị
  async function fetchPurchaseStatuses() {
    if (studentViewCoursesList?.length > 0) {
      const statuses = {};
      for (const course of studentViewCoursesList) {
        const status = await handleBuyButtonDisplay(course?._id);
        statuses[course?._id] = status;
      }
      setPurchaseStatus(statuses);
    }
  }


  // Hàm xử lý chuyển trang khi người dùng click vào một khóa học
  async function handleCourseNavigate(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );
    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    }
  }

  // Sử dụng useEffect để gọi API lấy danh sách khóa học khi component được mount
  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);

  // Sử dụng useEffect để cập nhật trạng thái mua hàng khi danh sách khóa học thay đổi
  useEffect(() => {
    fetchPurchaseStatuses();
  }, [studentViewCoursesList]);

  return (
    <div className="min-h-screen bg-white">
      <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-4xl font-bold mb-4">Learning thet gets you</h1>
          <p className="text-xl">
            Skills for your present and your future. Get Started with US
          </p>
        </div>
        <div className="lg:w-full mb-8 lg:mb-0">
          <img
            src={banner}
            width={600}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </section>
      <section className="py-8 px-4 lg:px-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {courseCategories.map((categoryItem) => (
            <Button
              className="justify-start"
              variant="outline"
              key={categoryItem.id}
              onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section>
      <section className="py-12 px-4 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.map((courseItem) => (
              <div
                onClick={() => handleCourseNavigate(courseItem?._id)}
                className="border rounded-lg overflow-hidden shadow cursor-pointer"
              >
                <img
                  src={courseItem?.image}
                  width={300}
                  height={150}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-left text-[20px] font-bold mb-2">{courseItem?.title}</h3>
                  <p className="text-left text-sm text-gray-700 mb-2">
                    {courseItem?.instructorName}
                  </p>
                  <p className="font-semibold text-[15px] text-left pt-4 pb-2">
                    {courseItem?.level
                      ? courseItem.level.charAt(0).toUpperCase() + courseItem.level.slice(1)
                      : ""}
                  </p>
                  {purchaseStatus[courseItem?._id] ? (
                    <Button className="w-full bg-green-500 text-white text-[17px] font-semibold hover:bg-green-600">
                      Continue Learning
                    </Button>
                  ) : (
                    <Button className="w-full bg-red-500 text-white text-[17px] font-semibold hover:bg-red-600">
                      Buy now ${courseItem?.pricing}
                    </Button>
                  )}

                </div>
              </div>
            ))
          ) : (
            <h1>No Courses Found</h1>
          )}
        </div>
      </section>
    </div>

  );
}

export default StudentHomePage;
