import Logo from "../../assets/img/Logo.svg";
import Googlebutton from "./Googlebutton";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.role === "0" || user.role === "false") {
        navigate("/teacher/class");
      } else if (user.role === "1" || user.role === "true") {
        navigate("/student/class");
      }
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login gagal. Silakan periksa kembali username dan password Anda.");
      }

      const data = await response.json();
      const { token, user } = data;

      // Simpan token dan user ke localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect ke halaman yang sesuai berdasarkan role
      if (user.role === "false" || user.role === "0") {
        navigate("/teacher/class");
      } else if (user.role === "true" || user.role === "1") {
        navigate("/student/class");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form className="flex flex-col items-center justify-center h-screen bg-gray-400 font-custom px-4 font-Jakarta" onSubmit={(e) => e.preventDefault()}>
        <div className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 w-full max-w-md mt-1">
          <div className="mb-3 flex justify-center mt-2">
            <img src={Logo} alt="Logo" className="h-8 w-auto" />
          </div>
          <p className="justify-center align-middle container mx-auto text-center flex text-xs font-extrabold text-black mb-4">WOLU</p>
          <h2 className="text-xl mb-2 text-center font-bold">
            Selamat Datang di <span className="text-indigo-600">Wolu</span> <span className="text-yellow-500">Class</span>
          </h2>
          <p className="justify-center align-middle container mx-auto text-center flex text-[10px] text-neutral-400 mb-7">Buat akun atau masuk untuk mengakses web ini</p>
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
          <div className="mb-2">
            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="bg-neutral-200 appearance-none border rounded w-full py-3 px-4 text-black font-bold text-xs leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          <a className="text-xs">Lupa password?</a>
          <div className="flex items-center justify-center mt-7">
            <button
              className="bg-indigo-600 hover:bg-indigo-800 transition-all text-white py-3 px-24 text-sm rounded-lg focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div className="flex items-center justify-center align-middle mx-auto gap-7 container mt-8">
            <div className="w-20 h-[0.2px] bg-black"></div>
            <p className="text-[10px] font-semibold">Atau Dengan</p>
            <div className="w-20 h-[0.2px] bg-black"></div>
          </div>
          <div className="flex items-center justify-center align-middle mx-auto gap-5 container mt-8">
            <Googlebutton />
          </div>
          <div className="mt-8 text-center text-xs">
            Tidak punya akun?{" "}
            <a onClick={() => navigate("/signup")} href="#signup" className="text-blue-500">
              Daftar Sekarang
            </a>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
