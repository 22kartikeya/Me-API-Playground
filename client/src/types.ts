export interface IWork {
  role: string;
  company: string;
}

export interface ILink {
  github?: string;
  linkedin?: string;
  portfolio?: string;
}

export interface IProject {
  title: string;
  description?: string;
  link?: string;
  skills?: string[];
}

export interface IProfile {
  _id?: string;
  name: string;
  email: string;
  education?: string;
  skills: string[];
  projects?: IProject[];
  work?: IWork[];
  links?: ILink;
  createdAt?: string;
  updatedAt?: string;
}