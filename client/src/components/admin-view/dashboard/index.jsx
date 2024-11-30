import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, Users, BookOpen } from "lucide-react";

function AdminDashboard({ listOfCourses }) {
  function calculateDashboardMetrics() {
    const { totalStudents, totalProfit, studentList, totalCourses, topCourse } =
      listOfCourses.reduce(
        (acc, course) => {
          const studentCount = course.students.length;
          const courseRevenue = course.pricing * studentCount;

          acc.totalStudents += studentCount;
          acc.totalProfit += courseRevenue;
          acc.totalCourses += 1;

          // Update top performing course
          if (!acc.topCourse || courseRevenue > acc.topCourse.revenue) {
            acc.topCourse = {
              title: course.title,
              revenue: courseRevenue,
              students: studentCount,
            };
          }

          course.students.forEach((student) => {
            acc.studentList.push({
              courseTitle: course.title,
              courseInstructor: course.instructorName,
              studentName: student.studentName,
              studentEmail: student.studentEmail,
            });
          });

          return acc;
        },
        {
          totalStudents: 0,
          totalProfit: 0,
          studentList: [],
          totalCourses: 0,
          topCourse: null,
        }
      );

    return {
      totalProfit,
      totalStudents,
      studentList,
      totalCourses,
      topCourse,
    };
  }

  const metrics = calculateDashboardMetrics();

  const config = [
    {
      icon: Users,
      label: "Total Students",
      value: metrics.totalStudents,
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: `$${metrics.totalProfit.toFixed(2)}`,
      color: "bg-green-100 text-green-600",
    },
    {
      icon: BookOpen,
      label: "Total Courses",
      value: metrics.totalCourses,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      icon: BookOpen,
      label: "Top Course",
      value: metrics.topCourse ? metrics.topCourse.title : "N/A",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="bg-gray-50 ">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {config.map((item, index) => (
          <Card key={index} className={`${item.color} shadow-lg`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
              <item.icon className="h-6 w-6" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Course Details */}
      {metrics.topCourse && (
        <Card className="mb-8 shadow-xl border-2 border-indigo-500 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-indigo-700">
              Top Performing Course
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 p-4">
            <p className="font-bold mb-2">
              <strong className=" text-indigo-600">Title:</strong> {metrics.topCourse.title}
            </p>
            <p className="font-bold mb-2">
              <strong className="text-indigo-600">Revenue:</strong> ${metrics.topCourse.revenue.toFixed(2)}
            </p>
            <p className="font-bold mb-2">
              <strong className="text-indigo-600">Students Enrolled:</strong> {metrics.topCourse.students}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Students List */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Students List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="w-full table-fixed border-collapse bg-white text-gray-700">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left px-4 py-2 w-1/4">
                    Course Name
                  </TableHead>
                  <TableHead className="text-left px-4 py-2 w-1/4">
                    Instructor
                  </TableHead>
                  <TableHead className="text-left px-4 py-2 w-1/4">
                    Student Name
                  </TableHead>
                  <TableHead className="text-left px-4 py-2 w-1/4">
                    Student Email
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {metrics.studentList.map((studentItem, index) => (
                  <TableRow key={index} className="border-b">
                    <TableCell className="text-left font-medium px-4 py-2 w-1/4">
                      {studentItem.courseTitle}
                    </TableCell>
                    <TableCell className="text-left px-4 py-2 w-1/4">
                      {studentItem.courseInstructor}
                    </TableCell>
                    <TableCell className="text-left px-4 py-2 w-1/4">
                      {studentItem.studentName}
                    </TableCell>
                    <TableCell className="text-left px-4 py-2 w-1/4">
                      {studentItem.studentEmail}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
