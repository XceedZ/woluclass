/* eslint-disable react/jsx-key */
// src/CardSlider.js
import Conference from "../../assets/img/Q.svg";
function CardSlider() {
  return (
    <>
      <div data-aos="fade-out" data-aos-duration="1000" data-aos-delay="600" className="container flex justify-center align-middle sm:mx-auto md:mx-auto lg:mx-auto 2xl:mx-auto mb-20 font-Jakarta">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-10 2xl:gap-10 2xl:mt-10 lg:mt-10">
          <div
            id="Card-head"
            className="w-40 h-40 bg-white border-2 border-neutral-400 border-solid rounded-md hover:border-2 overflow-y-hidden hover:bg-indigo-600 hover:text-white transition-all px-3 pt-6 text-black text-xs lg:text-base font-semibold 2xl:w-72 2xl:h-72 2xl:pt-14 2xl:px-9 lg:w-64 lg:h-64 lg:pt-10 lg:px-5"
            data-tilt>
            <img className="mb-3 bg-indigo-600 rounded-md px-[0.9rem] py-[0.9rem] lg:py-[1rem] lg:px-[1rem] lg:w-[3.7rem] lg:rounded-xl" src={Conference} />
            <h1 className="mb-2 lg:text-lg lg:mt-5">Quiz</h1>
            <p className="w-40 lg:text-base lg:font-normal lg:w-56 lg:mt-5 opacity-80 text-[10.5px]">Managing exams and assessment converence</p>
          </div>
          <div
            id="Card-head"
            className="w-40 h-40 bg-white border-2 border-neutral-400 border-solid rounded-md hover:border-2 overflow-y-hidden hover:bg-indigo-600 hover:text-white transition-all px-3 pt-6 text-black text-xs font-semibold 2xl:w-72 2xl:h-72 2xl:pt-14 2xl:px-9 lg:w-64 lg:h-64 lg:pt-10 lg:px-5"
            data-tilt>
            <div className="bg-indigo-600 w-fit p-2 rounded-md mb-3 lg:py-[1rem] lg:px-[1rem] lg:w-[3.7rem] lg:rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 50 50">
                <g fill="white">
                  <path d="M4 20.07C4 14.507 8.508 10 14.07 10h7.86C27.493 10 32 14.508 32 20.07c0 5.56-4.508 10.069-10.07 10.069H16V35S4 32.57 4 20.07"></path>
                  <path d="M24.477 31.867a8.029 8.029 0 0 0 5.579 2.244H33V38s11-1.944 11-11.944A8.056 8.056 0 0 0 35.945 18h-2.21c.173.656.265 1.345.265 2.056c0 5.794-4.08 10.636-9.523 11.811"></path>
                </g>
              </svg>
            </div>
            <h1 className="mb-2 lg:text-lg lg:mt-5">Forum</h1>
            <p className="lg:text-base lg:font-normal lg:w-56 lg:mt-5 opacity-80 text-[10.5px]">Ask anything to the teacher in real-time.</p>
          </div>
          <div
            id="Card-head"
            className="w-40 h-40 bg-white border-2 border-neutral-400 border-solid rounded-md hover:border-2 overflow-y-hidden hover:bg-indigo-600 hover:text-white transition-all peer px-3 pt-6 text-black text-xs font-semibold 2xl:w-72 2xl:h-72 2xl:pt-14 2xl:px-9 lg:w-64 lg:h-64 lg:pt-10 lg:px-5"
            data-tilt>
            <div className="bg-indigo-600 w-fit p-2 rounded-md mb-3 lg:py-[1rem] lg:px-[1rem] lg:w-[3.7rem] lg:rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24">
                <path
                  fill="white"
                  d="M7.956 2.524c.961-.267 2.342-.53 4.045-.528a15.32 15.32 0 0 1 4.043.53c.48.134.857.267 1.117.37a7.133 7.133 0 0 1 .423.183c.04.02-.558 1.12.001 0a.75.75 0 0 1-.668 1.343h-.002l-.01-.005a5.724 5.724 0 0 0-.293-.125a9.768 9.768 0 0 0-.968-.32a13.822 13.822 0 0 0-3.645-.476a13.603 13.603 0 0 0-3.642.473a9.637 9.637 0 0 0-.967.32a5.599 5.599 0 0 0-.293.126l-.01.005a.75.75 0 1 1-.675-1.34h.002l.003-.002l.008-.004l.025-.012l.084-.039c.07-.032.172-.076.303-.128c.26-.103.638-.238 1.119-.371M6.75 20.25l-.334.672h.002l.003.002l.008.004l.024.011l.084.039c.07.031.172.075.303.126c.26.102.637.235 1.117.367c.961.265 2.34.527 4.042.529a15.15 15.15 0 0 0 4.045-.525c.48-.133.857-.268 1.118-.37a6.894 6.894 0 0 0 .387-.167l.025-.011l.008-.004l.003-.002s.002 0-.335-.671l.337.67a.75.75 0 0 0-.673-1.34l-.01.004l-.054.025c-.05.023-.131.058-.239.1a9.663 9.663 0 0 1-.967.32c-.851.235-2.095.473-3.643.471a13.875 13.875 0 0 1-3.646-.475a9.794 9.794 0 0 1-.968-.318a5.753 5.753 0 0 1-.294-.124l-.01-.005a.75.75 0 0 0-.667 1.344zM6.25 6.5A2.25 2.25 0 0 0 4 8.75v6.5a2.25 2.25 0 0 0 2.25 2.25h6.5A2.25 2.25 0 0 0 15 15.25v-6.5a2.25 2.25 0 0 0-2.25-2.25zm13.02 9.826L16 13.601V10.4l3.27-2.722a.75.75 0 0 1 1.23.577v7.495a.75.75 0 0 1-1.23.576"></path>
              </svg>
            </div>
            <h1 className="mb-2 lg:text-lg lg:mt-5">Live Class</h1>
            <p className="lg:text-base lg:font-normal lg:w-56 lg:mt-5 opacity-80 text-[10.5px]">Direct interaction with teachers and students.</p>
          </div>
          <div
            id="Card-head"
            className="w-40 h-40 bg-white border-2 border-neutral-400 border-solid rounded-md hover:border-2 overflow-y-hidden hover:bg-indigo-600 hover:text-white transition-all peer px-3 pt-6 text-black text-xs font-semibold 2xl:w-72 2xl:h-72 2xl:pt-14 2xl:px-9 lg:w-64 lg:h-64 lg:pt-10 lg:px-5"
            data-tilt>
            <div className="bg-indigo-600 w-fit p-2 rounded-md mb-3 lg:py-[1rem] lg:px-[1rem] lg:w-[3.7rem] lg:rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 16 16">
                <path
                  fill="white"
                  d="M3 3a2 2 0 1 1 4 0a2 2 0 0 1-4 0m6.779 1.584l.042.032a2 2 0 1 0-.042-.032M6.268 6A2 2 0 1 1 9.73 7.998A2 2 0 0 1 6.268 6M2.5 6h2.67a3.013 3.013 0 0 0 .594 3H5.5a2.501 2.501 0 0 0-2.355 1.658a3.733 3.733 0 0 1-.933-.543C1.46 9.51 1 8.616 1 7.5A1.5 1.5 0 0 1 2.5 6m8 3c1.085 0 2.009.691 2.355 1.658c.34-.139.654-.32.933-.543C14.54 9.51 15 8.616 15 7.5A1.5 1.5 0 0 0 13.5 6h-2.67c.11.313.17.65.17 1a2.99 2.99 0 0 1-.764 2zm1.387 1.928c.073.176.113.37.113.572c0 1.116-.459 2.01-1.212 2.615C10.047 14.71 9.053 15 8 15c-1.053 0-2.047-.29-2.788-.885C4.46 13.51 4 12.616 4 11.5A1.496 1.496 0 0 1 5.5 10h5a1.5 1.5 0 0 1 1.387.928"></path>
              </svg>
            </div>
            <h1 className="mb-2 lg:text-lg lg:mt-5">Teacher & Student</h1>
            <p className="lg:text-base lg:font-normal lg:w-56 lg:mt-5 opacity-80 text-[10.5px]">Teachers and students in one tap.</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default CardSlider;
