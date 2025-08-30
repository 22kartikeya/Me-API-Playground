import mongoose, { Schema } from "mongoose";

const linksSchema = new Schema({
    github: {type: String, trim: true},
    linkedin: {type: String, trim: true},
    portfolio: {type: String, trim: true},
},{ _id: false });

const projectSchema = new Schema({
    title: {type: String, trim: true, required: true, unique: true},
    description: {type: String, trim: true},
    link: {type: String, trim: true},
    skills: [{type: String, trim: true},]
}, { _id: false });

const profileSchema = new Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, unique: true, required: true, trim: true},
    education: {type: String, trim: true},
    skills: [{type: String, trim: true}],
    projects: [projectSchema],
    work:[{
        role: {type: String, required: true, trim: true}, 
        company: {type: String, required: true, unique: true, trim: true}
    }],
    links: linksSchema
}, {timestamps: true});

export const profileModel = mongoose.model('profile', profileSchema);