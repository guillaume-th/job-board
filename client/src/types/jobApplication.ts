import { User } from "./user";
import { Advertisement } from "./advertisement";
import { Message } from "./message";

export type JobApplication = {
  id: number;
  candidate: User;
  candidate_name: string;
  candidate_text: string;
  candidate_email: string;
  candidate_phone: string;
  advertisement: Advertisement;
  state: string;
  messages: Message[];
  created_at: Date;
  updated_at: Date;
};
