import { GraduationCap, TvMinimalPlay } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";

function StudentViewCommonHeader() {
  const navigate = useNavigate();
  const { auth, resetCredentials } = useContext(AuthContext);

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
    // localStorage.clear();
  }

  function handleLogin(params) {
    navigate("/auth");
  }

  return (
    <header className="flex items-center justify-between p-4 border-b relative">
      <div className="flex items-center space-x-4">
        {auth?.authenticate ? 
        <Link to="/home" className="flex items-center hover:text-black">
          <GraduationCap className="h-8 w-8 mr-4 " />
          <span className="font-extrabold md:text-xl text-[14px]">
            LMS LEARN
          </span>
        </Link> :
        <Link to="/" className="flex items-center hover:text-black">
          <GraduationCap className="h-8 w-8 mr-4 " />
          <span className="font-extrabold md:text-xl text-[14px]">
            LMS LEARN
          </span>
        </Link>
        }
        
        
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              onClick={() => {
                location.pathname.includes("/courses")
                  ? null
                  : navigate("/courses");
              }}
              className="text-[14px] md:text-[16px] font-medium"
            >
              Explore Courses
            </Button>
          </div>
        <div className="flex gap-4 items-center">
          {!auth?.authenticate ? 
          <Button 
            variant="ghost" 
            onClick={() => {
              location.pathname.includes("/about") ? null : navigate("/about");
            }} 
            className="text-[14px] md:text-[16px] font-medium"
          >
            About
          </Button> : 
          <Button 
            variant="ghost" 
            onClick={() => 
              navigate("/student-courses")
            } 
            className="text-[14px] md:text-[16px] font-medium"
          >
            My Courses
          </Button>
          
          }

          {auth?.authenticate &&
              <Button 
              variant="ghost" 
              onClick={() => 
                navigate("/account")
              } 
              className="text-[14px] md:text-[16px] font-medium"
            >
              Account
            </Button>
          }
          {auth?.authenticate ? <Button onClick={handleLogout}>Sign Out</Button> :
           <Button onClick={handleLogin}>Sign In</Button> }

           
        </div>
      </div>
    </header>
  );
}

export default StudentViewCommonHeader;
