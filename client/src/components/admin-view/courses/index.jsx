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
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { AdminContext } from "@/context/admin-context";
import { Trash2, Edit } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function AdminCourses({ listOfCourses }) {
  const navigate = useNavigate();
  const {
    setCurrentEditedCourseId,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  } = useContext(AdminContext);

  return (
    <Card className="bg-white shadow-lg border border-gray-200">
      <CardHeader className="flex justify-between flex-row items-center bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold">All Courses</CardTitle>
        {/* <Button
          onClick={() => {
            setCurrentEditedCourseId(null);
            setCourseLandingFormData(courseLandingInitialFormData);
            setCourseCurriculumFormData(courseCurriculumInitialFormData);
            navigate("/admin/create-new-course");
          }}
          className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-md p-3"
        >
          Create New Course
        </Button> */}
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="w-full bg-white text-gray-700 border-collapse">
            <TableHeader className="bg-indigo-100">
              <TableRow>
                <TableHead className="text-left px-4 py-2">Course</TableHead>
                <TableHead className="text-center px-4 py-2">Instructor</TableHead>
                <TableHead className="text-center px-4 py-2">Students</TableHead>
                <TableHead className="text-center px-4 py-2">Revenue</TableHead>
                <TableHead className="text-right px-4 py-2">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listOfCourses && listOfCourses.length > 0
                ? listOfCourses.map((course, index) => (
                    <TableRow
                      key={index}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <TableCell className="text-left font-medium px-4 py-2">
                        {course?.title}
                      </TableCell>
                      <TableCell className="text-center px-4 py-2">
                        {course?.instructorName}
                      </TableCell>
                      <TableCell className="text-center px-4 py-2">
                        {course?.students?.length}
                      </TableCell>
                      <TableCell className="text-center px-4 py-2">
                        ${course?.students?.length * course?.pricing}
                      </TableCell>
                      <TableCell className="text-right px-4 py-2">
                        {course?.students?.length == 0 ? (
                          <>
                            <Button
                              onClick={() => {
                                navigate(`/admin/edit-course/${course?._id}`);
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
                              <Trash2 className="h-6 w-6" />
                            </Button>
                          </>
                        ) : (
                          <span className="text-gray-500">
                            Course is currently active
                          </span>
                        )}
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

export default AdminCourses;
