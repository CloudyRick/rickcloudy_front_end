import HeroBanner from "../components/HeroBanner";
import Skills from "../components/Skills";

const Home = (): JSX.Element => {
  return (
    <div className="min-h-[100vh]">
      <HeroBanner />
      <Skills />
    </div>
  );
};

export default Home;
