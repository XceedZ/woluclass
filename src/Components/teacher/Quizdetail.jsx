import Navbar from "./NavbarUtama";
import Penicon from "../../assets/img/Pen.svg";
const Quizdetail = () => {
  return (
    <>
      <div className="font-Jakarta">
        <Navbar />
        <div className="flex justify-center mx-auto align-middle items-center container mt-7 gap-24 lg:gap-96 lg:mt-10 2xl:gap-[50rem] 2xl:mt-16">
          <h1 className="text-xl font-semibold lg:text-2xl">English XI PPLG 1 - Quiz</h1>
          <div>
            <img src={Penicon} alt="Pen Icon" />
          </div>
        </div>
        <div className="max-w-md mx-auto bg-white rounded-md p-6 mt-10 lg:mt-20 lg:p-2 2xl:p-0 2xl:mt-32">
          <h1 className="text-base font-bold mb-4 2xl:text-lg">Score</h1>
          <ul>
            <li className="flex justify-between items-center mb-2 font-semibold bg-yellow-500 text-white p-3 px-14 rounded-lg 2xl:px-10 2xl:p-5">
              <span className="font-semibold text-white 2xl:text-lg">1. Alexander Agung</span>
              <span className="text-right 2xl:text-lg">85</span>
            </li>
            <li className="font-semibold bg-indigo-600 text-white p-3 px-14 rounded-lg justify-between flex 2xl:px-10 2xl:p-5 2xl:mt-4">
              <span className="font-semibold text-white 2xl:text-lg">2. Rafif Naufal</span>
              <span className="text-right 2xl:text-lg">90</span>
            </li>
            <li className="flex justify-between items-center mb-2 font-semibold bg-indigo-600 text-white p-3 px-14 rounded-lg mt-2 2xl:px-10 2xl:p-5 2xl:mt-4">
              <span className="font-semibold 2xl:text-lg">3. Farda Syarrif M</span>
              <span className="text-right 2xl:text-lg">75</span>
            </li>
            <li className="flex justify-between items-center mb-2 px-14 mt-7 2xl:px-10 2xl:p-5">
              <span className="font-semibold 2xl:text-lg">4. Farda Syarrif M</span>
              <span className="text-right 2xl:text-lg">75</span>
            </li>
            <li className="flex justify-between items-center mb-2 px-14 mt-7 2xl:px-10 2xl:p-5">
              <span className="font-semibold 2xl:text-lg">5. Farda Syarrif M</span>
              <span className="text-right">75</span>
            </li>
            <li className="flex justify-between items-center mb-2 px-14 mt-7 2xl:px-10 2xl:p-5">
              <span className="font-semibold 2xl:text-lg">6. Farda Syarrif M</span>
              <span className="text-right 2xl:text-lg">75</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Quizdetail;
