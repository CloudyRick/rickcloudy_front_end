import React from "react";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import vector1 from "/images/vector1.png";

const HeroBanner = () => {
  React.useEffect(() => {}, []);

  return (
    <section className="bg-muted-navy min-h-[70vh] flex">
      <div className="flex flex-col justify-center lg:flex-row items-center w-[80%] mx-auto">
        <div className="hidden lg:w-1/2 lg:flex justify-center">
          <div className="w-[60%] aspect-square mt-20">
            <img src={vector1} alt="" />
          </div>
        </div>
        <div className="typewriter lg:mx-auto w-full lg:w-1/2 flex flex-col text-white">
          <div className="text-5xl font-epilogue font-extrabold">
            <h1>Hi! I'm Ricky</h1>{" "}
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("Web Developer")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("Cloud Engineer Student")
                  .pauseFor(1000)
                  .start();
              }}
              options={{ loop: true, autoStart: true }}
            />
          </div>
          <p className="text-justify font-mulish text-lg">
            Welcome to my portofolio website!
            <br />
            Currently I am a full-time student in TAFE Queensland Australia.{" "}
            <br />
            Developing a web has been my routine for the past 2 years and this
            website is the platform to show my{" "}
            <Link className="underline underline-offset-1" to={"#projects"}>
              projects
            </Link>{" "}
            and{" "}
            <Link className="underline underline-offset-1" to={"/blog-list"}>
              knowledges
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
