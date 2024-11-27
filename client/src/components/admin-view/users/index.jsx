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
import { Delete, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminUsers({ listOfUsers }) {
  const navigate = useNavigate();
  console.log("listOfUsers: ", listOfUsers);
  
  const sortedUsers = listOfUsers
    ? [...listOfUsers].sort((a, b) =>
        a.role.localeCompare(b.role, "en", { sensitivity: "base" })
      )
    : [];

  return (
    <Card className="bg-white shadow-lg border border-gray-200">
      <CardHeader className="flex justify-between flex-row items-center bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold">All Users</CardTitle>
        <Button
          onClick={() => navigate("/admin/create-new-user")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-md p-3"
        >
          Add New User
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="w-full bg-white text-gray-700 border-collapse">
            <TableHeader className="bg-indigo-100">
              <TableRow>
                <TableHead className="text-left px-4 py-2">Name</TableHead>
                <TableHead className="text-left px-4 py-2">Email</TableHead>
                <TableHead className="text-left px-4 py-2">Role</TableHead>
                <TableHead className="text-left px-4 py-2">Courses</TableHead>
                <TableHead className="text-right px-4 py-2">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers && sortedUsers.length > 0
                ? sortedUsers.map((user, index) => (
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
                            ? "text-red-600  font-bold"
                            : user?.role === "instructor"
                            ? "text-blue-700  font-bold"
                            : "text-gray-700"
                        }`}
                      >
                        {user?.role}
                      </TableCell>
                      <TableCell className="text-center px-4 py-2 font-bold">
                        {user?.courseCount}
                      </TableCell>  
                      <TableCell className="text-right px-4 py-2">
                        {
                          user?.role === "user" &&
                        <>
                          <Button
                            onClick={() => {
                              navigate(`/admin/edit-user/${user?._id}`);
                            }}
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
                            <Delete className="h-6 w-6" />
                          </Button>
                        </>
                        }
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminUsers;
