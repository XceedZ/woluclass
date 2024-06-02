import { useState, useEffect } from "react";
import Iconaccount from "../../assets/img/Account.jpg";
import Navbar from "../../Components/Student/NavbarStudent";
import Icontask from "../../assets/img/Icontask.svg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Detail = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [shareLink, setShareLink] = useState("");
  
  const classId = localStorage.getItem("selectedClassId");
  const token = localStorage.getItem("token");
  const className = localStorage.getItem("selectedClassName"); // Ambil class_name dari local storage

  const selectTask = (taskId) => {
    localStorage.setItem("selectedTaskId", taskId);
    navigate("/student/class/task/assignment");
  };


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/tasks/class/${classId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      }
    };

    if (classId) {
      fetchTasks();
    }
  }, [classId, token]);

  const formatTanggal = (tanggal) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(tanggal).toLocaleDateString('id-ID', options);
  };

  const handleShare = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/classes/${classId}/share`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`, // Jika membutuhkan token
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        const data = await response.json();
        const link = data.share_link; // Asumsikan API mengembalikan link di properti `share_link`
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
    <div className="font-Jakarta">
            <ToastContainer />

      <Navbar />
      <nav className="bg-white p-4 px-12 py-7 font-Jakarta lg:float-left border-b-2 border-neutral-300 lg:w-full 2xl:w-full">
        <ul className="flex justify-between items-center lg:gap-14 lg:float-left 2xl:gap-24 2xl:float-left">
          <li className="mr-2">
            <a onClick={() => navigate("/student/class/task")} className="text-indigo-600 hover:text-indigo-600 border-b-4 border-indigo-600 w-56 font-semibold transition-all">
              Task
            </a>
          </li>
          <li className="mr-2">
            <a onClick={() => navigate("/student/class/quiz")} className="text-black hover:text-indigo-600 hover:border-b-4 hover:border-indigo-600 w-56 font-semibold transition-all">
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
        <button onClick={handleShare} className="text-white bg-indigo-600 w-16 h-7 font-semibold rounded-md text-xs lg:ml-[30rem] lg:w-20 lg:h-9 2xl:ml-[55rem]">Share</button>
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

      {/* Tampilkan daftar tugas */}
      {tasks.map((task) => (
        <div key={task.id} className="border rounded-lg p-4 mb-4 flex w-[23rem] items-center align-middle container mx-auto lg:w-[28rem] 2xl:w-[35rem] mt-5">
          <div className="mr-4 lg:mr-7">
            <img src={Icontask} alt="Task Icon" /> {/* Menampilkan gambar */}
          </div>
          <div className="lg:mt-3">
            <div className="mb-2">
            <a onClick={() => selectTask(task.id)} target="_blank" rel="noopener noreferrer">
              {task.title}
            </a>
            </div>
            <div className="flex justify-between mb-2">
              <div className="text-xs">
                {formatTanggal(task.created_at)} - <span className="text-red-500 font-semibold">Deadline: </span>
                {formatTanggal(task.deadline)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Detail;
