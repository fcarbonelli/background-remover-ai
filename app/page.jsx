import VideoRenderer from "@components/VideoRenderer";
import Features from "@components/Features";
import Previews from "@components/Previews";
import FAQ from "@components/FAQ";
import Footer from "@components/Footer";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Video Background Remover
      <br/>
      <span className='orange_gradient text-center'>Powered By AI</span>
    </h1>
    <p className='desc text-center'>
      Seamlessly Extract Backgrounds From Your Videos with AI-Powered Precision
    </p>
    <div className="flex justify-center lg:p-4 mt-10">
      <video className="rounded-lg lg:w-3/4" src="assets/videos/GreenScreenDemo.mp4" autoPlay muted loop controls></video>
    </div>

    <Features/>
    <Previews/>
    <FAQ/>

    <VideoRenderer/>
    
    <Footer/>
  </section>
);

export default Home;
