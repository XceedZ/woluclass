import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Student/NavbarStudent";
import 'primeicons/primeicons.css';
import Iconrepeat from "../../assets/img/Vector.svg";

const getAvatarUrl = (name) => {
  return `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(name)}&fontSize=41&chars=1`;
};

const Answerthequizcomponent = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef(null);
  const quizId = localStorage.getItem("selectedQuizId");
  const [correctAnswers, setCorrectAnswers] = useState(0); // Menggunakan correctAnswers
  const [showResult, setShowResult] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userFullName = user ? user.fullname : "User";
  const userId = user ? user.id : null;

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/quizzes/${quizId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setQuiz(data);
        setTimer(data.timer * 60); // Mengatur timer dalam detik
        setElapsedTime(0); // Mengatur waktu yang telah berlalu
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    const checkSubmissionStatus = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/quizzes/${quizId}/results/${userId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setHasSubmitted(data.hasSubmitted);
        }
      } catch (error) {
        console.error("Error checking submission status:", error);
      }
    };

    fetchQuiz();
    checkSubmissionStatus();
  }, [quizId, userId]);

  useEffect(() => {
    if (showResult) return;

    if (timer === 0) {
      setShowResult(true);
    } else if (timer > 0) {
      timerRef.current = setTimeout(() => {
        setTimer(timer - 1);
        setElapsedTime(elapsedTime + 1); // Menghitung waktu yang telah berlalu
      }, 1000);
    }

    return () => clearTimeout(timerRef.current);
  }, [timer, elapsedTime, showResult]);

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleSubmit = async () => {
    const selectedAnswer = quiz.questions[currentQuestion].answers.find(
      (answer) => answer.id === selectedOption
    );

    if (selectedAnswer.is_correct) {
      setCorrectAnswers(correctAnswers + 1); // Meningkatkan correctAnswers
    }

    setSelectedOption(null);
    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
      await submitQuizResults();
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setCorrectAnswers(0); // Mengatur ulang correctAnswers
    setShowResult(false);
    setTimer(quiz.timer * 60); // Mengatur ulang timer
    setElapsedTime(0); // Mengatur ulang elapsedTime
  };

  const submitQuizResults = async () => {
    const percentageScore = Math.round((correctAnswers / quiz.questions.length) * 100); // Menghitung persentase skor

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/quizzes/${quizId}/results`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quiz_id: quizId,
          student_id: userId,
          score: percentageScore, // Mengirim persentase skor
        }),
      });

      if (response.ok) {
        setHasSubmitted(true);
      } else {
        console.error("Failed to submit quiz results");
      }
    } catch (error) {
      console.error("Error submitting quiz results:", error);
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const { questions } = quiz;
  const currentQ = questions[currentQuestion];
  const percentageScore = Math.round((correctAnswers / questions.length) * 100); // Menghitung persentase skor
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const durationMinutes = Math.floor(elapsedTime / 60);
  const durationSeconds = elapsedTime % 60;

  if (showResult) {
    return (
      <div className="font-Jakarta">
        <Navbar />
        <div className="flex justify-center align-middle items-center mx-auto container gap-28 mt-10 ml-1 font-Jakarta lg:mt-12 2xl:mt-20 mb-4 lg:gap-96 lg:mb-24">
          <h1 className="text-black font-semibold text-2xl lg:text-3xl 2xl:ml-60">{quiz.title}</h1>
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
        <div className="container mx-auto mt-12 flex justify-center px-2">
          <div className="bg-white rounded px-8 py-4 mb-4 flex items-center justify-center gap-4 border border-solid border-neutral-300">
            <img src={getAvatarUrl(userFullName)} alt="Account Icon" className="w-11 h-11 rounded-full" />
            <h1 className="text-sm font-semibold -ml-2 lg:ml-5">{userFullName}</h1>
            <p className="font-semibold mt-1 text-sm ml-4 lg:ml-40">{percentageScore}/100</p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-28 lg:mb-28 lg:gap-56 lg:mt-3">
          <p className="font-semibold">
            Ranking <span className="text-yellow-500"> 1 </span> / 36
          </p>
          <p className="font-semibold">Duration {durationMinutes}:{durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds}</p>
        </div>
        <div className="flex justify-center items-center ml-5 mt-10 space-x-4">
          <div className="flex-row-2">
            <button className="w-40 px-3 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-all flex items-center justify-center" onClick={handleRestartQuiz}>
              Ulangi
            </button>
            <button onClick={() => navigate("/student/class/quiz")} className="w-40 px-3 py-2 border border-solid border-neutral-500 bg-white text-black rounded hover:bg-indigo-700 hover:text-white flex items-center justify-center my-3">Kembali</button>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const imageUrl = `http://127.0.0.1:8000/storage/${currentQ.image_path}`;

  return (
    <div className="font-Jakarta">
      <Navbar />
      <div className="container mx-auto mt-12">
        <div className="flex justify-center align-middle items-center mx-auto container gap-28 mt-1 ml-1 font-Jakarta lg:mt-1 2xl:mt-5 mb-4 lg:gap-96 2xl:justify-center 2xl:gap-[28rem] 2xl:-ml-32">
          <h1 className="text-black font-semibold text-2xl lg:text-3xl 2xl:ml-60">{quiz.title}</h1>
          <div className="relative flex-row -ml-4">
            <div className="flex items-center justify-center w-16 h-8 bg-white rounded-full lg:block lg:ml-6">
              <span className="text-lg font-semibold text-indigo-600">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
            </div>
          </div>
        </div>
        <div className="ml-12 lg:mb-10 2xl:mt-10">
          <p className="h-full ml-10 absolute mt-[1.93rem] lg:ml-[27rem] 2xl:ml-[34rem]">
            {currentQuestion + 1}/{questions.length}
          </p>
          <div className="bg-gray-200 h-2 rounded-full w-44 overflow-hidden mx-auto mb-10 mt-10 lg:w-64">
            <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${progress}%`, transition: "width 0.5s ease-in-out" }}></div>
          </div>
        </div>
        {currentQ.image_path && (
          <img
            src={imageUrl}
            alt="Question"
            className="mx-auto mb-4 rounded-lg lg:w-96"
            style={{ maxWidth: "74%", height: "auto" }}
          />
        )}
        <h2 className="text-xl font-semibold mb-4 justify-center flex lg:justify-center lg:text-lg lg:mb-10 2xl:mt-10">{currentQ.question}</h2>
        <div className="grid grid-row-2 gap-4 px-12 lg:px-96">
          {currentQ.answers.map((answer) => (
            <button
              key={answer.id}
              className={`py-2 rounded-md option-button ${
                selectedOption !== null ? (answer.is_correct ? "bg-indigo-600 text-white" : "bg-red-500 text-white") : "bg-white border-2 border-neutral-300 border-solid"
              }`}
              disabled={selectedOption !== null}
              onClick={() => handleOptionSelect(answer.id)}>
              {answer.answer}
            </button>
          ))}
          <button className="bg-indigo-600 py-3 rounded-lg text-white mt-3 hover:bg-indigo-700 transition-all" disabled={selectedOption === null} onClick={handleSubmit}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Answerthequizcomponent;
