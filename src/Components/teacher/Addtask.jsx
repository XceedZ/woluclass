import { useState, useEffect } from "react";
import axios from "axios";
import Icontask from "../../assets/img/Icontask.svg";
import { useNavigate } from "react-router-dom";
import Iconadd from '/src/assets/img/IconAddTask.svg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TaskManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const classId = localStorage.getItem("selectedClassId");
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const [uploads, setUploads] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    points: "",
    deadline: "",
    class_id: classId,
    teacher_id: userId,
    files_upload: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/tasks/class/${classId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      }
    };

    if (classId) {
      fetchTasks();
    }
  }, [classId, token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/png", "image/jpeg", "video/mp4", "video/x-matroska"];
    const maxFileSize = 10 * 1024 * 1024; // 10MB

    const validFiles = files.filter(file => validTypes.includes(file.type) && file.size <= maxFileSize);
    const newUploads = validFiles.map(file => ({ file, progress: 0 }));

    setUploads([...uploads, ...newUploads]);
    setFormData({
      ...formData,
      files_upload: [...formData.files_upload, ...validFiles],
    });

    await Promise.all(newUploads.map((upload, index) => {
      const formData = new FormData();
      formData.append('file', upload.file);

      return axios.post(`http://127.0.0.1:8000/api/upload`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploads((prevUploads) => {
            const newUploads = [...prevUploads];
            newUploads[uploads.length + index].progress = progress;
            return newUploads;
          });
        },
      });
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('points', formData.points);
    formDataToSend.append('deadline', formData.deadline);
    formDataToSend.append('class_id', formData.class_id);
    formDataToSend.append('teacher_id', formData.teacher_id);

    formData.files_upload.forEach((file) => {
      formDataToSend.append('files_upload[]', file);
    });

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/tasks', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const newTask = response.data.task;
      setTasks([newTask, ...tasks]);
      setIsOpen(false);
      setFormData({
        title: "",
        description: "",
        points: "",
        deadline: "",
        class_id: classId,
        teacher_id: userId,
        files_upload: [],
      });
      toast.success("Berhasil Menambah task");
      setUploads([]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const formatTanggal = (tanggal) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(tanggal).toLocaleDateString('id-ID', options);
  };

  const selectTask = (taskId) => {
    localStorage.setItem("selectedTaskId", taskId);
    navigate("/teacher/class/task/assignment");
  };

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setTasks(tasks.filter(task => task.id !== taskId));
      toast.success("Berhasil Menghapus Task");

    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8 font-Jakarta items-center align-middle flex-row">
            <ToastContainer />

      {tasks.map((task, index) => (
        <div key={task.id} className="border rounded-lg p-4 mb-4 flex w-[23rem] items-center align-middle container mx-auto lg:w-[28rem] 2xl:w-[35rem] mt-5 relative">
          <div className="mr-4 lg:mr-7">
            <img src={Icontask} alt="Task Icon" />
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
          <button onClick={() => toggleDropdown(index)} className="absolute top-full right-0 -mt-14 mr-2 px-2 py-1 z-50" id="options-menu" aria-haspopup="true" aria-expanded={openDropdownIndex === index ? "true" : "false"}>
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={3.75} d="M12 12h.01v.01H12zm0-7h.01v.01H12zm0 14h.01v.01H12z"></path>
            </svg>
          </button>
          {openDropdownIndex === index && (
            <div className="absolute top-full right-0 -mt-24 mr-1 bg-white rounded-md shadow-lg z-50">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button onClick={() => handleDeleteTask(task.id)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">
                  Hapus Tugas
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      <button onClick={() => setIsOpen(true)} className="bg-white text-xs hover:bg-indigo-600 transition-all hover:text-white text-indigo-600 border-2 border-indigo-600 border-solid py-3 px-7 rounded ml-3 lg:px-16 lg:py-4 lg:ml-80 lg:mt-10 lg:mb-10 2xl:ml-64">
        Add Task
      </button>

      {isOpen && (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-10 py-8 rounded-lg relative w-[95%] lg:w-fit">
      <h2 className="text-lg font-bold mb-2">Add Task</h2>
      <p className="text-sm mb-4">Create and upload your assignment</p>
      <hr className="mb-8" />
      <form onSubmit={handleSubmit}>
        <div className="lg:flex lg:flex-col lg:gap-4">
          <div className="mb-4">
            <input placeholder="Task Title" type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} className="border rounded-2xl px-7 py-5 w-full text-xs font-semibold lg:w-[35rem]" required />
          </div>
          <div className="mb-4">
            <textarea placeholder="Description" id="description" name="description" value={formData.description} onChange={handleInputChange} className="border px-7 py-5 w-full text-xs font-semibold lg:w-[35rem] lg:h-[11rem] rounded-2xl" rows="4" required />
          </div>
          <div className="mb-2 justify-center">
            <div className="flex items-center justify-center gap-4 lg:flex-row">
              <input type="file" id="files_upload" name="files_upload" accept=".pdf, .jpg, .jpeg, .png, .mp4, .docx" multiple onChange={handleFileChange} className="hidden justify-center" />
              <label htmlFor="files_upload" className="bg-white text-black py-4 px-7 rounded-2xl cursor-pointer text-xs border border-grey-200 lg:px-10 lg:w-full justify-center font-medium align-middle items-center text-center w-full">
                <img src={Iconadd} alt="Add Icon" className="inline-block mr-2" /> Add Files
              </label>
            </div>
            {uploads.map((upload, index) => (
              <div key={index} className="mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{upload.file.name}</span>
                  <span className="text-sm">{upload.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${upload.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:flex lg:gap-4 flex">
            <div className="mb-4">
              <label htmlFor="deadline" className="block text-gray-700 font-bold text-sm">Deadline</label>
              <input type="date" id="deadline" name="deadline" value={formData.deadline} onChange={handleInputChange} className="border rounded px-3 py-2 w-full bg-gray-100 lg:px-16 lg:py-3" required />
            </div>
            <div className="mb-4 ml-10 lg:ml-0">
              <label htmlFor="points" className="block text-gray-700 font-bold text-sm">Points</label>
              <input type="number" id="points" name="points" value={formData.points} onChange={handleInputChange} className="border px-3 py-2 mx-auto rounded bg-gray-100 lg:px-5 lg:py-3" min="0" max="100" required />
            </div>
          </div>
        </div>
        <div className="flex justify-start gap-2 lg:gap-16 lg:justify-center mt-2">
          <button type="button" onClick={() => setIsOpen(false)} className="bg-white hover text-black font-medium py-4 lg:px-16 px-8 rounded-xl text-xs lg:w-full border border-gray-300">
            Cancel
          </button>
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-16 rounded-xl text-xs lg:w-full">
            Assignment
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
}
export default TaskManager;
