import { useState, useEffect, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import AddIcon from "../../assets/img/Add.svg";


function App() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [link, setLink] = useState("");
  const [classes, setClasses] = useState([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")); // Ambil user dari localstorage dan ubah ke objek
  const userId = user?.id; // Ambil id dari objek user
  const token = localStorage.getItem("token"); // Ambil token dari localstorage

  const fetchClasses = useCallback(async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/classes/${userId}/users`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      setClasses(data.classes || []);
    } catch (error) {
      console.error("Error fetching classes:", error);
      setClasses([]);
    }
  }, [userId, token]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const handleButtonClick = () => {
    setShowOverlay(true);
  };

  const handleOverlayClose = () => {
    setShowOverlay(false);
  };

  const handleAddClass = async () => {
    if (!isValidLink(link)) {
      toast.error("Silakan masukkan tautan yang valid");
      return;
    }
  
    try {
      const shareToken = getShareTokenFromLink(link);
      const response = await fetch(`http://127.0.0.1:8000/api/joinclasses/${shareToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ id: userId }),
      });
  
      const responseData = await response.json();
      if (response.ok) {
        if (responseData.message === "Anda sudah tergabung dalam kelas ini") {
          toast.info(responseData.message);
        } else {
          toast.success("Kelas berhasil ditambahkan");
        }
        fetchClasses();
      } else {
        if (responseData.message === "Anda sudah tergabung dalam kelas ini") {
          toast.info(responseData.message);
        } else {
          toast.error("Kelas dengan tautan tersebut tidak ditemukan");
        }
      }
    } catch (error) {
      console.error("Error joining class:", error);
      toast.error("Kelas dengan tautan tersebut tidak ditemukan");
    }
  
    setShowOverlay(false);
  };
  

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddClass();
    }
  };

  const isValidLink = (link) => {
    return /^(https?:\/\/|www\.)/i.test(link);
  };

  const getShareTokenFromLink = (link) => {
    const parts = link.split("/");
    return parts[parts.length - 1];
  };

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleReportClass = (index) => {
    console.log(`Kelas ${index} dilaporkan`);
    setOpenDropdownIndex(null);
  };

  const handleDeleteClass = async (index) => {
    const classId = classes[index].id;
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/classes/${classId}/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success("Berhasil keluar dari kelas");
        setClasses(classes.filter((_, i) => i !== index));
      } else {
        toast.error("Gagal keluar dari kelas");
      }
    } catch (error) {
      console.error("Error deleting class:", error);
      toast.error("Gagal keluar dari kelas");
    }
    setOpenDropdownIndex(null);
  };

  const handleClassClick = (classId, className) => {
    localStorage.setItem("selectedClassId", classId);
    localStorage.setItem("selectedClassName", className);
  };

  const getAvatarUrl = (name) => {
    return `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(name)}&fontSize=41&chars=1`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen z-0 relative font-custom font-Jakarta">
      <ToastContainer />
      <button
        className="fixed z-50 bottom-10 right-10 w-14 h-14 lg:h-16 lg:w-[15rem] lg:rounded-md lg:bg-white lg:text-indigo-600 lg:shadow-none lg:border-2 lg:border-indigo-600 lg:border-solid lg:hover:bg-indigo-600 lg:hover:text-white transition-all rounded-full bg-indigo-600 text-white flex items-center justify-center"
        onClick={handleButtonClick}>
        <div className="hidden lg:block">
          Join Class
        </div>
        <div className="lg:hidden block">
          <img src={AddIcon} alt="Add Class" className="h-5 w-5" />
        </div>
      </button>

      {showOverlay && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 md:w-2/3 rounded-md shadow-lg p-7">
            <h2 className="text-xl font-bold mb-4">Join Class</h2>
            <form>
              <div className="mb-4 mt-7">
                <input placeholder="Enter Class Link" type="text" id="classLink" value={link} onChange={handleLinkChange} onKeyPress={handleKeyPress} className="w-full h-14 p-2 border border-gray-300 rounded-md focus:outline-none" />
              </div>
              <div className="flex justify-end mt-16 gap-4">
                <button type="button" onClick={handleOverlayClose} className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
                  Cancel
                </button>
                <button type="button" onClick={handleAddClass} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-blue-600">
                  Join Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="h-full mt-14 z-0 overflow-x-hidden lg:mx-auto lg:h-full px-14">
        <div className="w-72 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 lg:mx-auto lg:flex-row lg:align-middle lg:items-center lg:container">
          {classes.map((classItem, index) => (
            <div className="relative" key={classItem.id} onClick={() => handleClassClick(classItem.id, classItem.class_name)}>
              <div className={`bg-white rounded-xl shadow-md p-4 border-2 border-solid lg:border-indigo-600 border-neutral-300 lg:w-[50rem] 2xl:w[75rem] 2xl:h-[20rem]`}>
                {classItem.background_img && <img src={`http://127.0.0.1:8000/${classItem.background_img}`} alt="Background" className="w-full h-28 object-cover flex mb-2 rounded-t-lg z-0 2xl:h-40" />}
                <img className="h-14 w-14 rounded-full -mt-10 ml-44 z-50 lg:ml-[42rem] 2xl:ml-[63rem] 2xl:w-20 2xl:h-20 2xl:-mt-11" src={getAvatarUrl(classItem.teacher_name)} alt="Icon" />
                <h1 onClick={() => navigate("/student/class/task")} className="text-2xl font-bold mb-2 -mt-1 -mr-20 2xl:mt-0 2xl:text-3xl">
                  {classItem.class_name}
                </h1>
                <p className="text-sm text-gray-600 mb-2 2xl:text-lg">{classItem.description}</p>

                <button onClick={() => toggleDropdown(index)} className="absolute top-full right-0 -mt-14 mr-2 px-2 py-1 z-50" id="options-menu" aria-haspopup="true" aria-expanded={openDropdownIndex === index ? "true" : "false"}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={3.75} d="M12 12h.01v.01H12zm0-7h.01v.01H12zm0 14h.01v.01H12z"></path>
                  </svg>
                </button>

                {openDropdownIndex === index && (
                  <div className="absolute top-full right-0 -mt-24 mr-1 bg-white rounded-md shadow-lg z-50">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <button onClick={() => handleReportClass(index)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">
                        Laporkan
                      </button>
                      <button onClick={() => handleDeleteClass(index)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">
                        Keluar Kelas
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

