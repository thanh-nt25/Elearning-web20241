import axiosInstance from "@/api/axiosInstance";
// import { handleApiResponse } from "@/utils/toastWrapper";
import { toast } from "react-toastify";


// export async function registerService(formData) {
//   const { data } = await axiosInstance.post("/auth/register", {
//     ...formData,
//     role: "user",
//   });

//   return data;
// }

export async function registerService(formData) {
  try {
    const { data } = await axiosInstance.post("/auth/register", {
      ...formData,
      role: "user",
    });

    if (data?.success) {
      toast.success(data.message || "Registration successful!");
    } else {
      toast.error(data.message || "Registration failed!");
    }

    return data; 
  } catch (error) {
    console.error("Registration Error:", error);
    toast.error(
      error.response?.data?.message || "An unexpected error occurred during registration!"
    );
    throw error; 
  }
}

export async function loginService(formData) {
  try {
    const { data } = await axiosInstance.post("/auth/login", formData);

    if (data?.success) {
      toast.success(data.message || "Login successful!");
      console.log("Toast called successfully");
    } else {
      toast.error(data.message || "Login failed!");
    }

    return data;
  } catch (error) {
    console.error("Login Error:", error);
    toast.error(error.response?.data?.message || "An unexpected error occurred!");
    throw error; 
  }
}

export async function checkAuthService() {
  const { data } = await axiosInstance.get("/auth/check-auth");

  return data;
}

export async function mediaUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/media/upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });

  return data;
}

export async function mediaDeleteService(id) {
  const { data } = await axiosInstance.delete(`/media/delete/${id}`);

  return data;
}

// instructor
export async function fetchInstructorCourseListService(instructorId) {
  const { data } = await axiosInstance.get(`/instructor/course/get`,{
    params: { instructorId }, 
  });

  return data;
}

export async function fetchInstructorCourseDetailsService(id) {
  const { data } = await axiosInstance.get(
    `/instructor/course/get/details/${id}`
  );

  return data;
}

// export async function addNewCourseService(formData) {
//   const { data } = await axiosInstance.post(`/instructor/course/add`, formData);

//   return data;
// }

export async function addNewCourseService(formData) {
  try {
    const { data } = await axiosInstance.post(`/instructor/course/add`, formData);

    if (data?.success) {
      toast.success(data.message || "Course added successfully!");
    } else {
      toast.error(data.message || "Failed to add course!");
    }

    return data;
  } catch (error) {
    console.error("Error adding course:", error);
    toast.error(
      error.response?.data?.message || "An unexpected error occurred while adding the course!"
    );
    throw error;
  }
}

// export async function updateCourseByIdService(id, formData) {
//   const { data } = await axiosInstance.put(
//     `/instructor/course/update/${id}`,
//     formData
//   );

//   return data;
// }

export async function updateCourseByIdService(id, formData) {
  try {
    const { data } = await axiosInstance.put(
      `/instructor/course/update/${id}`,
      formData
    );

    if (data?.success) {
      toast.success(data.message || "Course updated successfully!");
    } else {
      toast.error(data.message || "Failed to update course!");
    }

    return data;
  } catch (error) {
    console.error("Error updating course:", error);
    toast.error(
      error.response?.data?.message || "An unexpected error occurred while updating the course!"
    );
    throw error;
  }
}
// het instructor

//admin
export async function fetchAdminCourseListService() {
  const { data } = await axiosInstance.get(`/admin/course/get`);

  return data;
}

export async function fetchAdminCourseDetailsService(id) {
  const { data } = await axiosInstance.get(
    `/admin/course/get/details/${id}`
  );

  return data;
}

// export async function updateAdminCourseByIdService(id, formData) {
//   const { data } = await axiosInstance.put(
//     `/admin/course/update/${id}`,
//     formData
//   );

//   return data;
// }
export async function updateAdminCourseByIdService(id, formData) {
  try {
    const { data } = await axiosInstance.put(
      `/admin/course/update/${id}`,
      formData
    );

    if (data?.success) {
      toast.success(data.message || "Course updated successfully!");
    } else {
      toast.error(data.message || "Failed to update course!");
    }

    return data;
  } catch (error) {
    console.error("Error updating course:", error);
    toast.error(
      error.response?.data?.message || "An unexpected error occurred!"
    );
    throw error; 
  }
}


// user

// export async function addNewUserService(userFormData){
//   const { data } = await axiosInstance.post(`/admin/user/add`, userFormData);

//   return data;

// }

export async function addNewUserService(userFormData) {
  try {
    const { data } = await axiosInstance.post(
      `/admin/user/add`,
      userFormData
    );

    if (data?.success) {
      toast.success(data.message || "User added successfully!");
    } else {
      toast.error(data.message || "Failed to add user!");
    }

    return data;
  } catch (error) {
    console.error("Error adding user:", error);
    toast.error(
      error.response?.data?.message || "An unexpected error occurred!"
    );
    throw error; 
  }
}

export async function fetchUserDetailsService(userId){
  const { data } = await axiosInstance.get(
    `/admin/user/get/details/${userId}`
  );

  return data;
}

export async function fetchAdminUserListService() {
  const { data } = await axiosInstance.get(`/admin/user/get`);

  return data;
}

// export async function updateUserByIdService(userId, userFormData){
//   const { data } = await axiosInstance.put(
//     `/admin/user/update/${userId}`,
//     userFormData
//   );

//   return data;
// }
export async function updateUserByIdService(userId, userFormData) {
  try {
    const { data } = await axiosInstance.put(
      `/admin/user/update/${userId}`,
      userFormData
    );

    if (data?.success) {
      toast.success(data.message || "User updated successfully!");
    } else {
      toast.error(data.message || "Failed to update user!");
    }

    return data;
  } catch (error) {
    console.error("Error updating user:", error);
    toast.error(
      error.response?.data?.message || "An unexpected error occurred!"
    );
    throw error;
  }
}

//het admin

export async function mediaBulkUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/media/bulk-upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });

  return data;
}

export async function fetchStudentViewCourseListService(query) {
  const { data } = await axiosInstance.get(`/student/course/get?${query}`);

  return data;
}

export async function fetchStudentViewCourseDetailsService(courseId) {
  const { data } = await axiosInstance.get(
    `/student/course/get/details/${courseId}`
  );

  return data;
}

export async function checkCoursePurchaseInfoService(courseId, studentId) {
  const { data } = await axiosInstance.get(
    `/student/course/purchase-info/${courseId}/${studentId}`
  );

  return data;
}

// export async function createPaymentService(formData) {
//   const { data } = await axiosInstance.post(`/student/order/create`, formData);

//   return data;
// }

export async function createPaymentService(formData) {
  try {
    const { data } = await axiosInstance.post(`/student/order/create`, formData);

    if (data?.success) {
      toast.success(data.message || "Payment created successfully!");
    } else {
      toast.error(data.message || "Failed to create payment!");
    }

    return data;
  } catch (error) {
    console.error("Error creating payment:", error);
    toast.error(
      error.response?.data?.message || "An unexpected error occurred while creating the payment!"
    );
    throw error;
  }
}

// export async function captureAndFinalizePaymentService(
//   paymentId,
//   payerId,
//   orderId
// ) {
//   const { data } = await axiosInstance.post(`/student/order/capture`, {
//     paymentId,
//     payerId,
//     orderId,
//   });

//   return data;
// }

export async function captureAndFinalizePaymentService(paymentId, payerId, orderId) {
  try {
    const { data } = await axiosInstance.post(`/student/order/capture`, {
      paymentId,
      payerId,
      orderId,
    });

    if (data?.success) {
      toast.success(data.message || "Payment finalized successfully!");
    } else {
      toast.error(data.message || "Failed to finalize payment!");
    }

    return data;
  } catch (error) {
    console.error("Error finalizing payment:", error);
    toast.error(
      error.response?.data?.message || "An unexpected error occurred while finalizing the payment!"
    );
    throw error;
  }
}

export async function createFreeCourseOrderService(formData) {
  try {
    const { data } = await axiosInstance.post(`/student/order/create-free`, formData);

    if (data?.success) {
      toast.success(data.message || "Enrolled in the free course successfully!");
    } else {
      toast.error(data.message || "Failed to enroll in the free course!");
    }

    return data;
  } catch (error) {
    console.error("Error enrolling in free course:", error);
    toast.error(
      error.response?.data?.message || "An unexpected error occurred while enrolling in the free course!"
    );
    throw error;
  }
}

export async function fetchStudentBoughtCoursesService(studentId) {
  const { data } = await axiosInstance.get(
    `/student/courses-bought/get/${studentId}`
  );

  return data;
}

export async function getCurrentCourseProgressService(userId, courseId) {
  const { data } = await axiosInstance.get(
    `/student/course-progress/get/${userId}/${courseId}`
  );

  return data;
}

// export async function markLectureAsViewedService(userId, courseId, lectureId) {
//   const { data } = await axiosInstance.post(
//     `/student/course-progress/mark-lecture-viewed`,
//     {
//       userId,
//       courseId,
//       lectureId,
//     }
//   );

//   return data;
// }

export async function markLectureAsViewedService(userId, courseId, lectureId) {
  try {
    const { data } = await axiosInstance.post(
      `/student/course-progress/mark-lecture-viewed`,
      {
        userId,
        courseId,
        lectureId,
      }
    );

    if (data?.success) {
      toast.success(data.message || "Lecture marked as viewed!");
    } else {
      toast.error(data.message || "Failed to mark lecture as viewed!");
    }

    return data;
  } catch (error) {
    console.error("Error marking lecture as viewed:", error);
    toast.error(
      error.response?.data?.message || "An unexpected error occurred while marking the lecture!"
    );
    throw error;
  }
}

// export async function resetCourseProgressService(userId, courseId) {
//   const { data } = await axiosInstance.post(
//     `/student/course-progress/reset-progress`,
//     {
//       userId,
//       courseId,
//     }
//   );

//   return data;
// }

export async function resetCourseProgressService(userId, courseId) {
  try {
    const { data } = await axiosInstance.post(
      `/student/course-progress/reset-progress`,
      {
        userId,
        courseId,
      }
    );

    if (data?.success) {
      toast.success(data.message || "Course progress reset successfully!");
    } else {
      toast.error(data.message || "Failed to reset course progress!");
    }

    return data;
  } catch (error) {
    console.error("Error resetting course progress:", error);
    toast.error(
      error.response?.data?.message || "An unexpected error occurred while resetting the course progress!"
    );
    throw error;
  }
}
