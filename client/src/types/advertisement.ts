import { Company } from "./company";
import { User } from "./user";

export type Advertisement = {
    id:number,
    name:string,
    description: string,
    salary:number,
    place:string,
    working_time:number,
    contract_type:string,
    skills:string[],
    created_at:Date,
    updated_at:Date,
    company:Company,
    recruiter:User,
};