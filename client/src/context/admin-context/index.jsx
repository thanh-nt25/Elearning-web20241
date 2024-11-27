import {
    courseCurriculumInitialFormData,
    courseLandingInitialFormData,
  } from "@/config";
  import { createContext, useState } from "react";
  
  export const AdminContext = createContext(null);
  
  export default function AdminProvider({ children }) {
    const [courseLandingFormData, setCourseLandingFormData] = useState(
      courseLandingInitialFormData
    );
    const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(
      courseCurriculumInitialFormData
    );
    const [mediaUploadProgress, setMediaUploadProgress] = useState(false);
    const [mediaUploadProgressPercentage, setMediaUploadProgressPercentage] =
      useState(0);
    const [adminCoursesList, setAdminCoursesList] = useState([]);
    const [adminUsersList, setAdminUsersList] = useState([]);
    const [currentEditedCourseId, setCurrentEditedCourseId] = useState(null);
  
    return (
      <AdminContext.Provider
        value={{
          courseLandingFormData,
          setCourseLandingFormData,
          courseCurriculumFormData,
          setCourseCurriculumFormData,
          mediaUploadProgress,
          setMediaUploadProgress,
          mediaUploadProgressPercentage,
          setMediaUploadProgressPercentage,
          adminCoursesList,
          setAdminCoursesList,
          currentEditedCourseId,
          setCurrentEditedCourseId,
          adminUsersList,
          setAdminUsersList
        }}
      >
        {children}
      </AdminContext.Provider>
    );
  }
  