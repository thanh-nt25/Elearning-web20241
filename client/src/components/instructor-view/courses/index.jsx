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
import { InstructorContext } from "@/context/instructor-context";
import { Delete, Edit } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function InstructorCourses({ listOfCourses }) {
  const navigate = useNavigate();
  const {
    setCurrentEditedCourseId,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  } = useContext(InstructorContext);

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-bold">All Courses</CardTitle>
        <Button
          onClick={() => {
            setCurrentEditedCourseId(null);
            setCourseLandingFormData(courseLandingInitialFormData);
            setCourseCurriculumFormData(courseCurriculumInitialFormData);
            navigate("/instructor/create-new-course");
          }}
          className="p-6"
        >
          Create New Course
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Course</TableHead>
                <TableHead className="text-center">Students</TableHead>
                <TableHead className="text-center">Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listOfCourses && listOfCourses.length > 0
                ? listOfCourses.map((course) => (
                    <TableRow>
                      <TableCell className="text-left font-medium">
                        {course?.title}
                      </TableCell>
                      <TableCell className="text-center">{course?.students?.length}</TableCell>
                      <TableCell className="text-center">
                        ${course?.students?.length * course?.pricing}
                      </TableCell>
                      <TableCell className="text-right">
                        {
                          course?.students?.length == 0 ? 
                          <>
                            <Button
                              onClick={() => {
                                navigate(`/instructor/edit-course/${course?._id}`);
                              }}
                              variant="ghost"
                              size="sm"
                            >
                              <Edit className="h-6 w-6" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Delete className="h-6 w-6" />
                            </Button>
                          </> : <span className="text-gray-500">Course is currently active</span>
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

export default InstructorCourses;
