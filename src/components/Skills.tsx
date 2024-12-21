import { ISkill, skills } from "../staticData";
import ProgressBar, { ProgressBarProps } from "./ProgressBar";

const Skills = () => {
  return (
    <div className="relative">
      <div className="bg-muted-navy bg-doodle-pattern min-h-[30vh] text-white pb-10">
        <div className="mx-auto max-w-[90%] lg:max-w-[85%] flex flex-col">
          <h1 className="mx-auto my-8 font-epilogue font-extrabold text-2xl">
            My Skills
          </h1>
          {skills.map((skill: ISkill, skillIndex) => (
            <div
              key={skillIndex}
              className="flex flex-col gap-8 lg:flex-row lg:space-x-10 mx-auto w-full lg:max-w-[85%]"
            >
              <div className="w-full lg:w-1/2">
                <div className="title text-xl">
                  <h1 className="font-epilogue font-extrabold">
                    {skill.skillName}
                  </h1>
                </div>
                <div className="progress-bar text-gray-600">
                  {skill.skillProps.map((prop: ProgressBarProps, propIndex) => (
                    <ProgressBar
                      key={propIndex}
                      progressName={prop.progressName}
                      progressPercentage={prop.progressPercentage}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="text-xl">
                  <h2 className="font-epilogue font-extrabold">
                    Tasks & Responsibilities
                  </h2>
                </div>
                <div className="font-mulish">
                  <ul className="max-w-md space-y-1  list-disc list-inside">
                    {skill.taskNRes.map((task: string, taskIndex) => (
                      <li key={taskIndex}>{task}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
