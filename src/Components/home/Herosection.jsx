// HeroSection.js
import Component from "../../assets/img/Component.svg";
import Play from "../../assets/img/Button-Play.png";
import Component2 from "../../assets/img/Component-3.svg";
import Component4 from "../../assets/img/Component-4.svg";
import Hero from "../../assets/img/Component-2.svg";
import Cardslide from "../home/Cardfeature";
import Eclipse from "../../assets/img/Ellipse-7.png";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const navigate = useNavigate();
  const data = [
    { title: "Card 1", description: "Description 1" },
    { title: "Card 2", description: "Description 2" },
    { title: "Card 3", description: "Description 3" },
    { title: "Card 4", description: "Description 4" },
    { title: "Card 5", description: "Description 5" },
    { title: "Card 6", description: "Description 6" },
  ];
  return (
    <div className="overflow-x-hidden font-Jakarta">
      <div className="w-[200px] h-[200px] bg-indigo-600 rounded-full blur-[90px] absolute -ml-32 z-0 mt-10 lg:-ml-24 lg:-mt-12 overflow-x-hidden" />
      <div className="hero-section text-black z-40 font-custom overflow-x-hidden justify-center items-center align-middle container mx-auto px-4 overflow-y-hidden lg:px-16 2xl:px-14 lg:font-custom">
        <h1 className="w-[95%] text-neutral-900 text-[2rem] font-bold leading-10 2xl:text-4xl overflow-y-hidden lg:text-4xl z-50">DISCOVER THE EASE OF LEARNING</h1>
        <p className="w-full text-2xl font-semibold mt-3 lg:w-full lg:text-neutral-900 2xl:text-4xl lg:font-semibold 2xl:tracking-[0.4rem] lg:tracking-[0.4rem] lg:text-3xl z-50">
          ONLINE WITH
          <span className="text-indigo-600"> WOLU</span>
          <span className="text-yellow-500"> CLASSROOM</span>
        </p>

        <p className="w-[350px] text-neutral-900 text-lg font-normal mt-3 lg:w-full lg:mt-10 2xl:w-full 2xl:mt-10">Simple. powerful. and fast—the key to a highly efficient online learning experience.</p>
        <div className="lg:flex mt-5 lg:gap-5">
          <button onClick={() => navigate("/signup")} className="bg-indigo-600 text-white w-full py-4 text-sm font-medium mt-3 rounded-md hover:bg-indigo-700 transition-all 2xl:h-fit 2xl:mt-10 2xl:w-56 lg:h-fit lg:mt-10 lg:w-56">
            <a>Get Started</a>
          </button>
          <button className="bg-white text-indigo-600 border-[0.5px] border-solid border-indigo-600 w-full py-4 text-sm font-medium mt-3 rounded-md hover:bg-indigo-600 hover:text-white transition-all 2xl:h-fit 2xl:mt-10 2xl:w-56 lg:h-fit lg:mt-10 lg:w-56">
            <a href="#Learn">Learn More</a>
          </button>
        </div>
        <div className="float-right hidden lg:block -mt-[22.5rem] h-full z-40 absolute ml-[60rem] lg:ml-[43rem] lg:-mt-[20rem] 2xl:ml-[55rem] 2xl:-mt-[23rem]">
          <img className="lg:w-full 2xl:w-[40rem]" src={Hero}></img>
        </div>
        <img id="Learn" className="mt-[4rem] mb-[32px] flex items-center align-middle justify-center container mx-auto 2xl:w-[88%] 2xl:mt-[15rem] lg:w-[88%] lg:mt-[9rem]" src={Component}></img>
        <a href="https://www.youtube.com/shorts/KaEnm860dHI" className="bg-white shadow-lg shadow-neutral-200 text-xs font-medium px-5 py-4 flex hover:shadow-none transition-all w-fit lg:px-8 lg:py-5 lg:text-sm lg:-mt-10 duration-500">
          <img className="w-3 h-3 mt-[1.7px] mr-4 lg:w-4 lg:h-4" src={Play}></img>Watch Video
        </a>
        <img className="absolute -mt-96 ml-[9.5rem] lg:hidden 2xl:hidden" src={Eclipse}></img>
        <div className="w-[200px] h-[200px] bg-indigo-600 rounded-full blur-[95px] absolute -mt-72 ml-40 z-0 lg:-mt-[63rem] lg:ml-[72rem] 2xl:ml-[98rem] 2xl:-mt-[75rem] lg:blur-[50px] 2xl:blur-[50px] hidden lg:block 2xl:block" />
        <div className="flex items-center align-middle justify-center container mx-auto mt-20 gap-4 w-full lg:gap-54 lg:ml-20 z-50">
          <img src={Component2} className="w-36 -mt-10 lg:w-[65%] lg:float-start lg:mr-[10rem] z-0"></img>
          <div>
            <h1 className="text-[11px] w-full font-semibold lg:text-3xl">
              WHAT IS <span className="text-indigo-600">WOLU</span> <span className="text-yellow-500">CLASSROOM</span> ?
            </h1>
            <p className="text-[9px] w-40 text-justify mt-4 lg:text-lg lg:w-[67%] 2xl:mt-10 lg:mt-10">
              WOLU CLASSROOM represents a futuristic step in the world of online education, creating a learning experience that is not only advanced but also facilitates students and teachers in weaving the tapestry of the education world.
            </p>
            <button className="bg-white border-[0.2px] border-solid border-indigo-600 text-indigo-600 w-32 text-xs rounded-md py-3 mt-5 hover:bg-indigo-600 hover:text-white transition-all lg:mt-10 2xl:mt-10">Read More</button>
          </div>
        </div>
        <div className="mt-16 mb-10 lg:mt-44">
          <h1 className="font-semibold text-lg lg:text-2xl">Feature</h1>
          <div className=" border-b-4 border-solid border-indigo-500 w-10 lg:mt-5 lg:w-16 lg:border-b-8 lg:absolute lg:-ml-3"></div>
        </div>
        <Cardslide data={data} />
        <div className="lg:mt-56">
          <img className="flex items-center justify-center container mx-auto w-72 lg:float-end lg:w-[30%] lg:mr-20 2xl:float-end 2xl:w-[30%] 2xl:mr-32" src={Component4}></img>
          <div className="mt-[53px] flex items-center justify-center container mx-auto ml-2 lg:mt-10 lg:absolute lg:ml-20 2xl:mt-16 2xl:absolute 2xl:ml-24">
            <div className="items-center justify-center container mx-auto">
              <h1 className="text-lg font-semibold lg:text-xl 2xl:text-2xl">
                VARIOUS TOOLS FOR <span className="text-indigo-600 lg:text-black">TEACHERS</span> AND <span className="text-yellow-500 lg:text-black">STUDENT</span> ONLINE
              </h1>
              <p className="text-sm mt-10 text-justify w-[21rem] lg:w-[37%]">
                Interactive learning platforms, digital learning resources, and collaborative features that enable more effective and engaging teaching and learning experiences, such as live classes, quizzes, forums, and other captivating
                features.
              </p>
            </div>
          </div>
          <a className="text-sm border-[0.5px] border-solid border-indigo-600 text-indigo-600 px-8 py-3 rounded-sm hover:bg-indigo-600 hover:text-white transition-all mt-7 absolute lg:mt-56 lg:ml-20 2xl:mt-60 2xl:ml-24">Read More</a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
