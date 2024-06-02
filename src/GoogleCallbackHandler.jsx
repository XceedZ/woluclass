import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GoogleCallbackHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const user = {
      id: parseInt(queryParams.get("id")),
      google_id: queryParams.get("google_id"),
      username: queryParams.get("username"),
      email: queryParams.get("email"),
      fullname: queryParams.get("fullname"),
      nis: queryParams.get("nis"),
      role: queryParams.get("role"),
    };

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "false") { // Perbandingkan dengan string "false"
        navigate("/teacher/class");
      } else if (user.role === "true") { // Perbandingkan dengan string "true"
        navigate("/student/class");
      } else {
        navigate("/signup#next");
      }
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return <div>Loading...</div>;
};

export default GoogleCallbackHandler;
