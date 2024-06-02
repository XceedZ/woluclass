import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavbarStudent";

const Membercomponent = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const classId = localStorage.getItem("selectedClassId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/classes/${classId}/members`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        setMembers(data.users);
      } catch (error) {
        console.error("Error fetching members:", error);
        setMembers([]);
      }
    };

    if (classId) {
      fetchMembers();
    }
  }, [classId, token]);

  const getAvatarUrl = (name) => {
    return `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(name)}&fontSize=41&chars=1`;
  };

  const className = localStorage.getItem("selectedClassName"); // Ambil class_name dari local storage

  return (
    <div className="font-Jakarta">
      <Navbar />
      <nav className="bg-white p-4 px-12 py-7 font-Jakarta lg:float-left border-b-2 border-neutral-300 lg:w-full 2xl:w-full">
        <ul className="flex justify-between items-center lg:gap-14 lg:float-left 2xl:gap-24 2xl:float-left">
          <li className="mr-2">
            <a onClick={() => navigate("/student/class/task")} className="text-black hover:text-indigo-600 hover:border-b-4 hover:border-indigo-600 w-56 font-semibold transition-all">
              Task
            </a>
          </li>
          <li className="mr-2">
            <a onClick={() => navigate("/student/class/quiz")} className="text-black hover:text-indigo-600 hover:border-b-4 hover:border-indigo-600 w-56 font-semibold transition-all">
              Quiz
            </a>
          </li>
          <li className="mr-2">
            <a onClick={() => navigate("/teacher/class/members")} href="#" className="text-indigo-600 hover:text-indigo-600 border-b-4 border-indigo-600 w-56 font-semibold transition-all">
              Member
            </a>
          </li>
          <li>
            <a onClick={() => navigate("/Forumstudent")} href="#" className="text-black hover:text-indigo-600 hover:border-b-4 hover:border-indigo-600 w-56 font-semibold transition-all">
              Forum
            </a>
          </li>
        </ul>
      </nav>
      <div className="flex justify-center align-middle items-center mx-auto container gap-28 mt-7 ml-1 font-Jakarta lg:mt-20 2xl:mt-32 lg:gap-[30rem] lg:border-b-neutral-300 lg:border-b-2 lg:py-8 2xl:gap-[60rem] 2xl:border-none 2xl:w-full">
        <h1 className="text-black font-semibold text-2xl lg:text-3xl 2xl:ml-60">{className}</h1>
        <div className="relative flex-row -ml-4">
          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-center w-8 h-8 bg-white rounded-full focus:outline-none focus:bg-gray-300 lg:block lg:ml-6">
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={3.75} d="M12 12h.01v.01H12zm0-7h.01v.01H12zm0 14h.01v.01H12z"></path>
            </svg>
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Menu Item 1
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Menu Item 2
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Menu Item 3
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="px-5 mt-10 lg:px-[56rem] lg:-ml-[53rem] 2xl:px-[88rem] 2xl:-ml-[85rem] 2xl:mt-20">
        <div className="border-b-indigo-600 py-6 px-2 border-b-2">
          <h1 className="text-indigo-600 text-2xl font-semibold">Member</h1>
        </div>
      </div>
      <div className="container mx-auto align-middle items-center flex justify-start p-4 lg:ml-[35rem]">
        <ul className="grid grid-cols-1">
          {members.map((member) => (
            <li key={member.id} className="pl-4 pt-6 rounded-lg flex items-center">
              <img src={getAvatarUrl(member.fullname)} alt={member.fullname} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full" />
              <span className="ml-7 lg:ml-10 lg:text-xl">{member.fullname}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Membercomponent;
