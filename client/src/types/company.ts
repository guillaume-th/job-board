import { Advertisement } from "./advertisement";
import { Industry } from "./industry";
import { User } from "./user";

export type Company = {
    created_at: Date,
    id: number,
    industry: Industry,
    name: string,
    updated_at: Date,
    advertisements:Advertisement[],
    users: User[], 
    description?: string;
    avatar?: string; 
    banner?: string; 
};
