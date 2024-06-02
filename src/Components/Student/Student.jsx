import Navbar from "./NavbarStudent";
import Buttonstudent from "../Student/Addclassstudent";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Student = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    // Jika role adalah null atau 0, arahkan ke /TeacherPage
    if (user?.role === "false" || user?.role === "0") {
      navigate("/teacher/class");
    }
  }, [navigate]);
  return (
    <>
      <div className="font-Jakarta">
        <Navbar />
        <Buttonstudent />
      </div>
    </>
  );
};

export default Student;
