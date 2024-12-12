// import { toast } from "react-toastify";
// import axiosInstance from "@/api/axiosInstance";

// export const handleApiResponse = async (apiCall) => {
//     try {
//       // Thực hiện API call
//       console.log("apiCall", apiCall);
      
//       const response = await apiCall();
//       console.log("response handleApiResponse", response);
      
  
//       // Kiểm tra phản hồi thành công
//       if (response?.status) {
//         toast.success(response.message || "Action completed successfully!");
//         return response; // Trả về dữ liệu thành công
//       }
  
//       // Nếu response.success là false
//       toast.error(response.message || "Action failed!");
//       return response; // Trả về phản hồi dù thất bại (nếu cần xử lý thêm)
  
//     } catch (error) {
//       // Xử lý lỗi bất ngờ (lỗi kết nối, lỗi server,...)
//       console.error("API Error:", error);
//       const errorMessage =
//         error.response?.data?.message || "An unexpected error occurred!";
//       toast.error(errorMessage);
  
//       // Ném lỗi để cho phép xử lý thêm ở cấp độ cao hơn nếu cần
//       throw error;
//     }
//   };