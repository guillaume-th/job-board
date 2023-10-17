import { Company } from "./company";
import { JobApplication } from "./jobApplication";
import { Skill } from "./skill";
import { User } from "./user";

export type Advertisement = {
  id: number;
  name: string;
  description: string;
  salary: number;
  place: string;
  working_time: number;
  contract_type: string;
  skills: Skill[];
  created_at: Date;
  updated_at: Date;
  company: Company;
  job_applications?: JobApplication[];
  recruiter: User;
};
