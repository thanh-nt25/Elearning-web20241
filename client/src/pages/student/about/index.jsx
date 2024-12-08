import { Button } from "@/components/ui/button";
import team1 from "../../../assets/team1.jpg";
import team2 from "../../../assets/team2.jpg";
import team3 from "../../../assets/team3.jpg";


function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-green-400 to-teal-500 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg mb-6">
          Learn more about our mission, values, and how we are revolutionizing online learning!
        </p>
        <Button
          onClick={()=> {}}
          className="bg-yellow-400 text-black py-2 px-6 rounded-full shadow-md hover:bg-yellow-500 transition duration-300"
        >
          Contact Us
        </Button>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6">Our Mission</h2>
        <p className="text-xl text-center max-w-3xl mx-auto">
          We aim to make high-quality education accessible to everyone, regardless of background, location, or financial status.
          Our platform offers a wide range of courses to help learners advance in their careers, gain new skills, and pursue their passions.
        </p>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-teal-500 mb-4">Accessibility</h3>
            <p className="text-center">
              We believe that education should be accessible to all, which is why we offer courses at affordable prices with flexible learning schedules.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-500 mb-4">Quality</h3>
            <p className="text-center">
              Our courses are designed by industry experts to provide the highest quality learning experience, ensuring that you gain valuable, real-world skills.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-purple-500 mb-4">Innovation</h3>
            <p className="text-center">
              We continually innovate our platform and course offerings, ensuring that you stay ahead of the curve in your learning journey.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6">Meet the Team</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md max-w-xs">
            <img
              src={team1}
              alt="Team Member"
              className="rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">John Doe</h3>
            <p className="text-sm text-gray-600">CEO & Founder</p>
          </div>
          <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md max-w-xs">
            <img
              src={team2}
              alt="Team Member"
              className="rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">Jane Smith</h3>
            <p className="text-sm text-gray-600">Lead Instructor</p>
          </div>
          <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md max-w-xs">
            <img
              src={team3}
              alt="Team Member"
              className="rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">Alex Johnson</h3>
            <p className="text-sm text-gray-600">Product Manager</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-teal-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Join Us Today</h2>
        <p className="text-lg mb-6">
          Become a part of our growing learning community and start your journey to success!
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

export default AboutPage;
