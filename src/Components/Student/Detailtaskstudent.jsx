import { useState, useEffect } from "react";
import Navbar from "../../Components/teacher/NavbarUtama";
import Icontask from "../../assets/img/Icontask.svg";
import Back from "../../assets/img/mingcute_left-line.svg";
import Pdf from "../../assets/img/Convert_PDF_2.svg";
import Delete from "../../assets/img/Delete.svg";
import AddIcon from "../../assets/img/Add.svg";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Detailtask = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [task, setTask] = useState(null);
  const [taskId, setTaskId] = useState(localStorage.getItem("selectedTaskId"));
  const [uploadProgress, setUploadProgress] = useState({});
  const [gradeInfo, setGradeInfo] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

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
          throw new Error('Respon jaringan tidak baik');
        }
        return response.json();
      })
      .then(data => {
        console.log("Data tugas yang diterima:", data);
        setTask(data);
      })
      .catch(error => {
        console.error("Ada kesalahan saat mengambil data tugas!", error);
      });
  
      fetch(`http://127.0.0.1:8000/api/tasks/${taskId}/students/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Respon jaringan tidak baik');
        }
        return response.json();
      })
      .then(data => {
        console.log("Data nilai yang diterima:", data);
        if (data.grade) {
          setGradeInfo({ grade: data.grade.grade, points: data.task.points });
          const submittedFiles = data.files.map(file => ({
            name: file.file_name,
            path: file.file_path
          }));
          setSelectedFiles(submittedFiles);
        }
      })
      .catch(error => {
        console.error("Ada kesalahan saat mengambil data nilai!", error);
      });
    }
  }, [taskId, userId]);
  
  const handleFileClick = (filePath) => {
    window.open(`http://127.0.0.1:8000/storage/${filePath}`, "_blank");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('id-ID', options).format(date);
  };

  const handleFileSelect = (event) => {
    const filesArray = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
  };

  const handleFileUpload = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Tidak ada token ditemukan");
      return;
    }
  
    const formData = new FormData();
    formData.append("task_id", taskId);
    formData.append("student_id", userId);
  
    selectedFiles.forEach((file, index) => {
      formData.append(`files_upload[${index}]`, file);
    });
  
    console.log("Mengirim permintaan upload dengan formData:", formData);
  
    axios.post(`http://127.0.0.1:8000/api/submissions`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
        if (totalLength !== null) {
          const progress = Math.round((progressEvent.loaded * 100) / totalLength);
          setUploadProgress(progress); // Perbarui nilai progress
        }
      }
    })
    .then(response => {
      console.log("File berhasil diunggah:", response.data);
      toast.success("Tugas berhasil dikirim");
      setUploadProgress(0);
      setSelectedFiles([]);
    })
    .catch(error => {
      console.error("Ada kesalahan saat mengunggah file!", error);
      if (error.response && error.response.data) {
        console.error("Detail kesalahan dari server:", error.response.data);
      }
      toast.error("Ada kesalahan saat mengunggah file");
      setUploadProgress(0);
    });
  };
  
  
  const removeSelectedFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((file, i) => i !== index));
    setUploadProgress(prevProgress => {
      const newProgress = { ...prevProgress };
      delete newProgress[index];
      return newProgress;
    });
  };

  if (!task) {
    return (
      <div className="font-Jakarta flex items-center justify-center h-screen">
        <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" stroke="#ff0000" animationDuration=".5s"/>
      </div>
    );
  }

  return (
    <div className="font-Jakarta">
      <ToastContainer />
      <Navbar />
      <div onClick={() => navigate("/student/class/task")} className="absolute mt-12 ml-4">
        <img className="w-7 lg:ml-20 lg:w-10" src={Back} alt="Back" />
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
      {task.files.map(file => (
        <div key={file.id} className="flex justify-center mt-4">
          {file.file_path.endsWith('.pdf') ? (
            <div className="border-[1px] border-neutral-300 w-80 h-16 rounded-lg flex items-center">
              <div className="p-2 bg-neutral-300">
                <img className="w-10 h-12" src={Pdf} alt="PDF Icon" />
              </div>
              <button onClick={() => handleFileClick(file.file_path)} className="text-xs text-indigo-600 ml-4">{file.file_name}</button>
            </div>
          ) : file.file_path.endsWith('.png') || file.file_path.endsWith('.jpg') || file.file_path.endsWith('.jpeg') ? (
            <div className="border-[1px] border-neutral-300 w-80 h-16 rounded-lg flex items-center ">
              <img className="w-14 h-16 object-cover" src={`http://127.0.0.1:8000/storage/${file.file_path}`} onClick={() => handleFileClick(file.file_path)} alt={file.file_name} />
              <h1 className="text-xs ml-4">{file.file_name}</h1>
            </div>
          ) : file.file_path.endsWith('.mp4') || file.file_path.endsWith('.mkv') ? (
            <div className="border-[1px] border-neutral-300 w-80 h-16 rounded-lg flex items-center">
              <video className="w-13 h-full object-cover" onClick={() => handleFileClick(file.file_path)}>
                <source src={`http://127.0.0.1:8000/storage/${file.file_path}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <h1 className="text-xs ml-4">{file.file_name}</h1>
            </div>
          ) : null}
        </div>
      ))}
      <div className="w-full h-full bg-white rounded-tl-2xl rounded-t-2xl shadow shadow-black flex-col justify-start items-center inline-flex mt-20 py-10 lg:rounded-none">
        <div className="flex gap-24 justify-center align-middle items-center container mx-auto mt-5 lg:mt-16">
          <h1 className="text-sm font-semibold">Tempat Kumpul Jawaban</h1>
          {gradeInfo ? (
            <p className="text-xs mt-1 text-neutral-500">{gradeInfo.grade} / {gradeInfo.points}</p>
          ) : (
            <p className="text-xs mt-1 text-neutral-500">Ditugaskan</p>
          )}
        </div>
        <div className="w-72 h-[0.1rem] bg-neutral-300 mt-8 justify-center align-middle items-center container mx-auto flex"></div>
        {selectedFiles.map((file, index) => (
          <div key={index} className="w-full">
            <div className="flex items-center justify-between mt-3 mb-1 gap-10 w-full px-12 lg:px-[30rem] 2xl:px-[48rem]">
              <p className="text-sm mr-2">{file.name}</p>
              <button onClick={() => removeSelectedFile(index)} className="text-black text-xs mt-1 font-extrabold">
                <img src={Delete} alt="Delete Icon" />
              </button>
            </div>
            <div className="px-12 lg:px-[30rem] 2xl:px-[48rem]">
              {file.path ? (
                file.name.endsWith('.pdf') || file.name.endsWith('.docx') ? (
                  <div className="w-full h-16 rounded-lg flex items-center">
                    <div className="p-2 bg-neutral-300">
                      <img className="w-6" src={Pdf} onClick={() => handleFileClick(file.path)} />
                    </div>
                  </div>
                ) : file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') ? (
                  <div className=" w-full h-16 rounded-lg flex items-center">
                    <img className="w-12 h-12 object-cover" src={`http://127.0.0.1:8000/storage/${file.path}`} onClick={() => handleFileClick(file.path)} />
                  </div>
                ) : file.name.endsWith('.mp4') || file.name.endsWith('.mkv') ? (
                  <div className="w-full h-16 rounded-lg flex items-center">
                    <video className="w-12 h-12 object-cover" onClick={() => handleFileClick(file.path)}>
                      <source src={`http://127.0.0.1:8000/storage/${file.path}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : null
              ) : (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${uploadProgress || 0}%` }}
                  ></div>
                </div>
              )}
            </div>
            <div className="w-full h-[0.1rem] bg-neutral-300"></div>
          </div>
        ))}

        <div className="container flex items-center justify-center mx-auto mt-10">
          <button
            className="text-white bg-indigo-600 transition-all text-xs w-[318px] h-[38.37px] py-[11.19px] border-indigo-600 border-solid border-[1px] rounded-sm justify-center align-middle items-center container mx-auto flex mt-5"
            onClick={() => document.getElementById("file-upload").click()}
          >
            <img src={AddIcon} alt="Add Icon" className="mr-2 w-3 h-3" /> Tambah
          </button>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
        <div className="container flex justify-center mx-auto">
          <button
            className="text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all text-xs w-[318px] h-[38.37px] py-[11.19px] border-indigo-600 border-solid border-[1px] rounded-sm justify-center align-middle items-center container mx-auto flex mt-2 "
            onClick={handleFileUpload}
          >
            {gradeInfo ? "Kirim Ulang" : "Kirim"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detailtask;
