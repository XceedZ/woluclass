import { useState, useEffect } from "react";
import Navbar from "../Student/NavbarStudent";
import { useNavigate } from "react-router-dom";
import Icon from "../../assets/img/Iconquiz.svg";
import Iconaccount from "../../assets/img/Account.jpg";
import Noquiz from "../../assets/img/Noquiz.svg";

const className = localStorage.getItem("selectedClassName"); // Ambil class_name dari local storage
const classId = localStorage.getItem("selectedClassId");

const QuizStudentComponent = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/classes/${classId}/quizzes`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setQuizzes(result);
        } else {
          console.error("Error response:", await response.text());
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, [classId]);

  const handleQuizClick = (quizId) => {
    localStorage.setItem("selectedQuizId", quizId);
    navigate("/Answeryourquiz");
  };

  return (
    <div className="font-Jakarta">
      <Navbar />
      <nav className="bg-white p-4 px-12 py-7 font-Jakarta lg:float-left border-b-2 lg:w-full 2xl:w-full border-none">
        <ul className="flex justify-between items-center lg:gap-14 lg:float-left 2xl:gap-24 2xl:float-left">
          <li className="mr-2">
            <a onClick={() => navigate("/student/class/task")} className="text-black hover:text-indigo-600 hover:border-b-4 hover:border-indigo-600 w-56 font-semibold transition-all">
              Task
            </a>
          </li>
          <li className="mr-2">
            <a onClick={() => navigate("/student/class/quiz")} className="text-indigo-600 hover:text-indigo-600 border-b-4 border-indigo-600 w-56 font-semibold transition-all">
              Quiz
            </a>
          </li>
          <li className="mr-2">
            <a onClick={() => navigate("/student/class/members")} className="text-black hover:text-indigo-600 hover:border-b-4 hover:border-indigo-600 w-56 font-semibold transition-all">
              Member
            </a>
          </li>
          <li>
            <a onClick={() => navigate("/Forumstudent")} className="text-black hover:text-indigo-600 hover:border-b-4 hover:border-indigo-600 w-56 font-semibold transition-all">
              Forum
            </a>
          </li>
        </ul> 
      </nav>
      <div className="flex justify-center align-middle items-center mx-auto container gap-6 mt-7 ml-1 font-Jakarta lg:mt-28 2xl:mt-32">
        <h1 className="text-black font-semibold text-2xl lg:text-3xl 2xl:ml-60">{className}</h1>
        <button className="text-white bg-indigo-600 w-16 h-7 font-semibold rounded-md text-xs lg:ml-[30rem] lg:w-20 lg:h-9 2xl:ml-[55rem]">Share</button>
        <div className="relative flex-row -ml-4">
          <button className="flex items-center justify-center w-8 h-8 bg-white rounded-full focus:outline-none focus:bg-gray-300 lg:block lg:ml-6">
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={3.75} d="M12 12h.01v.01H12zm0-7h.01v.01H12zm0 14h.01v.01H12z"></path>
            </svg>
          </button>
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
        </div>
      </div>
      <div className="flex gap-6 mt-10 bg-neutral-100 p-3 font-Jakarta">
        <h1 className="text-green-500 font-semibold ml-3 lg:ml-48 2xl:ml-60">Online</h1>
        <div className="flex gap-2">
          <img className="w-7 h-7 rounded-full" src={Iconaccount}></img>
          <img className="w-7 h-7 rounded-full" src={Iconaccount}></img>
          <img className="w-7 h-7 rounded-full" src={Iconaccount}></img>
          <img className="w-7 h-7 rounded-full" src={Iconaccount}></img>
          <img className="w-7 h-7 rounded-full" src={Iconaccount}></img>
        </div>
      </div>
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <div key={quiz.id} className="border rounded-lg p-4 mb-4 flex w-[23rem] items-center align-middle container mx-auto lg:w-[28rem] 2xl:w-[35rem] mt-5 relative">
            <div className="mr-4 lg:mr-7">
              <img src={Icon} alt="Quiz Icon" className="w-12" />
            </div>
            <div className="flex-1 lg:mt-3">
              <div className="flex justify-between mb-2">
                <h2 onClick={() => handleQuizClick(quiz.id)} className="text-lg font-semibold cursor-pointer">{quiz.title}</h2>
                <p className="text-sm text-gray-600">{quiz.questions.length} Questions</p>
              </div>
              <div className="text-xs text-gray-600">
                {new Date(quiz.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} - <span className="text-red-500 font-semibold">Ready!</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col justify-center items-center mx-auto container mt-20">
          <img className="lg:w-60 2xl:w-72" src={Noquiz} alt="No Quiz" />
        </div>
      )}
    </div>
  );
};

export default QuizStudentComponent;
