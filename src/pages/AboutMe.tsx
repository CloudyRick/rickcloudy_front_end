import { Link } from "react-router-dom";
import vector1 from "/images/vector1.png";

const AboutMe = () => {
  return (
    <section className="bg-muted-navy min-h-[90vh] flex py-20">
      <div className="flex flex-col justify-center lg:flex-row items-center w-[80%] mx-auto">
        <div className="w-full lg:w-1/2 flex flex-col text-white">
          <h2 className="text-4xl font-epilogue font-extrabold mb-4">
            About Me
          </h2>
          <p className="text-justify font-mulish text-lg">
            I'm Ricky, a passionate Web Developer and Cloud Engineer student.
            With a strong interest in web technologies, I've been learnin and
            developing web applications for over two years. My journey in IT has
            led me to explore cloud computing, networking, and backend
            development.
          </p>
          <p className="text-justify font-mulish text-lg mt-4">
            Currently, I'm studying at TAFE Queensland, Australia, where I
            deepen my knowledge in IT infrastructure and development. My goal is
            to build scalable and efficient web applications while continuously
            learning and improving my skills.
          </p>
          <p className="text-justify font-mulish text-lg mt-4">
            Check out my latest{" "}
            <Link className="underline underline-offset-1" to={"#projects"}>
              projects
            </Link>{" "}
            or read my{" "}
            <Link className="underline underline-offset-1" to={"/blogs"}>
              blog
            </Link>{" "}
            to see what I'm working on!
          </p>

          <h2 className="text-4xl font-epilogue font-extrabold mt-10 mb-4">
            How I Started My IT Journey
          </h2>
          <p className="text-justify font-mulish text-lg">
            I started my IT journey when I was in Bali and got into a college
            there. During my first year, they had an internship program that
            involved an online web development course based in Singapore.
            However, in the middle of the training, my friends and I discovered
            it was actually a scam. They promised six interview opportunities,
            claiming that if all six failed, there would be no charges for
            quitting the program. But one of our friends from an earlier batch
            failed all interviews, returned to regular classes, and was charged
            $600—an enormous amount in Bali.
          </p>
          <p className="text-justify font-mulish text-lg mt-4">
            After realizing the deception, I decided to quit, but I was also
            charged for not completing the program. This experience left me
            frustrated and hopeless, making me question the reliability of the
            education system there. Despite this setback, I continued learning
            web development independently, focusing on building APIs and simple
            front-end applications.
          </p>

          <h2 className="text-4xl font-epilogue font-extrabold mt-10 mb-4">
            Why I Chose to Study IT Networking and Cloud Computing in Australia
          </h2>
          <p className="text-justify font-mulish text-lg">
            My decision to study IT Networking and Cloud Computing in Australia
            was influenced by my girlfriend. She was planning to study in
            Australia, and her dad convinced both me and my parents to join her.
            Since I already had a solid foundation in web development from the
            training program and self-study, I started wondering how to properly
            deploy the web applications and APIs I had developed.
          </p>
          <p className="text-justify font-mulish text-lg mt-4">
            This curiosity led me to choose Networking and Cloud Computing as my
            major. I wanted to understand the infrastructure behind deploying
            applications, managing servers, and ensuring scalability. This
            decision has helped me bridge the gap between development and
            deployment, allowing me to become a more well-rounded IT
            professional.
          </p>
        </div>
        <div className="hidden lg:w-1/2 lg:flex justify-center">
          <div className="w-[60%] aspect-square mt-20">
            <img src={vector1} alt="About Me Illustration" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
