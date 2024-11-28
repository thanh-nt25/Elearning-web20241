import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminUsers({ listOfUsers }) {
  const navigate = useNavigate();

  const [sortCriteria, setSortCriteria] = useState({
    admin: "name",
    instructor: "name",
    user: "name",
  });

  const [searchQuery, setSearchQuery] = useState({
    admin: "",
    instructor: "",
    user: "",
  });

  const filteredAndSortedUsers = (role) => {
    const filteredUsers = listOfUsers
      .filter((user) => user.role === role)
      .filter((user) =>
        [user.userName.toLowerCase(), user.userEmail.toLowerCase()].some((field) =>
          field.includes(searchQuery[role].toLowerCase())
        )
      );

    const sorted = [...filteredUsers].sort((a, b) => {
      const criteria = sortCriteria[role];
      if (criteria === "name") return a.userName.localeCompare(b.userName);
      if (criteria === "email") return a.userEmail.localeCompare(b.userEmail);
      if (criteria === "courseCount") return (b.courseCount || 0) - (a.courseCount || 0);
      return 0;
    });

    return sorted;
  };

  const renderSortAndSearchMenu = (role) => (
    <div className="flex justify-end items-center mb-4 pt-4">
      <SearchIcon className="h-5 w-5 mr-2"/>
      <Input
        placeholder={`Search by name or email`}
        className="w-[300px] mr-2"
        value={searchQuery[role]}
        onChange={(e) =>
          setSearchQuery((prev) => ({ ...prev, [role]: e.target.value }))
        }
      />
      <Select
        value={sortCriteria[role]}
        onValueChange={(value) =>
          setSortCriteria((prev) => ({ ...prev, [role]: value }))
        }
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="email">Email</SelectItem>
          {role !== "admin" && <SelectItem value="courseCount">Course Count</SelectItem>}
        </SelectContent>
      </Select>
    </div>
  );

  // console.log("User by Id", listOfUsers.filter((userid) => _id === userid));
  
  const handleEditUser = (userId) => {
    navigate(`/admin/edit-user/${userId}`, {
      state: {
        previousPage: window.location.pathname,
        user: listOfUsers.find((user) => user._id === userId),
      },
    });
  };

  const renderTable = (role) => {
    const users = filteredAndSortedUsers(role);

    return (
      <Table className="w-full bg-white text-gray-700 border-collapse">
        <TableHeader className="bg-indigo-100">
          <TableRow>
            <TableHead className="text-left px-4 py-2">Name</TableHead>
            <TableHead className="text-left px-4 py-2">Email</TableHead>
            <TableHead className="text-left px-4 py-2">Role</TableHead>
            {role === "instructor" && (
              <TableHead className="text-center px-4 py-2">Course Created</TableHead>
            )}
            {role === "user" && (
              <TableHead className="text-center px-4 py-2">Course Attempt</TableHead>
            )}
            <TableHead className="text-right px-4 py-2">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0
            ? users.map((user, index) => (
                <TableRow
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <TableCell className="text-left font-medium px-4 py-2">
                    {user?.userName}
                  </TableCell>
                  <TableCell className="text-left px-4 py-2">
                    {user?.userEmail}
                  </TableCell>
                  <TableCell
                    className={`text-left px-4 py-2 ${
                      user?.role === "admin"
                        ? "text-red-600 font-bold"
                        : user?.role === "instructor"
                        ? "text-blue-700 font-bold"
                        : "text-gray-700"
                    }`}
                  >
                    {user?.role}
                  </TableCell>
                  {role === "instructor" && (
                    <TableCell className="text-center px-4 py-2 font-bold">
                      {user?.courseCount || 0}
                    </TableCell>
                  )}
                  {role === "user" && (
                    <TableCell className="text-center px-4 py-2 font-bold">
                      {user?.courseCount || 0}
                    </TableCell>
                  )}
                  <TableCell className="text-right px-4 py-2">


                    {user?.role === "admin" &&
                      <>
                        <Button
                          onClick={()=> handleEditUser(user?._id)}
                          variant="ghost"
                          size="sm"
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <Edit className="h-6 w-6" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-6 w-6" />
                        </Button>
                      </>
                    }
                    {user?.role === "instructor" && (user?.courseCount === 0 ? 
                      <>
                        <Button
                          onClick={()=> handleEditUser(user?._id)}
                          variant="ghost"
                          size="sm"
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <Edit className="h-6 w-6" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-6 w-6" />
                        </Button>
                      </> :
                      <Button
                          onClick={()=> handleEditUser(user?._id)}
                          variant="ghost"
                          size="sm"
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <Edit className="h-6 w-6" />
                      </Button>
                    )}
                    {user?.role === "user" && (user?.courseCount === 0 ? 
                      <>
                        <Button
                          onClick={()=> handleEditUser(user?._id)}
                          variant="ghost"
                          size="sm"
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <Edit className="h-6 w-6" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-6 w-6" />
                        </Button>
                      </> :
                      <Button
                          onClick={()=> handleEditUser(user?._id)}
                          variant="ghost"
                          size="sm"
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <Edit className="h-6 w-6" />
                        </Button>
                    )}

                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    );
  };

  return (
    <div>
      <Tabs defaultValue="admin" className="space-y-4">

        <div className="flex justify-between">
          <div>

            <TabsList>
              <TabsTrigger value="admin" className="px-6 py-2 font-bold">
                Admin
              </TabsTrigger>
              <TabsTrigger value="instructor" className="px-6 py-2 font-bold">
                Instructors
              </TabsTrigger>
              <TabsTrigger value="user" className="px-6 py-2 font-bold">
                Users
              </TabsTrigger>
            </TabsList>
          </div>

          <Button
            onClick={() => navigate("/admin/create-new-user")}
            className="bg-green-500 hover:bg-green-600 text-white rounded-md p-3"
            >
            Add New User
          </Button>
        </div>
        <TabsContent value="admin">
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-t-lg">
              <CardTitle className="text-left text-2xl font-bold">Admin</CardTitle>
            </CardHeader>
            <CardContent>
              {renderSortAndSearchMenu("admin")}
              {renderTable("admin")}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="instructor">
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-t-lg">
              <CardTitle className="text-left text-2xl font-bold">Instructors</CardTitle>
            </CardHeader>
            <CardContent>
              {renderSortAndSearchMenu("instructor")}
              {renderTable("instructor")}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="user">
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-t-lg">
              <CardTitle className="text-left text-2xl font-bold">Users</CardTitle>
            </CardHeader>
            <CardContent>
              {renderSortAndSearchMenu("user")}
              {renderTable("user")}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AdminUsers;
