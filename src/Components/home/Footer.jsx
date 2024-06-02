// Footer.js
import Logo from "../../assets/img/Logo.png";
const Footer = () => {
  return (
    <footer className="bg-white text-black py-8 mt-36 font-Jakarta">
      <div className="text-center mb-4 flex mx-auto justify-center items-center container lg:float-start lg:-ml-[30rem] lg:mt-10 2xl:float-start 2xl:-ml-[35rem] 2xl:mt-10">
        <img src={Logo} alt="Logo" className="mr-4 lg:w-5 lg:mt-20" />
        <h2 className="text-lg font-bold text-yellow-500 lg:text-xl lg:mt-20">
          <span className="text-indigo-600">WOLU </span>CLASSROOM
        </h2>
      </div>

      <div className="flex items-center justify-center container mx-auto mb-4 gap-7 mt-14 lg:gap-48 lg:ml-36 2xl:gap-60 2xl:ml-72">
        <nav className="text-sm font-semibold lg:text-xl">
          Menu
          <ul className="mt-3 text-sm font-normal lg:text-lg">
            <li>Home</li>
            <li>About Us</li>
          </ul>
        </nav>
        <nav className="text-sm font-semibold lg:text-xl">
          Information
          <ul className="mt-3 text-sm font-normal lg:text-lg">
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </nav>
        <nav className="text-sm font-semibold lg:text-xl">
          Download
          <ul className="mt-3 text-sm font-normal lg:text-lg">
            <li>Playstore</li>
            <li>Apple Store</li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center justify-center container mx-auto mt-14 -ml-20 lg:-ml-[30.5rem] 2xl:-ml-[38rem] 2xl:-mt-5 lg:-mt-5">
        <div className="p-1 mr-4 border-[1px] border-solid border-black rounded-full">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24">
              <path
                fill="black"
                d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"></path>
            </svg>
          </a>
        </div>
        <div className="p-1 mr-4 border-[1px] border-solid border-black rounded-full">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24">
              <path fill="black" d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z"></path>
            </svg>
          </a>
        </div>
        <div className="p-1 mr-4 border-[1px] border-solid border-black rounded-full">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 48 48">
              <path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" d="M21.604 25.622L7.693 41.498M37.924 6.502L25.554 21.07M6.61 6.5l27.44 35h7.56l-27.439-35z"></path>
            </svg>
          </a>
        </div>
        <div className="h-16 w-[1.5px] bg-indigo-600 mr-2 ml-2 lg:float-start lg:-ml-24 lg:hidden lg:-mt-56"></div>
      </div>
      <p className="text-xs text-center w-40 lg:text-base lg:text-left float-end -mt-12 mr-5 2xl:float-start 2xl:-mt-28 lg:float-start lg:-mt-28 ml-20">Enjoy your learning with our service</p>
      <div className="text-center mt-16 -mb-2">
        <p className="text-xs font-semibold lg:text-base 2xl:text-base">Company&copy; 2024 Wolu Classroom. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
