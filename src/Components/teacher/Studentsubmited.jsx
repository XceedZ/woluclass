import { useState, useEffect } from "react";
import Iconeye from "../../assets/img/solar_eye-linear.svg";
import { useNavigate } from "react-router-dom";

const StudentComponent = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("submitted");
  const [submittedStudents, setSubmittedStudents] = useState([]);
  const [unsubmittedStudents, setUnsubmittedStudents] = useState([]);
  const taskId = localStorage.getItem("selectedTaskId");
  const classroomId = localStorage.getItem("selectedClassId");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (taskId && token) {
      // Panggilan API untuk mendapatkan siswa yang telah mengumpulkan tugas
      fetch(`http://127.0.0.1:8000/api/tasks/${taskId}/submissions`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(submissions => {
        const studentIds = submissions.map(submission => submission.student_id);
        Promise.all(studentIds.map(studentId =>
          fetch(`http://127.0.0.1:8000/api/tasks/${taskId}/students/${studentId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then(response => response.json())
        ))
        .then(students => {
          const formattedStudents = students.map(student => ({
            id: student.student.id,
            name: student.student.fullname,
            submitted: true,
            score: student.grade ? `${student.grade.grade}/${student.task.points}` : `.../${student.task.points}`,
            iconUrl: getAvatarUrl(student.student.fullname)
          }));
          setSubmittedStudents(formattedStudents);
        })
        .catch(error => {
          console.error("There was an error fetching the students data!", error);
        });
      })
      .catch(error => {
        console.error("There was an error fetching the submissions data!", error);
      });

      // Panggilan API untuk mendapatkan siswa yang belum mengumpulkan tugas
      fetch(`http://127.0.0.1:8000/api/submissions/${taskId}/classroom/${classroomId}/not-submitted`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const formattedStudents = data.map(student => ({
          id: student.id,
          name: student.fullname,
          iconUrl: getAvatarUrl(student.fullname)
        }));
        setUnsubmittedStudents(formattedStudents);
      })
      .catch(error => {
        console.error("There was an error fetching the unsubmitted students data!", error);
      });
    }
  }, [taskId, classroomId]);

  const getAvatarUrl = (name) => {
    return `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(name)}&fontSize=41&chars=1`;
  };

  const handleStudentClick = (studentId) => {
    localStorage.setItem("selectedStudentId", studentId);
    navigate("/teacher/class/task/point");
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:px-0 lg:-ml-1 lg:w-full lg:mt-20 2xl:mx-auto 2xl:px-32 font-Jakarta">
      <div className="flex mb-4 ml-2 mx-auto container items-center align-middle justify-center w-full lg:border-b-[0.3px] lg:border-neutral-500 lg:w-full 2xl:w-full 2xl:px-0 2xl:border-none">
        <button className={`mr-4 font-semibold py-2 px-4 text-sm lg:w-56 ${activeTab === "submitted" ? "bg-white text-indigo-600 border-b-2 border-indigo-600 text-sm" : "bg-white"}`} onClick={() => setActiveTab("submitted")}>
          Submitted
        </button>
        <button
          className={`mr-4 font-semibold py-2 px-4 text-sm ml-20 lg:ml-40 lg:w-56 2xl:ml-[10rem] ${activeTab === "unsubmitted" ? "bg-white text-indigo-600 border-b-2 border-indigo-600 text-sm" : "bg-white"}`}
          onClick={() => setActiveTab("unsubmitted")}>
          Unsubmitted
        </button>
      </div>
      {activeTab === "submitted" && (
        <div className="px-3 lg:px-80">
          <ul className="flex flex-col gap-4">
            {submittedStudents.length > 0 ? (
              submittedStudents.map((student) => (
                <li key={student.id} className="flex items-center justify-between bg-white px-4 py-2 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <img src={student.iconUrl} alt="icon" className="mr-4 rounded-full w-12 h-12" />
                    <span className="text-xs lg:text-sm">{student.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs lg:text-sm">{student.score}</span>
                    <div onClick={() => handleStudentClick(student.id)} className="ml-4 cursor-pointer">
                      <img src={Iconeye} alt="eye icon" className="w-6 h-6" />
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-center text-xs lg:text-sm">Tidak ada siswa yang mengumpulkan tugas</li>
            )}
          </ul>
        </div>
      )}
      {activeTab === "unsubmitted" && (
        <div className="px-3 lg:px-80">
          <ul className="flex flex-col gap-4">
            {unsubmittedStudents.length > 0 ? (
              unsubmittedStudents.map((student) => (
                <li key={student.id} className="flex items-center justify-between bg-white px-4 py-2 rounded-lg">
                  <div className="flex items-center">
                    <img src={student.iconUrl} alt="icon" className="mr-4 rounded-full w-12 h-12" />
                    <span className="text-xs lg:text-sm">{student.name}</span>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-center text-xs lg:text-sm">Tidak ada siswa yang belum mengumpulkan tugas</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StudentComponent;
