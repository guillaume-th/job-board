import { FC } from "react";
import { Skill } from "../../../types/skill";

type Props = { skills: Skill[] };

const Skills: FC<Props> = ({ skills }) => {
  return (
    <div>
      {skills.map(({ name }) => (
        <span>{name}</span>
      ))}
    </div>
  );
};

export default Skills;
