import Googlelogo from "../../assets/img/Google.svg";

function Googlebutton() {
  const handleLogin = () => {
    window.location.href = "http://127.0.0.1:8000/auth/google";
  };

  return (
    <>
      <div className="font-Jakarta">
        <button onClick={handleLogin} className="bg-neutral-200 font-bold text-xs w-28 h-10 rounded-md flex items-center justify-center align-middle gap-2 container">
          <img src={Googlelogo} alt="Google Logo" />
          Google
        </button>
      </div>
    </>
  );
}

export default Googlebutton;
