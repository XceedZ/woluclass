import Navbar from "./NavbarStudent";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import { useState, useEffect } from "react";
import Send from "../../assets/img/Send.svg";

const Forum = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  
  const className = localStorage.getItem("selectedClassName");
  const classId = localStorage.getItem("selectedClassId"); 
  const user = JSON.parse(localStorage.getItem("user")); 
  const userId = user?.id; 
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchMessages();
  }, [classId, token]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/chats/class/${classId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setMessages(data.map(msg => ({
        text: msg.message,
        sender: msg.fullname,
        timestamp: new Date(msg.send_at).getTime(),
        senderId: msg.userId,
        senderName: msg.fullname
      })));
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      const newMessage = {
        user_id: userId,
        class_id: classId,
        message: message,
      };

      try {
        const response = await fetch('http://127.0.0.1:8000/api/chats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newMessage),
        });
        const data = await response.json();
        setMessages([...messages, {
          text: data.message,
          sender: user.fullname,
          timestamp: new Date().getTime(),
          senderId: userId,
          senderName: user.fullname
        }]);
        setMessage("");
        fetchMessages(); // Perbarui daftar pesan dengan mengambil pesan terbaru dari API
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const isValidTimestamp = (timestamp) => {
    return !isNaN(timestamp) && timestamp > 0;
  };

  const formatTime = (timestamp, timezone) => {
    if (isValidTimestamp(timestamp)) {
      return moment(timestamp).tz(timezone).format("HH:mm");
    } else {
      return "Invalid Time";
    }
  };

  const getAvatarUrl = (name) => {
    return `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(name)}&fontSize=41&chars=1`;
  };

  
  return (
    <div className="font-Jakarta">
      <Navbar />
      <nav className="bg-white p-4 px-12 py-7 font-Jakarta lg:float-left border-b-2 border-neutral-300 lg:w-full 2xl:w-full">
        <ul className="flex justify-between items-center lg:gap-14 lg:float-left 2xl:gap-24 2xl:float-left">
          <li className="mr-2">
            <a onClick={() => navigate("/student/class/task")} className="text-black hover:text-indigo-600 hover:border-b-4 hover:border-indigo-600 w-56 font-semibold transition-all">
              Task
            </a>
          </li>
          <li className="mr-2">
            <a onClick={() => navigate("/student/class/quiz")} className="text-black hover:text-indigo-600 hover:border-b-4 hover:border-indigo-600 w-56 font-semibold transition-all">
              Quiz
            </a>
          </li>
          <li className="mr-2">
            <a onClick={() => navigate("/student/class/members")} href="#" className="text-black hover:text-indigo-600 hover:border-b-4 hover:border-indigo-600 w-56 font-semibold transition-all">
              Member
            </a>
          </li>
          <li>
            <a onClick={() => navigate("/Forumstudent")} href="#" className="text-indigo-600 hover:text-indigo-600 border-b-4 border-indigo-600 w-56 font-semibold transition-all">
              Forum
            </a>
          </li>
        </ul>
      </nav>
      <div className="flex justify-center align-middle items-center mx-auto container gap-28 lg:gap-[30rem] mt-7 ml-1 font-Jakarta lg:mt-32 2xl:mt-32 2xl:ml-5">
        <h1 className="text-black font-semibold text-2xl lg:text-3xl 2xl:ml-60">{className}</h1>
        <div className="relative flex-row -ml-4">
          <button className="flex items-center justify-center w-8 h-8 bg-white rounded-full focus:outline-none focus:bg-gray-300 lg:block lg:ml-6">
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={3.75} d="M12 12h.01v.01H12zm0-7h.01v.01H12zm0 14h.01v.01H12z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="px-20 mt-16 mb-10 lg:px-[32rem] lg:mt-20 2xl:px-[48rem] 2xl:mb-20">
        <p className="text-xs flex justify-center bg-neutral-300 mx-auto items-center align-middle px-2 py-2 rounded-sm font-semibold">This forum is used to discuss material.</p>
      </div>
      <div className="mx-auto rounded-lg overflow-hidden mt-5 w-full lg:px-64 lg:mt-10 2xl:px-96">
            <div className="messages-container p-4 space-y-4 overflow-y-auto max-h-[calc(100vh - 400px)]">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"}`}>
                  <div className={`message ${msg.senderId === userId ? "bg-indigo-600 text-white rounded-lg rounded-tr-none px-3 py-2" : "bg-neutral-300 text-gray-800 rounded-lg rounded-tl-none px-3 py-2"} max-w-[90%] lg:max-w-[80%] xl:max-w-[90%]`} style={{ wordWrap: "break-word" }}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img src={getAvatarUrl(msg.sender)} alt="Avatar Pengirim Pesan" className="w-6 h-6 rounded-full mr-2" />
                        <p className="text-sm font-semibold p-2">{msg.senderName}</p>
                      </div>
                    </div>
                    {msg.text}
                    <p className="text-xs float-right text-neutral-400 mt-8">{formatTime(msg.timestamp, "Asia/Jakarta")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div> 

      <div className="mt-28 lg:px-60">
        <div className="input-container p-4 flex justify-center align-middle items-center mx-auto container bottom-0 left-0 mt-72 fixed bg-white border-2 border-neutral-300 w-full lg:w-[50%] lg:ml-80 lg:mb-10 lg:rounded-2xl lg:px-10 2xl:ml-[30rem]">
          <img className="w-9 h-9 rounded-full mr-3" src={getAvatarUrl(user.fullname)} alt="Avatar Pengguna" />
          <input type="text" value={message} onChange={handleMessageChange} onKeyDown={handleKeyPress} placeholder="Ketik pesan Anda..." className="flex-1 px-4 py-2 rounded-full bg-white max-w-[80%] lg:max-w-[90%] overflow-hidden" />
          <button onClick={handleSendMessage} className="px-4 py-2 bg-white text-white rounded-full focus:outline-none hover:bg-neutral-100 transition-all">
            <img className="w-7 h-7" src={Send} alt="Tombol Kirim" />
          </button>
        </div>
      </div>
 
    </div>
  );
};

export default Forum;
