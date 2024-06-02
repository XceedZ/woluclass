import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Navbar from "./NavbarStudent";
import { useNavigate } from "react-router-dom";


const Accountteachercomponent = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const getAvatarUrl = (name) => {
    return `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(name)}&fontSize=41&chars=1`;
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const renderAvatar = (size = "w-16 h-16") => {
    if (user.avatar) {
      return <img className={`${size} rounded-full`} src={user.avatar} alt="Avatar" />;
    } else if (user.fullname) {
      return <img className={`${size} rounded-full`} src={getAvatarUrl(user.fullname)} alt="Avatar" />;
    }
    return null;
  };
  const getUserType = () => {
    if (typeof user.role === "string") {
      return user.role === "false" ? "Teacher" : "Student";
    } else if (typeof user.role === "number") {
      return user.role === 0 ? "Teacher" : "Student";
    }
    return "Unknown";
  };

  return (
    <div className="font-Jakarta">
      <Navbar />
      <div className="p-6 lg:mt-10 2xl:flex-row 2xl:mx-auto 2xl:justify-center 2xl:item-center 2xl:ml-40">
        <h1 className="text-2xl font-semibold lg:ml-52">Your Profile</h1>
        <div className="px-4 mt-5 lg:ml-48">
          <div className="border-2 border-solid border-neutral-300 rounded-lg p-7 flex lg:grid lg:p-8 lg:w-fit">
            {renderAvatar("w-16 h-16 ml-4 lg:ml-6")}
            <h1 className="text-base font-semibold mt-6 ml-5 lg:ml-0">{user.fullname}</h1>
          </div>
        </div>

        <div className="flex gap-6 ml-4 mt-3 lg:ml-52 lg:mt-5 lg:gap-11">
          <button className="text-sm text-indigo-600 font-semibold lg:text-xs">Switch Account</button>
          <button onClick={handleLogout} className="text-sm text-red-500 font-semibold lg:text-xs">Log Out</button>
        </div>
        <div className="ml-4 mt-10 lg:float-right lg:-mt-56 lg:w-full lg:-mr-56">
          <p className="text-base font-semibold lg:ml-[24.5rem] 2xl:ml-[38rem]">Type</p>
          <p className="text-xs font-semibold text-neutral-400 mt-3 lg:ml-[24.5rem] 2xl:ml-[38rem]">
          {getUserType()}
          </p>
          <div className="max-w-md mx-auto rounded-md mt-5 lg:mt-2">
            <div className="mb-4 mt-7">
              <label htmlFor="school" className="block text-sm font-semibold mb-1">
                School
              </label>
              <input type="text" id="school" name="school" className="w-full border-gray-300 rounded-md px-5 py-3 bg-neutral-200 focus:outline-none text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-semibold mb-1">
                Subject
              </label>
              <input placeholder="Optional" type="text" id="subject" name="subject" className="w-full border-gray-300 rounded-md px-5 py-3 bg-neutral-200 focus:outline-none text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="bio" className="block text-sm font-semibold mb-1">
                Bio
              </label>
              <textarea placeholder="Enter your bio..." id="bio" name="bio" rows="4" className="w-full border-gray-300 rounded-md px-5 py-3 bg-neutral-200 focus:outline-none text-sm resize-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SwitchButton = ({ label, checked, setChecked }) => {
  const toggleSwitch = () => {
    setChecked(!checked);
  };

  return (
    <li className="flex items-center justify-between rounded-md px-4 py-2 mt-5">
      <span className="text-sm font-semibold">{label}</span>
      <div className={`switch w-10 h-6 rounded-full ${checked ? "bg-indigo-600" : "bg-gray-300"} transition-all duration-300`} onClick={toggleSwitch}>
        <div className={`slider w-4 h-4 mt-[0.25rem] ml-1 rounded-full ${checked ? "transform translate-x-full bg-white" : "bg-white"} transition-all duration-300`} />
      </div>
    </li>
  );
};

SwitchButton.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
};

export default Accountteachercomponent;
