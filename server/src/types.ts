export interface IWork {
    role: String;
    company: String;
};

export interface ILink {
    github?: string;
    linkedin?: string;
    portfolio?: string;
};

export interface IProject {
    title: string;
    description?: string;
    link?: string;
    skills?: string[];
};

export interface IProfile {
    name: string;
    email: string;
    education: string;
    skills: string[];
    projects?: IProject[];
    work?: IWork[];
    links?: ILink;
}