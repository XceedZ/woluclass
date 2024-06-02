import { useState, useEffect } from "react";
import Navbar from "./NavbarUtama";
import Icontask from "../../assets/img/Icontask.svg";
import Back from "../../assets/img/mingcute_left-line.svg";
import Pdf from "../../assets/img/Convert_PDF_2.svg";
import { useNavigate } from "react-router-dom";
import Submit from "./Studentsubmited";
import { ProgressSpinner } from 'primereact/progressspinner';

const Detailtask = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [taskId, setTaskId] = useState(localStorage.getItem("selectedTaskId"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (taskId && token) {
      fetch(`http://127.0.0.1:8000/api/tasks/${taskId}`, {
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
        setTask(data);
        localStorage.setItem("taskTitle", data.title);
        localStorage.setItem("createdAt", data.created_at);
        localStorage.setItem("deadlineTask", data.deadline);
      })
      .catch(error => {
        console.error("There was an error fetching the task data!", error);
      });
    }
  }, [taskId]);

  const handleFileClick = (filePath) => {
    window.open(`http://127.0.0.1:8000/storage/${filePath}`, "_blank");
  }

  const handleTaskIdChange = () => {
    setTaskId(localStorage.getItem("selectedTaskId"));
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('id-ID', options).format(date);
  };

  useEffect(() => {
    window.addEventListener('storage', handleTaskIdChange);
    return () => {
      window.removeEventListener('storage', handleTaskIdChange);
    };
  }, []);

  if (!task) {
    return (
      <div className="font-Jakarta flex items-center justify-center h-screen">
        <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" stroke="#ff0000" animationDuration=".5s"/>
      </div>
    );
  }

  return (
    <div className="font-Jakarta">
      <Navbar />
      <div onClick={() => navigate("/teacher/class/task")} className="absolute mt-12 ml-4">
        <img className="w-7 lg:ml-20 lg:w-10" src={Back} alt="Back Icon"></img>
      </div>
      <div className="flex mx-auto container align-middle items-center justify-center mt-10 lg:-ml-24 2xl:ml-20">
        <img className="ml-3 w-9 lg:w-11" src={Icontask} alt="Task Icon" />
        <div className="ml-5 -mt-1 flex-row">
          <h1 className="font-semibold text-sm lg:text-lg">{task.title}</h1>
          <p className="text-[10px] mt-1 font-semibold">
            {formatDate(task.created_at)} - <span className="text-red-500">Deadline</span> {formatDate(task.deadline)}
          </p>
        </div>
      </div>
      <div className="bg-indigo-600 py-[0.5px] w-60 ml-24 mt-5 flex mx-auto container align-middle items-center justify-center lg:ml-[29rem] lg:w-80 2xl:ml-[47.7rem]"></div>
      <div className="flex mx-auto container align-middle items-center justify-center lg:flex lg:mx-auto lg:align-middle lg:items-center lg:justify-center lg:container lg:w-full">
        <h1 className="text-xs w-80 mt-10 lg:flex lg:mx-auto lg:align-middle lg:items-center lg:justify-center lg:container lg:w-full">{task.description}</h1>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {task.files.map(file => (
          <div key={file.id} className="flex justify-center mt-4">
            {file.file_path.endsWith('.pdf') || file.file_path.endsWith('.docx') ? (
              <div className="border-[1px] border-neutral-300 w-80 h-16 rounded-lg flex items-center">
                <div className="p-2 bg-neutral-300">
                  <img className="w-10 h-12" src={Pdf} onClick={() => handleFileClick(file.file_path)} alt={file.file_name} />
                </div>
                <button onClick={() => handleFileClick(file.file_path)} className="text-xs text-indigo-600 ml-4">{file.file_name}</button>
              </div>
            ) : file.file_path.endsWith('.png') || file.file_path.endsWith('.jpg') || file.file_path.endsWith('.jpeg') ? (
              <div className="border-[1px] border-neutral-300 w-80 h-16 rounded-lg flex">
                <img className="w-14 h-13 object-cover" src={`http://127.0.0.1:8000/storage/${file.file_path}`} onClick={() => handleFileClick(file.file_path)}  />
                <h1 className="text-xs ml-4 mt-5">{file.file_name}</h1>
              </div>
            ) : file.file_path.endsWith('.mp4') ? (
              <div className="border-[1px] border-neutral-300 w-80 h-16 rounded-lg flex items-center">
                <video src={`http://127.0.0.1:8000/storage/${file.file_path}`} onClick={() => handleFileClick(file.file_path)} type="video/mp4" className="w-full h-full">
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <Submit />
    </div>
  );
};

export default Detailtask;
