import { Advertisement } from "./advertisement";
import { User } from "./user";

export type Skill = {
  id: number;
  name: string;
  users: User[];
  advertisements: Advertisement[];
  color?: string;
  created_at: Date;
  updated_at: Date;
};
