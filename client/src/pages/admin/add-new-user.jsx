import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { addNewUserService, 
        fetchUserDetailsService, 
        updateUserByIdService,
        fetchAdminUserListService
} from "@/services";
import { AdminContext } from "@/context/admin-context";
import { Eye, EyeOff } from "lucide-react";

function AddNewUserPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const navigate = useNavigate();
  const params = useParams(); //params cua trinh duyet, userId
  const location = useLocation();
  const { user } = location.state || {};
  console.log("user", user );
  
//   const { adminUsersList, setAdminUsersList } =
//   useContext(AdminContext);
  const previousPage = location.state?.previousPage || "/admin/dashboard";

  const handleBack = () => {
    navigate(previousPage);
  };

  const [userFormData, setUserFormData] = useState({
    userName: "",
    userEmail: "",
    password: "",
    role: "",
  });

  const isEditPage = location.pathname.includes("edit-user");

  function validateFormData() {
    return (
      userFormData.userName.trim() &&
      userFormData.userEmail.trim() &&
      userFormData.password.trim() &&
      userFormData.role.trim()
    );
  }
//   async function fetchAllUsers() {
//     const response = await fetchAdminUserListService();
//     // console.log("fetchAllUsers response: ",response);
    
//     if (response?.success) {
//       setAdminUsersList(response?.data);
//       console.log("adminUsersList", adminUsersList);
      
      
//     };
//   }

  async function handleCreateOrUpdateUser() {
    const response = params?.userId
      ? await updateUserByIdService(params.userId, userFormData)
      : await addNewUserService(userFormData);

    if (response?.success) {
      setUserFormData({
        userName: "",
        userEmail: "",
        password: "",
        role: "",
      });
      navigate(-1);
    }

    console.log(response, "Response");
  }

  async function fetchCurrentUserDetails() {
    const response = await fetchUserDetailsService(params?.userId);

    if (response?.success) {
      setUserFormData(response?.data);
    }

    console.log(response, "Current User Data");
  }

  useEffect(() => {
    if (isEditPage && params?.userId) {
      fetchCurrentUserDetails();
    }
  }, [isEditPage, params?.userId]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-extrabold mb-5">
          {isEditPage ? "Edit User Details" : "Create a New User"}
        </h1>
        
      </div>
      <Card>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-left block text-sm font-bold mb-2 pt-5" htmlFor="userName">
                User Name
              </label>

              <input
                type="text"
                id="userName"
                className="w-full border rounded px-4 py-2"
                value={userFormData.userName}
                onChange={(e) =>
                  setUserFormData({ ...userFormData, userName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-left block text-sm font-bold mb-2" htmlFor="userEmail">
                Email
              </label>
              <input
                type="email"
                id="userEmail"
                className="w-full border rounded px-4 py-2"
                value={userFormData.userEmail}
                onChange={(e) =>
                  setUserFormData({ ...userFormData, userEmail: e.target.value })
                }
              />
            </div>
            {/* password */}
            {
              !isEditPage &&
              <div>
                  <label
                      className="text-left block text-sm font-bold mb-2"
                      htmlFor="password"
                      >
                      Password
                  </label>
                  <div className="relative">
                      <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="w-full border rounded px-4 py-2"
                      value={userFormData.password}
                      onChange={(e) =>
                        setUserFormData({ ...userFormData, password: e.target.value })
                      }
                      />
                      <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                      >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                      </button>
                  </div>
              </div>
            }

            {/* role */}
            <div>
              <label className="text-left block text-sm font-bold mb-2" htmlFor="role">
                Role
              </label>

              {user?.role == "admin" &&
                <p className="text-left text-lg ">{user?.role.toUpperCase()}</p>
              }
              {user?.role == "user" && (
                user?.courseCount === 0 ?
                    <select
                        id="role"
                        className="w-full border rounded px-4 py-2"
                        value={userFormData.role}
                        onChange={(e) =>
                        setUserFormData({ ...userFormData, role: e.target.value })
                        }
                    >
                        <option value="" disabled>
                        Select Role
                        </option>
                        <option value="admin">Admin</option>
                        <option value="instructor">Instructor</option>
                        <option value="user">User</option>
                    </select>
                :
                <>
                    <p className="text-left text-lg ">{user?.role.toUpperCase()}</p>
                    <p className="flex items-center text-sm text-red-600 bg-red-100 border border-red-200 rounded-md p-2 mt-2">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M12 16v2m0-16v2m8.485 4.515L12 4.485m8.485 15.03L12 19.515M3.515 19.515L12 19.515m0-15.03L3.515 4.485M4.485 12L4.485 4.485"
                    />
                    </svg>
                    This user's role cannot be edited because the user is taking courses!
                </p>
                </>
              )

              }
              {user?.role == "instructor" && (
                user?.courseCount === 0 ?
                    <select
                        id="role"
                        className="w-full border rounded px-4 py-2"
                        value={userFormData.role}
                        onChange={(e) =>
                        setUserFormData({ ...userFormData, role: e.target.value })
                        }
                    >
                        <option value="" disabled>
                        Select Role
                        </option>
                        <option value="admin">Admin</option>
                        <option value="instructor">Instructor</option>
                        <option value="user">User</option>
                    </select>
                : 
                <>
                    <p className="text-left">{user?.role.toUpperCase()}</p>
                    <p className="flex items-center text-sm text-red-600 bg-red-100 border border-red-200 rounded-md p-2 mt-2">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M12 16v2m0-16v2m8.485 4.515L12 4.485m8.485 15.03L12 19.515M3.515 19.515L12 19.515m0-15.03L3.515 4.485M4.485 12L4.485 4.485"
                        />
                        </svg>
                        This instructor's role cannot be edited because the instructor is taking courses!
                    </p>
                
                </>
                )
              }
              {
                !isEditPage && 
                <select
                    id="role"
                    className="w-full border rounded px-4 py-2"
                    value={userFormData.role}
                    onChange={(e) =>
                    setUserFormData({ ...userFormData, role: e.target.value })
                    }
                >
                    <option value="" disabled>
                    Select Role
                    </option>
                    <option value="admin">Admin</option>
                    <option value="instructor">Instructor</option>
                    <option value="user">User</option>
                </select>
              }                
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end mt-3">
        <Button onClick={handleBack} className="w-[100px] bg-red-500 hover:bg-red-800 text-white p-2 rounded mr-3">
            Cancel
        </Button>
        <Button
          disabled={!validateFormData()}
          className="w-[100px] bg-blue-500 hover:bg-blue-800 text-white p-2 rounded"
          onClick={handleCreateOrUpdateUser}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default AddNewUserPage;
