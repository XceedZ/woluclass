import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Home-Page/Landingpage";
import Signup from "./Pages/auth/SignUp";
import Login from "./Pages/auth/Login";
import Teacher from "./Pages/Teacher-Page/Teacherpage";
import Student from "./Pages/Student-Page/Studentpage";
import Classdetail from "./Pages/Teacher-Page/Detailclasspage";
import DetailTask from "./Pages/Teacher-Page/Detailtask";
import DetailTaskstudent from "./Pages/Student-Page/Detailtaskstudentpage";
import Poinpageteacher from "./Pages/Teacher-Page/PointPage";
import Quizpage from "./Pages/Teacher-Page/QuizPage";
import Quizdetail from "./Pages/Teacher-Page/Quizdetailpage";
import Memberpage from "./Pages/Teacher-Page/Memberpage";
import Forum from "./Pages/Teacher-Page/Forumpage";
import Teacherprofile from "./Pages/Teacher-Page/Accountteacher";
import Calendar from "./Pages/Teacher-Page/Calendar";
import Classdetailstudent from "./Pages/Student-Page/Detailclasstudentpage";
import QuizStudent from "./Pages/Student-Page/QuizStudentPage";
import Answeredquiz from "./Pages/Student-Page/Answerthequizpage";
import Memberstudent from "./Pages/Student-Page/MemberStudentpage";
import Forummurid from "./Pages/Student-Page/Forumstudentpage";
import Calendarstudent from "./Pages/Student-Page/Calendarstudentpage";
import Accountstudent from './Pages/Student-Page/Accountstudentpage'
import GoogleCallbackHandler from "./GoogleCallbackHandler.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/google-callback" element={<GoogleCallbackHandler />} />
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/teacher/class" element={<Teacher />}></Route>
        <Route path="/student/class" element={<Student />}></Route>
        <Route path="/teacher/class/task" element={<Classdetail />}></Route>
        <Route path="/teacher/class/task/assignment" element={<DetailTask />}></Route>
        <Route path="/student/class/task/assignment" element={<DetailTaskstudent />}></Route>
        <Route path="/Point" element={<Poinpageteacher />}></Route>
        <Route path="/teacher/class/quiz" element={<Quizpage />}></Route>
        <Route path="/Quizdetail" element={<Quizdetail />}></Route>
        <Route path="/teacher/class/members" element={<Memberpage />}></Route>
        <Route path="/teacher/class/forum" element={<Forum />}></Route>
        <Route path="/Profileteacher" element={<Teacherprofile />}></Route>
        <Route path="/Calendar" element={<Calendar />}></Route>
        <Route path="/student/class/task" element={<Classdetailstudent />}></Route>
        <Route path="/student/class/quiz" element={<QuizStudent />}></Route>
        <Route path="/Answeryourquiz" element={<Answeredquiz />}></Route>
        <Route path="/student/class/members" element={<Memberstudent />}></Route>
        <Route path="/Forumstudent" element={<Forummurid />}></Route>
        <Route path="/Calendarstudent" element={<Calendarstudent />}></Route>
        <Route path="/profile" element={<Accountstudent />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
