import { Industry } from "./industry";
import { User } from "./user";

export type Company = {
    created_at: Date,
    id: number,
    industry: Industry,
    name: string,
    updated_at: Date,
    users: User[], 
    description?: string;
    avatar?: string; 
    banner?: string; 
};
