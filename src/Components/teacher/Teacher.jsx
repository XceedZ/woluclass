import Sidebar from "./NavbarUtama";
import Buttonandoverlay from "./Addclassteacher";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Teacher = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    // Jika role adalah true atau 1, arahkan ke /StudentPage
    if (user?.role === "true" || user?.role === "1") {
      navigate("/student/class");
    }
  }, [navigate]);
  return (
    <div className="h-full lg:overflow-y-hidden">
      <div className="overflow-x-hidden">
        <Sidebar />
      </div>

      <div className="-mt-10 overflow-y-hidden">
        <div>
          <h1 className="mt-20 text-3xl ml-16 font-semibold hidden lg:block">Your Class</h1>
          <Buttonandoverlay />
        </div>

      </div>
    </div>
  );
};

export default Teacher;
