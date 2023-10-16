import { User } from "./user";
import { Advertisement } from "./advertisement";
import { Message } from "./message";

export type JobApplication = {
    id : number,
    candidate : User,
    candidate_name : String,
    candidate_text : String,
    candidate_email : String,
    candidate_phone : String,
    advertisement : Advertisement,
    state : string,
    messages : Message[],
    created_at : Date,
    updated_at : Date,
};
