import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";

function AccountStudent() {
    const { auth } = useContext(AuthContext);
    
    if (!auth?.user) {
        return <p>Can not fetch user data!</p>;
    }

    return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-lg bg-white">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-left">
          Account Information
        </h1>
        <div className="space-y-4">
          <div className="flex flex-col text-left">
            <label className="text-gray-600 font-medium">Username</label>
            <p className="text-gray-800">{auth.user.userName}</p>
          </div>
          <div className="flex flex-col text-left">
            <label className="text-gray-600 font-medium">Email</label>
            <p className="text-gray-800">{auth.user.userEmail}</p>
          </div>
        </div>
        
      </div>
    );
}

export default AccountStudent;