import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavbarUtama";
import Iconaccount from "../../assets/img/Account.jpg";
import Noquiz from "../../assets/img/Noquiz.svg";
import Penicon from "../../assets/img/Pen.svg";
import Icon from "../../assets/img/Iconquiz.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuizComponent = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [timer, setTimer] = useState("");
  const [questions, setQuestions] = useState([]);
  const [uploadedQuizzes, setUploadedQuizzes] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const className = localStorage.getItem("selectedClassName");
  const classId = localStorage.getItem("selectedClassId");

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
          setUploadedQuizzes(result);
        } else {
          const errorData = await response.text();
          console.error("Error response:", errorData);
          toast.error("Gagal mengambil daftar kuis.");
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        toast.error("Terjadi kesalahan saat mengambil daftar kuis.");
      }
    };

    fetchQuizzes();
  }, [classId]);

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTimerChange = (e) => {
    setTimer(e.target.value);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, image: null, file: null }]);
  };

  const handleUploadQuiz = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("deadline", deadline);
    formData.append("timer", timer);
    formData.append("class_id", classId);
  
    questions.forEach((question, index) => {
      const questionInput = document.getElementById(`question${question.id}`);
      const answerAInput = document.getElementById(`answerA${question.id}`);
      const answerBInput = document.getElementById(`answerB${question.id}`);
      const answerCInput = document.getElementById(`answerC${question.id}`);
      const answerDInput = document.getElementById(`answerD${question.id}`);
      
      if (questionInput && answerAInput && answerBInput && answerCInput && answerDInput) {
        formData.append(`questions[${index}][question]`, questionInput.value);
        formData.append(`questions[${index}][answers][0][answer]`, answerAInput.value);
        formData.append(`questions[${index}][answers][1][answer]`, answerBInput.value);
        formData.append(`questions[${index}][answers][2][answer]`, answerCInput.value);
        formData.append(`questions[${index}][answers][3][answer]`, answerDInput.value);
  
        ["A", "B", "C", "D"].forEach((option, i) => {
          const optionCheckbox = document.getElementById(`option${option}${question.id}`);
          if (optionCheckbox) {
            formData.append(`questions[${index}][answers][${i}][is_correct]`, optionCheckbox.checked ? 1 : 0);
          }
        });
  
        if (question.file) {
          formData.append(`questions[${index}][image]`, question.file);
        }
      }
    });
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/quizzes`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
  
      const textResponse = await response.text(); // Menangkap respon sebagai teks
      if (response.ok) {
        const result = JSON.parse(textResponse); // Parsing teks sebagai JSON
        setUploadedQuizzes([...uploadedQuizzes, result]);
        toast.success("Quiz berhasil diunggah!");
      } else {
        console.error("Error response:", textResponse);
        toast.error("Gagal mengunggah quiz.");
      }
    } catch (error) {
      console.error("Error uploading quiz:", error);
      toast.error("Terjadi kesalahan saat mengunggah quiz.");
    }
  
    setShowOverlay(false);
    setQuestions([]);
    setDeadline("");
    setTimer("");
  };
  
  
  

  const handleImageUpload = (event, questionId) => {
    const file = event.target.files[0];
    const updatedQuestions = questions.map((q) =>
      q.id === questionId ? { ...q, image: URL.createObjectURL(file), file: file } : q
    );
    setQuestions(updatedQuestions);
  };

  const handleShare = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/classes/${classId}/share`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        const data = await response.json();
        const link = data.share_link;
        setShareLink(link);

        if (navigator.share) {
          navigator.share({
            title: `Bagikan Kelas ${className}`,
            text: `Bergabunglah dengan kelas ${className} melalui link berikut:`,
            url: link,
          })
            .then(() => {
              toast.success("Kelas berhasil dibagikan!");
            })
            .catch((error) => {
              console.error("Error sharing class:", error);
              toast.error("Gagal membagikan kelas.");
            });
        } else {
          navigator.clipboard.writeText(link);
          toast.success("Kelas berhasil dibagikan! Link sudah disalin ke clipboard.");
        }
      } else {
        toast.error("Gagal membagikan kelas.");
      }
    } catch (error) {
      console.error("Error sharing class:", error);
      toast.error("Terjadi kesalahan saat membagikan kelas.");
    }
  };

  return (
    <div className="font-Jakarta overflow-y-hidden relative">
      <Navbar />
      <ToastContainer />
      <nav className="bg-white p-4 px-12 py-7 font-Jakarta border-b-2 border-neutral-300">
        <ul className="flex justify-center items-center gap-3 w-full lg:gap-20 lg:justify-start">
          <li className="mr-6">
            <a onClick={() => navigate("/teacher/class/task")} className="text-black hover:text-indigo-600 hover:border-b-4 hover:border-indigo-600 w-full font-semibold transition-all">
              Task
            </a>
          </li>
          <li className="mr-6">
            <a onClick={() => navigate("/teacher/class/quiz")} className="text-indigo-600 hover:text-indigo-600 border-b-4 border-indigo-600 w-full font-semibold transition-all">
              Quiz
            </a>
          </li>
          <li className="mr-6">
            <a onClick={() => navigate("/teacher/class/members")} className="text-black hover:text-indigo-600 hover:border-b-4 hover:border-indigo-600 w-full font-semibold transition-all">
              Member
            </a>
          </li>
          <li>
            <a onClick={() => navigate("/teacher/class/forum")} className="text-black hover:text-indigo-600 hover:border-b-4 hover:border-indigo-600 w-full font-semibold transition-all">
              Forum
            </a>
          </li>
        </ul>
      </nav>
      <div className="lg:flex lg:justify-center lg:items-center lg:mx-auto">
        <div className="lg:w-full 2xl:w-full 2xl:h-full">
          <div className="flex justify-center items-center mt-7 ml-1 font-Jakarta lg:mt-12 2xl:mt-12 2xl:h-full gap-1">
            <h1 className="text-black font-semibold text-2xl lg:text-3xl 2xl:text-3xl">{className}</h1>
            <button onClick={handleShare} className="text-white bg-indigo-600 px-4 py-2 font-semibold rounded-md text-xs ml-5 mr-5 lg:mr-1 lg:ml-[35rem] 2xl:ml-[55rem]">Share</button>
            <div className="relative -ml-5">
              <button className="flex items-center justify-center w-8 h-8 bg-white rounded-full focus:outline-none focus:bg-gray-300 lg:ml-6">
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={3.75} d="M12 12h.01v.01H12zm0-7h.01v.01H12zm0 14h.01v.01H12z" />
                </svg>
              </button>
              <div className="hidden absolute right-0 mt-2 py-2 w-48 bg-white border border-gray-200 rounded-md shadow-xl">
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-600 hover:text-white">Action 1</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-600 hover:text-white">Action 2</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-600 hover:text-white">Action 3</a>
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
      {uploadedQuizzes.map((quiz) => (
  <div key={quiz.id} className="border rounded-lg p-4 mb-4 flex w-[23rem] items-center align-middle container mx-auto lg:w-[28rem] 2xl:w-[35rem] mt-5 relative">
    <div className="mr-4 lg:mr-7">
      <img src={Icon} alt="Quiz Icon" className="w-12" />
    </div>
    <div className="flex-1 lg:mt-3">
      <div className="flex justify-between mb-2">
        <h2 onClick={() => navigate("/Quizdetail")} className="text-lg font-semibold">{quiz.title}</h2>
        <p className="text-sm text-gray-600">{quiz.questions.length} Questions</p>
      </div>
      <div className="text-xs text-gray-600">
        {new Date(quiz.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} - <span className="text-red-500 font-semibold">Ready! </span>
      </div>
    </div>
  </div>
))}


          {!uploadedQuizzes.length && (
            <div className="flex flex-col justify-center items-center mx-auto container mt-20">
              <img className="lg:w-60 2xl:w-72" src={Noquiz} alt="No Quiz" />
            </div>
          )}
          <div className="flex mx-auto justify-center align-middle items-center container mt-10 mb-10">
            <button className="bg-indigo-600 text-white px-6 py-2 text-sm rounded-sm text-center" onClick={() => setShowOverlay(true)}>
              Add Quiz
            </button>
          </div>
        </div>
      </div>
      {showOverlay && (
        <div className="overlay-wrapper">
          <div className="font-Jakarta absolute top-0 left-0 w-full h-full bg-white" style={{ zIndex: 9999 }}>
            <div className="flex justify-center mx-auto align-middle items-center container mt-12 gap-16 lg:mt-20 overflow-y: auto;">
            <input type="text" id="title" value={title} onChange={handleTitleChange} placeholder="English PPLG 1 - Quiz" className="rounded-md h-10  text-black" />
              <button className="text-white bg-indigo-600 px-4 py-2 font-semibold rounded-md text-xs ml-5 mr-5 lg:-mr-7 lg:ml-[35rem] hidden lg:block 2xl:block">Share</button>
              <div>
                <img src={Penicon} alt="Pen Icon" />
              </div>
            </div>
            <div className="flex justify-center mx-auto align-middle items-center container mt-20 gap-5 px-10 ml-3 2xl:ml-48 2xl:gap-36">
              <div className="flex flex-col space-y-4">
                <label htmlFor="deadline" className="text-gray-700 font-semibold text-xs">
                  Deadline:
                </label>
                <input type="date" id="deadline" value={deadline} onChange={handleDeadlineChange} className="border border-gray-300 rounded-md p-4 w-[83%] bg-neutral-200 text-black" />
              </div>
              <div className="flex flex-col space-y-4">
                <label htmlFor="timer" className="text-gray-700 font-semibold text-xs">
                  Timer (minutes):
                </label>
                <input type="number" id="timer" name="timer" placeholder="No Time Limit" min="1" step="1" className="border border-gray-300 rounded-md p-4 w-[83%] bg-neutral-200 text-black" value={timer} onChange={handleTimerChange} />
              </div>
            </div>
            {questions.map((question) => (
  <div id={`Soal${question.id}`} className="container mt-16 px-5 flex mx-auto items-center align-middle justify-center" key={question.id}>
    <div className="flex flex-col space-y-4">
      {question.image && <img src={question.image} alt={`Question ${question.id}`} className="mb-4 rounded-md object-cover" />}
      <div className="relative flex items-center">
        <h1 className="ml-2 mr-1">{question.id}.</h1>
        <input placeholder="Questions" type="text" id={`question${question.id}`} name={`question${question.id}`} className="rounded-md p-4 w-[83%] text-sm bg-white text-black" />
        <div className="absolute top-0 right-0 h-full flex items-center mr-3">
          <label htmlFor={`image${question.id}`} className="cursor-pointer">
            <input type="file" id={`image${question.id}`} className="hidden" accept="image/*" onChange={(event) => handleImageUpload(event, question.id)} />
            <span className="text-indigo-600 cursor-pointer">Upload Image</span>
          </label>
        </div>
      </div>
      <div className="flex flex-wrap ml-4">
        <div className="flex flex-col space-y-4 items-start w-1/2">
          <div className="flex space-x-4 items-center">
            <input type="checkbox" id={`optionA${question.id}`} name={`answer${question.id}`} />
            <input type="text" id={`answerA${question.id}`} placeholder="A" className="border border-gray-300 bg-neutral-200 rounded-md p-2 w-[70%] text-sm" />
          </div>
          <div className="flex space-x-4 items-center">
            <input type="checkbox" id={`optionB${question.id}`} name={`answer${question.id}`} />
            <input type="text" id={`answerB${question.id}`} placeholder="B" className="border border-gray-300 bg-neutral-200 rounded-md p-2 w-[70%] text-sm" />
          </div>
        </div>
        <div className="flex flex-col space-y-4 items-start w-1/2">
          <div className="flex space-x-4 items-center">
            <input className="ml-2" type="checkbox" id={`optionC${question.id}`} name={`answer${question.id}`} />
            <input type="text" id={`answerC${question.id}`} placeholder="C" className="border border-gray-300 bg-neutral-200 rounded-md p-2 w-[70%] text-sm" />
          </div>
          <div className="flex space-x-4 items-center">
            <input className="ml-2" type="checkbox" id={`optionD${question.id}`} name={`answer${question.id}`} />
            <input type="text" id={`answerD${question.id}`} placeholder="D" className="border border-gray-300 bg-neutral-200 rounded-md p-2 w-[70%] text-sm" />
          </div>
        </div>
      </div>
    </div>
  </div>
))}
            <div className="ml-7 mt-10 lg:ml-44">
              <button onClick={handleAddQuestion} className="px-4 py-2 border-indigo-600 border-2 bg-white text-indigo-600 rounded-sm text-xs">
                Add Question
              </button>
            </div>
            <div className="float-right mr-7 lg:mr-44 mb-10">
              <button onClick={handleUploadQuiz} className="bg-indigo-600 text-white px-7 py-4 text-xs">
                Upload Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;