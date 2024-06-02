import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Googlebutton from "./Googlebutton";
import Logo from "../../assets/img/Logo.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpPage = ({ onNavigateToLogin }) => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.hash === "#next") {
      onNavigateToLogin();
    }
  }, [onNavigateToLogin]);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length >= 8) {
      setPasswordStrength("Strong");
    } else if (newPassword.length >= 6) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Weak");
    }
  };

  const showToast = (message) => {
    toast.info(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      bodyClassName: "toast-body",
      className: "toast-container",
    });
  };

  const handleNext = () => {
    const emailRegex = /@gmail\.com$|@yahoo\.com$/;

    if (!email || !fullname || !password || password.length < 8) {
      showToast("Semua kolom harus diisi dan password minimal 8 karakter");
    } else if (!emailRegex.test(email)) {
      showToast("Email harus valid");
    } else {
      const signupData = JSON.stringify({ email, fullname, password });
      localStorage.setItem("signupData", signupData);
      onNavigateToLogin();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400 px-4 font-custom font-Jakarta">
      <ToastContainer />
      <form className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-full max-w-md mt-1">
        <div className="mb-3 flex justify-center mt-2">
          <img src={Logo} alt="Logo" className="h-8 w-auto" />
        </div>
        <p className="justify-center align-middle container mx-auto text-center flex text-xs font-extrabold text-black mb-4">WOLU</p>
        <h2 className="text-xl mb-7 text-center font-bold">
          Sign Up To <span className="text-indigo-600">Wolu</span> <span className="text-yellow-500">Class</span>
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            className="bg-neutral-200 appearance-none border rounded w-full py-3 px-4 text-black font-bold text-xs leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="fullname">
            Fullname
          </label>
          <input
            className="bg-neutral-200 appearance-none border rounded w-full py-3 px-4 text-black font-bold text-xs leading-tight focus:outline-none focus:shadow-outline"
            id="fullname"
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="bg-neutral-200 appearance-none border rounded w-full py-3 px-4 text-black font-bold text-xs leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {passwordStrength && <p className={`text-xs float-end mt-4 ${passwordStrength === "Weak" ? "text-red-500" : passwordStrength === "Medium" ? "text-yellow-500" : "text-green-500"}`}>{passwordStrength}</p>}
        </div>
        <div className="flex items-center justify-center mt-7">
          <button
            className="bg-white text-xs border-2 border-solid transition-all border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white font-bold py-2 px-20 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
        <div className="flex items-center justify-center align-middle mx-auto gap-2 container mt-4">
          <div className="w-20 h-[0.2px] bg-black"></div>
          <p className="text-xs">Or With</p>
          <div className="w-20 h-[0.2px] bg-black"></div>
        </div>
        <div className="flex items-center justify-center align-middle mx-auto gap-5 container mt-4">
          <Googlebutton />
        </div>
        <div className="mt-6 text-center text-xs">
          Already have an account?{" "}
          <a onClick={() => navigate("/login")} href="#login" className="text-blue-500">
            Login now
          </a>
        </div>
      </form>
    </div>
  );
};

SignUpPage.propTypes = {
  onNavigateToLogin: PropTypes.func.isRequired,
};

const LoginPage = ({ onLogin, prefilledData }) => {
  const [username, setUsername] = useState("");
  const [nis, setNis] = useState("");
  const [error, setError] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (prefilledData) {
      setUsername(prefilledData.username || "");
      setNis(prefilledData.nis || "");
    }
  }, [prefilledData]);

  const handleClick = (option) => {
    setSelectedOption(option);
  };

  const handleLogin = () => {
    if (!username || !nis || selectedOption === null) {
      setError("Semua kolom harus diisi");
      setTimeout(() => setError(""), 3000); // Menghapus pesan kesalahan setelah 3 detik
    } else {
      const storedSignupData = JSON.parse(localStorage.getItem("signupData"));
      const signupData = {
        ...storedSignupData,
        username,
        nis,
        role: selectedOption
      };
      localStorage.setItem("signupData", JSON.stringify(signupData));
      onLogin(signupData);
    }
  };

  return (
    <form className="flex flex-col items-center justify-center h-screen bg-gray-400 font-custom px-4 py-2 overflow-y-hidden font-Jakarta">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md mt-4">
        <div className="mb-3 flex justify-center mt-2">
          <img src={Logo} alt="Logo" className="h-8 w-auto" />
        </div>
        <p className="justify-center align-middle container mx-auto text-center flex text-xs font-extrabold text-black mb-4">WOLU</p>
        <h2 className="text-xl mb-6 text-center font-bold">
          Sign Up To <span className="text-indigo-600">Wolu</span> <span className="text-yellow-500">Class</span>
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="bg-neutral-200 appearance-none border rounded w-full py-3 px-4 text-black font-bold text-xs leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="nis">
            NIS
          </label>
          <input
            className="bg-neutral-200 appearance-none border rounded w-full py-3 px-4 text-black font-bold text-xs leading-tight focus:outline-none focus:shadow-outline"
            id="nis"
            type="number"
            value={nis}
            onChange={(e) => setNis(e.target.value)}
          />
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="privacy-policy">
              <input className="mr-2 leading-tight" type="checkbox" id="privacy-policy" required />Saya setuju dengan kebijakan privasi dan syarat penggunaan situs ini.
            </label>
          </div>
        </div>
        <div className="flex items-center justify-center align-middle mx-auto gap-10 container">
          <label className={`relative flex items-center ${selectedOption === "1" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"} transition-all duration-300`}>
            <input type="radio" name="role" value="1" className="absolute opacity-0" onClick={() => handleClick("1")} />
            <span className="px-6 py-3 rounded-full cursor-pointer select-none text-xs font-semibold">Student</span>
          </label>
          <label className={`relative flex items-center ${selectedOption === "0" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"} transition-all duration-300`}>
            <input type="radio" name="role" value="0" className="absolute opacity-0" onClick={() => handleClick("0")} />
            <span className="px-6 py-3 rounded-full cursor-pointer select-none text-xs font-semibold">Teacher</span>
          </label>
        </div>
        {error && <p className="text-red-500 mb-2 text-sm text-center">{error}</p>}
        <div className="flex items-center justify-center mt-7">
          <button className="bg-indigo-600 hover:bg-indigo-800 transition-all text-white py-3 px-24 text-sm rounded-lg focus:outline-none focus:shadow-outline" type="button" onClick={handleLogin}>
            Register
          </button>
        </div>
        <div className="flex items-center justify-center align-middle mx-auto gap-2 container mt-6">
          <div className="w-20 h-[0.2px] bg-black"></div>
          <p className="text-xs">Atau Dengan</p>
          <div className="w-20 h-[0.2px] bg-black"></div>
        </div>
        <div className="flex items-center justify-center align-middle mx-auto gap-5 container mt-6">
          <Googlebutton />
        </div>
      </div>
    </form>
  );
};

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
  prefilledData: PropTypes.object,
};

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = localStorage.getItem("role");
      if (role === "0") {
        navigate("/teacher/class");
      } else if (role === "1") {
        navigate("/student/class");
      }
    } else if (window.location.hash === "#next") {
      setIsSignUp(false);
    }
  }, [navigate]);

  const handleNavigateToLogin = () => {
    setIsSignUp(false);
  };

  const handleLogin = (data) => {
    const storedSignupData = JSON.parse(localStorage.getItem("signupData"));
    const { email, fullname, password } = storedSignupData;
    const { username, nis, role } = data;

    fetch("http://127.0.0.1:8000/api/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        fullname,
        password,
        username,
        nis,
        role,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message || 'Network response was not ok');
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          alert("Registrasi berhasil!");
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", role);
          if (role === "0") { // Check for teacher
            navigate("/teacher/class");
          } else if (role === "1") { // Check for student
            navigate("/student/class");
          }
        } else {
          alert(data.message);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat registrasi. Silakan coba lagi.");
      });
  };

  return (
    <>{isSignUp ? <SignUpPage onNavigateToLogin={handleNavigateToLogin} /> : <LoginPage onLogin={handleLogin} prefilledData={JSON.parse(localStorage.getItem("signupData"))} />}</>
  );
};

export default AuthPage;
