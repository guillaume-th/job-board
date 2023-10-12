import { FC } from "react";
import { Skill } from "../../../types/skill";

type Props = { skills: Skill[] };

const Skills: FC<Props> = ({ skills }) => {
  return (
    <div>
      {skills.map(({ name, color }) => (
        <span className={`bg-[${color}] p-4`}>{name}</span>
      ))}
    </div>
  );
};

export default Skills;
