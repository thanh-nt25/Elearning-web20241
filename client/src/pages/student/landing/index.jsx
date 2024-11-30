import { courseCategories } from "@/config";
import banner from "../../../assets/landing-page-banner.jpg";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";

function StudentLandingPage() {

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between py-16 px-6 lg:px-16">
        <div className="lg:w-1/2 lg:pr-12 text-center lg:text-left">
          <h1 className="text-5xl font-extrabold mb-6">
            Learning that Gets You Ahead
          </h1>
          <p className="text-lg mb-6">
            Skills for today and tomorrow. Start your learning journey with us.
          </p>
          <Button
            onClick={() => window.location.href = '/auth'}
            className="bg-yellow-400 text-black text-lg py-2 px-6 rounded-full shadow-md hover:bg-yellow-500 transition duration-300"
          >
            Join Us Today
          </Button>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <img
            src={banner}
            width={600}
            height={400}
            className="w-full h-auto rounded-lg shadow-xl transition-transform transform hover:scale-105"
            alt="Banner"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-6 bg-gray-50 text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-6">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold mb-4 text-blue-500">Expert Instructors</h3>
            <p className="text-center">
              Learn from top industry professionals who bring real-world expertise to the classroom.
            </p>
          </div>
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold mb-4 text-teal-500">Flexible Learning</h3>
            <p className="text-center">
              Study at your own pace with flexible schedules and lifetime access to course materials.
            </p>
          </div>
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold mb-4 text-purple-500">Practical Experience</h3>
            <p className="text-center">
              Gain hands-on experience with projects, quizzes, and assignments that prepare you for real-world challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 px-6 bg-gray-800 text-white">
        <h2 className="text-3xl font-bold text-center mb-6">What Our Students Say</h2>
        <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-8">
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg mb-6 sm:mb-0 max-w-xs">
            <p className="text-center text-lg italic mb-4">
              "The courses are amazing! I was able to transition into a new career with the skills I learned here."
            </p>
            <p className="text-center font-semibold">John Doe</p>
            <p className="text-center text-sm text-gray-600">Software Developer</p>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-xs">
            <p className="text-center text-lg italic mb-4">
              "The flexibility and expert guidance made my learning experience so valuable. Highly recommend!"
            </p>
            <p className="text-center font-semibold">Jane Smith</p>
            <p className="text-center text-sm text-gray-600">Marketing Specialist</p>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-12 bg-indigo-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
        <p className="text-lg mb-6">
          Take the first step towards a better future by enrolling in one of our courses today!
        </p>
        <Button
          onClick={() => window.location.href = '/auth'}
          className="bg-yellow-400 text-black py-3 px-8 text-xl rounded-full shadow-md hover:bg-yellow-500 transition duration-300"
        >
          Get Started
        </Button>
      </section>
    </div>
      
  );
}

export default StudentLandingPage;
