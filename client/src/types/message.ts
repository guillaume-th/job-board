import { User } from "./user";
import { JobApplication } from "./jobApplication";

export type Message = {
    id : number,
    content : string,
    author : User,
    job_application : JobApplication,
    created_at : Date,
    updated_at : Date,
};
