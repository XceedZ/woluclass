import Navbar from "./NavbarUtama";
import { useNavigate } from "react-router-dom";
import Icontask from "../../assets/img/Icontask.svg";
import Back from "../../assets/img/mingcute_left-line.svg";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pdf from "../../assets/img/Convert_PDF_2.svg";
import 'primeicons/primeicons.css'; // Pastikan PrimeIcons diimpor

const Point = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [submission, setSubmission] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const taskTitle = localStorage.getItem("taskTitle");
  const createdAt = localStorage.getItem("createdAt");
  const deadline = localStorage.getItem("deadlineTask");
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    let value = e.target.value;
    value = Math.min(Math.max(parseInt(value), 0), 100);
    setInputValue(value);
  };

  const handleSubmit = async () => {
    const submissionId = localStorage.getItem("submissionId");
    if (!submissionId) {
      alert("Submission tidak ditemukan");
      return;
    }

    const url = `http://127.0.0.1:8000/api/submissions/${submissionId}/grade`;
    const data = {
      grade: inputValue,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Poin berhasil dikirim!");
      } else {
        toast.error("Gagal mengirim poin");
      }
    } catch (error) {
      console.error("Error submitting points:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  const getAvatarUrl = (name) => {
    return `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(name)}&fontSize=41&chars=1`;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const formatSubmittedDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options) + ` ${new Date(dateString).toLocaleTimeString('id-ID')}`;
  };

  useEffect(() => {
    const studentId = localStorage.getItem("selectedStudentId");
    const taskId = localStorage.getItem("selectedTaskId");

    const fetchSubmission = async () => {
      if (!studentId || !taskId) {
        alert("Student ID atau Task ID tidak ditemukan");
        return;
      }

      const url = `http://127.0.0.1:8000/api/tasks/${taskId}/students/${studentId}`;

      try {
        const response = await fetch(url, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const result = await response.json();
          setSubmission(result);
          localStorage.setItem("submissionId", result.id);
          if (result.grade) {
            setInputValue(result.grade.grade);
          }
        } else {
          alert("Gagal mengambil data submission");
        }
      } catch (error) {
        console.error("Error fetching submission:", error);
        alert("Terjadi kesalahan saat mengambil data submission.");
      }
    };

    fetchSubmission();
  }, [token]);

  const handleFileClick = (file) => {
    const fileType = file.file_name.split('.').pop().toLowerCase();
    if (fileType === 'pdf' || fileType === 'docx' || fileType === 'mp4') {
      window.open(`http://127.0.0.1:8000/storage/${file.file_path}`, "_blank");
    } else if (fileType === 'png') {
      setSelectedImage(`http://127.0.0.1:8000/storage/${file.file_path}`);
    }
  };

  const closeImagePopup = () => {
    setSelectedImage(null);
  };

  return (
    <div className="mb-5">
      <ToastContainer />
      <Navbar />
      <div className="font-Jakarta">
        <div onClick={() => navigate("/teacher/class/task/assignment")} className="absolute mt-12 ml-4">
          <img className="w-7 lg:ml-20 lg:w-10" src={Back} alt="Back"></img>
        </div>
        <div className="flex mx-auto container align-middle items-center justify-center mt-10 lg:-ml-24 2xl:ml-20">
          <img className="ml-3 w-9 lg:w-11" src={Icontask} alt="Task Icon" />
          <div className="ml-5 -mt-1 flex-row">
            <h1 className="font-semibold text-sm lg:text-lg">{taskTitle}</h1>
            <p className="text-[10px] mt-1 font-semibold">
              {formatDate(createdAt)} - <span className="text-red-500">Deadline</span> {formatDate(deadline)}
            </p>
          </div>
        </div>
        <div className="bg-indigo-600 py-[0.5px] w-60 ml-24 mt-5 flex mx-auto container align-middle items-center justify-center lg:ml-[29rem] lg:w-80 2xl:ml-[47.7rem]"></div>
        <div className="flex mt-10 ml-6 lg:ml-96 2xl:ml-[40rem] 2xl:mt-16">
          {submission && (
            <>
              <img className="w-10 h-10 rounded-full 2xl:w-14 2xl:h-14" src={getAvatarUrl(submission.student.fullname)} alt="Student Icon"></img>
              <div className="ml-4">
                <h1 className="font-semibold mt-2 2xl:text-lg 2xl:mt-3">{submission.student.fullname}</h1>
                <p className="text-sm mt-1">{formatSubmittedDate(submission.submitted_at)}</p>
                {submission.grade && (
                  <p className="text-sm mt-1 text-green-500 rounded border border-green-500 px-2 ">Sudah Dinilai</p>
                )}
              </div>
            </>
          )}
        </div>
        <div className="grid grid-cols-1 gap-6 ml-5 mr-5 mt-10 lg:grid-cols-2 2xl:mt-20">
          {submission && submission.files.map((file) => (
            <div key={file.id} className="relative">
              {['jpeg', 'jpg', 'png'].includes(file.file_name.split('.').pop().toLowerCase()) ? (
                <img
                  className="rounded-lg lg:w-72 2xl:w-96 cursor-pointer"
                  src={`http://127.0.0.1:8000/storage/${file.file_path}`}
                  alt={file.file_name}
                  onClick={() => handleFileClick(file)}
                />
              ) : (
                <div className="w-full h-fit rounded-lg flex items-center">
                  {file.file_name.split('.').pop().toLowerCase() === 'mp4' && (
                    <video src={`http://127.0.0.1:8000/storage/${file.file_path}`}
                      type="video/mp4"
                      className="w-full h-full cursor-pointer"
                      onClick={() => handleFileClick(file)} 
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {(file.file_name.split('.').pop().toLowerCase() === 'pdf' || file.file_name.split('.').pop().toLowerCase() === 'docx') && (
                    <div className="flex items-center p-2 bg-neutral-300 cursor-pointer" onClick={() => handleFileClick(file)}>
                      <img className="w-10 h-15" src={Pdf} onClick={() => handleFileClick(file.file_path)} alt={file.file_name} />
                    </div>
                  )}
                </div>
              )}
              <div className="flex mt-3">
                <h1 className="text-sm font-semibold ml-5">{file.file_name}</h1>
              </div>
            </div>
          ))}
        </div>
        <div className="ml-5 lg:ml-[21.3rem] 2xl:ml-[33.5rem]">
          <h1 className="mt-12 font-semibold lg:text-xl">Points</h1>
          <div className="mt-2">
            <input
              type="number"
              min="0"
              max="100"
              className="w-24 h-10 lg:h-14 px-3 mr-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
              placeholder={submission ? `.../${submission.task.points}` : '.../100'}
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button onClick={handleSubmit} className="w-fit h-fit bg-indigo-600 text-white font-semibold px-6 py-3 bottom-0 right-0 float-right mr-5 mt-16 lg:px-8 lg:py-4 2xl:mt-36 2xl:mr-12 2xl:px-10 2xl:py-5">
          Submit
        </button>
      </div>

      {/* Popup untuk gambar */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <img src={selectedImage} alt="Preview" className="max-h-screen max-w-full" />
            <button
              className="absolute top-2 right-2 text-white p-1 rounded-full"
              onClick={closeImagePopup}
            >
              <i className="pi pi-times-circle" style={{ fontSize: '1.5rem' }}></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Point;
