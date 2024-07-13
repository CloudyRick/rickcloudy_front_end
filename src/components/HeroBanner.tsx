import React from "react";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import heroImage from "/images/web_dev.png";

const HeroBanner = () => {
  React.useEffect(() => {}, []);

  return (
    <section className="bg-lavender min-h-[60vh] flex">
      <div className="flex flex-col lg:flex-row items-center w-[80%] mx-auto gap-10">
        <div className="w-full lg:w-1/2 flex justify-center mt-5 lg:mt-0">
          <div className="w-[300px] aspect-square bg-hero">
            <img src={heroImage} alt="" />
          </div>
        </div>
        <div className="typewriter mx-auto w-full lg:w-1/2 flex flex-col gap-3">
          <div className="text-4xl font-epilogue font-extrabold">
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
          <p className="text-justify font-mulish">
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
