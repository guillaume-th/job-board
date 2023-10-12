import { Advertisement } from "./advertisement";
import { Company } from "./company";
import { JobApplication } from "./jobApplication";
import { Skill } from "./skill";

export type User = {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone?: string;
  role: string;
  skills?: Skill[];
  created_advertisements?: Advertisement[];
  company: Company;
  job_applications?: JobApplication[];
  avatar: string;
  description: string;
  created_at: Date;
  updated_at: Date;
};
