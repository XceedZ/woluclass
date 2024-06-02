import Navbar from "./Navbar";
import HeroSection from "../home/Herosection";
import Footer from './Footer'
const Landing = () => {
  return (
    <div className="font-custom">
      <div>
        <Navbar />
      </div>

      <div className="mt-36 overflow-x-hidden overflow-y-hidden lg:mt-72">
        <HeroSection />
      </div>

      <div>
        <Footer/>
      </div>

    </div>
  );
};
export default Landing;
