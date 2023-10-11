import { Advertisement } from "./advertisement";
import { User } from "./user";

export type Skill = {
  id: number;
  name: string;
  users: User[];
  advertisements: Advertisement[];
  created_at: Date;
  updated_at: Date;
};
