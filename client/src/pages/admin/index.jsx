import React from "react";
import AdminAvatarDefautl from "./assets/admin.jpg"
import AdminCourses from "@/components/admin-view/courses";
import AdminUsers from "@/components/admin-view/users";
import AdminDashboard from "@/components/admin-view/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthContext } from "@/context/auth-context";
import { AdminContext } from "@/context/admin-context";
import { fetchAdminCourseListService, fetchAdminUserListService } from "@/services";
import { BarChart, Book, LogOut, User } from "lucide-react";
import { useContext, useEffect, useState } from "react";

function AdminDashboardpage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { auth, resetCredentials } = useContext(AuthContext);
  const { adminCoursesList, setAdminCoursesList } =
    useContext(AdminContext);
  const { adminUsersList, setAdminUsersList } =
    useContext(AdminContext);

  async function fetchAllCourses() {
    const response = await fetchAdminCourseListService();
    
    if (response?.success) {
      setAdminCoursesList(response?.data);
    };
  }

  async function fetchAllUsers() {
    const response = await fetchAdminUserListService();
    console.log("fetchAllUsers response: ",response);
    
    if (response?.success) {
      setAdminUsersList(response?.data);
    };
  }

  useEffect(() => {
    fetchAllCourses();
    fetchAllUsers();
  }, []);
  // console.log(adminCoursesList, "adminCoursesList");
  
  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <AdminDashboard listOfCourses={adminCoursesList} />,
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <AdminCourses listOfCourses={adminCoursesList} />,
    },

    {
      icon: User,
      label: "User",
      value: "user",
      component: <AdminUsers listOfUsers={adminUsersList} />,
    },
   
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null,
    },
  ];

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  // console.log(adminCoursesList, "adminCoursesList");

  return (
    <div className="flex h-full min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-indigo-600 via-indigo-500 to-indigo-400 text-white shadow-lg hidden md:block">
        <div className="p-4">
          {/* Admin Info */}
          <div className="pb-4 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Admin View</h2>
            <img
              src={AdminAvatarDefautl}
              alt="Admin Avatar"
              className="w-24 h-24 rounded-full mb-2 object-cover border-4 border-white shadow-md"
            />
            <span>
              <p className="text-lg font-medium">{auth?.user.userName}</p>
            </span>
          </div>
          {/* Navigation */}
          <nav>
            {menuItems.map((menuItem) => (
              <Button
                className={`w-full justify-start mb-2 ${
                  activeTab === menuItem.value
                    ? "bg-indigo-700 text-white"
                    : "bg-transparent hover:bg-indigo-500"
                }`}
                key={menuItem.value}
                onClick={
                  menuItem.value === "logout"
                    ? handleLogout
                    : () => setActiveTab(menuItem.value)
                }
              >
                <menuItem.icon className="mr-2 h-5 w-5" />
                {menuItem.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto bg-white shadow-inner">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-indigo-600">Dashboard</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItems.map((menuItem) => (
              <TabsContent value={menuItem.value}>
                {menuItem.component !== null ? menuItem.component : null}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboardpage;
