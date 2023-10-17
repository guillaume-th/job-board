/* eslint-disable no-template-curly-in-string */
import { InputProps } from "./components/ui/atoms/Input";

export type Field = Partial<InputProps> & {
  dropdown?: string;
  fields?: string[];
  special?: string;
  k?: string;
  labelK?: string;
};
type Conf = {
  fields: Field[];
  title: string;
  dropdown?: string;
  columns?: string[];
  auth: string[];
};

export const adminConfig: Record<string, Conf> = {
  skills: {
    title: "skill",
    fields: [
      { name: "name", placeholder: "PHP" },
      { name: "color", type: "color" },
    ],
    columns: ["id", "name", "color"],
    auth: ["admin"],
  },
  companies: {
    title: "company",
    fields: [
      { name: "name", placeholder: "Bidou Inc." },
      { name: "description", placeholder: "blablabla" },
      { name: "avatar", placeholder: "http://url.com/avatar.png" },
      { name: "banner", placeholder: "http://url.com/banner.png" },
      { name: "users", placeholder: "Browse users", dropdown: "users" },
    ],
    columns: ["id", "name", "description"],
    auth: ["admin"],
  },
  users: {
    title: "user",
    fields: [
      { name: "email", placeholder: "bob@mail.com" },
      { name: "password", placeholder: "*********", type: "password" },
      { name: "firstname", placeholder: "Bob" },
      { name: "lastname", placeholder: "Bidou" },
      { name: "username", placeholder: "bob_bidou" },
      {
        type: "radio",
        name: "role",
        fields: ["admin", "candidate", "recruiter"],
      },
      { name: "phone", placeholder: "01 02 03 04 05" },
      { name: "avatar", placeholder: "http://url.com/avatar.png" },
      { name: "description", placeholder: "blablabla" },
      { name: "adress", placeholder: "31 rue de la Paix, Paris" },
      { name: "skills", placeholder: "Browse skills", dropdown: "skills" },
    ],
    columns: ["id", "email", "firstname", "lastname", "role"],
    auth: ["admin", "recruiter", "candidate"],
  },
  industries: {
    title: "industry",
    columns: ["id", "name", "color"],
    fields: [{ name: "name", placeholder: "IT" }],
    auth: ["admin"],
  },
  advertisements: {
    title: "advertisement",
    fields: [
      { name: "name", placeholder: "Full-stack developer" },
      {
        name: "description",
        placeholder:
          "Your missions: blablabla...\nExpected skills: blablabla...",
      },
      { name: "salary", placeholder: "3500.0", type: "number" },
      { name: "place", placeholder: "Paris 11" },
      {
        name: "working_time",
        placeholder: "35",
        label: "Working time (in hours)",
      },
      {
        name: "skills",
        placeholder: "Browse skills",
        dropdown: "skills",
        label: "Skills you are looking for:",
      },
      {
        special: "prefill-admin",
        label: "Company",
        k: "currentUser.company.id",
        labelK: "currentUser.company.name",
        name: "company_id",
        placeholder: "Browse companies...",
        resource: "companies",
        hidden: true,
      },
      { name: "place", placeholder: "12 Tech Street" },
      {
        type: "radio",
        name: "contract_type",
        fields: [
          "permanent_contract",
          "temporary_contract",
          "internship",
          "apprenticeship",
        ],
      },
      {
        special: "prefill",
        k: "currentUser.id",
        name: "recruiter_id",
        hidden: true,
      },
    ],
    columns: [
      "id",
      "name",
      "description",
      "salary",
      "place",
      "working_time",
      "contract_type",
    ],
    auth: ["admin", "recruiter"],
  },
  applications: {
    fields: [
      {
        label: "Candidate",
        special: "prefill-admin",
        k: "currentUser.id",
        labelK: "currentUser.email",
        name: "candidate_id",
        resource: "users",
        hidden: true,
      },
      {
        special: "prefill",
        name: "candidate_name",
        k: "`${currentUser.firstname} ${currentUser.lastname}`",
        placeholder: "Bob Bidou",
        label: "Name",
      },
      {
        special: "prefill",
        name: "candidate_email",
        k: "currentUser.email",
        placeholder: "bob@mail.com",
        label: "Email",
      },
      {
        special: "prefill",
        name: "candidate_phone",
        k: "currentUser.phone",
        placeholder: "01 02 03 04 05",
        label: "Phone number",
      },
      {
        name: "candidate_text",
        placeholder: "I am very interested in your offer, because...",
      },
      {
        special: "prefill-admin",
        labelK: "searchParams.get('advertisement_id')",
        k: "searchParams.get('advertisement_id')",
        name: "advertisement_id",
        resource: "advertisements",
        hidden: true,
      },
      { special: "prefill", name: "state", k: "'sent'", hidden: true },
    ],
    title: "application",
    auth: ["admin", "recruiter", "candidate"],
    columns: [
      "id",
      "candidate_name",
      "candidate_email",
      "candidate_phone",
      "state",
    ],
  },
};
