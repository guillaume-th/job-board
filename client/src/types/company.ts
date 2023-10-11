import { User } from "./user";
import { Industry } from "./industry";

export type Company = {
    "created_at": Date,
    "id": number,
    "industry": Industry,
    "name": string,
    "updated_at": Date,
    "users": User[]
};
