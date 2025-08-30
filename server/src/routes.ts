import { Router } from "express";
import { IProfile, IProject } from "./types";
import { profileModel } from "./models/profile.schema";
const router = Router();

router.post('/profile', async (req, res) => {
    try{
        const data = req.body as IProfile;
        const existingUser  = await profileModel.findOne({email: data.email});
        if(existingUser) return res.status(409).json({message: "Profile already exist"});
        const profile = await profileModel.create({
            name: data.name,
            email: data.email,
            education: data.education,
            skills: data.skills,
            projects: data.projects,
            work: data.work,
            links: data.links
        })
        return res.status(201).json({message: "Profile Created", profile});
    }catch(e){
        console.log('profile adding error', e);
        return res.status(500).json({message: "Internal Server Error"});
    }
});

router.put('/profile', async(req, res) => {
    try{
        const data = req.body as IProfile;
        const emailNorm = String(data.email).trim();
        await profileModel.updateOne({email: emailNorm}, data);
        return res.status(201).json({message: "Profile updated"})

    }catch(e){
        console.log('profile updation error', e);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

router.get('/profile', async (_req, res) => {
    try{
        const allProfiles = await profileModel.find().sort({createdAt: -1}).lean();
        if(!allProfiles.length) return res.status(200).json({profiles: []});
        return res.status(200).json({
            profiles: allProfiles.map((b) => ({
                name: b.name,
                email: b.email,
                education: b.education,
                skills: b.skills,
                projects: b.projects,
                work: b.work,
                links: b.links
            })),
        });
    }catch(e){
        console.log("Error in fetching broadcast: ", e);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

router.get('/projects', async (req, res) => {
    try{
        const { skill } = req.query;
        const profiles = await profileModel.find().lean();
        let projects: IProject[] = [];
        profiles.forEach((p) => {
            p.projects.forEach((proj: any) => {
                if(!skill || proj.skills?.includes(skill as string)){
                    projects.push(proj);
                }
            });
        });
        return res.status(200).json({projects});
    }catch(e){
        console.error("Error in fetching projects:", e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

router.get('/skills/top', async (_req, res) => {
    try{
        const profiles = await profileModel.find().lean();
        const skillCount: Record<string, number> = {};
        profiles.forEach((p) => {
            p.skills.forEach((s) => {
                skillCount[s] = (skillCount[s] || 0) + 1;
            });
        });
        const topSkills = Object.entries(skillCount).sort((a, b) => b[1] - a[1]).map(([skill]) => skill).slice(0, 5);
        return res.status(200).json({ topSkills });
    }catch(e){
        console.error("Error in fetching top skills:", e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    const query = (q as string).toLowerCase();
    const profiles = await profileModel.find().lean();
    const results = profiles.filter((p) => {
      if (p.name?.toLowerCase().includes(query)) return true;
      if (p.email?.toLowerCase().includes(query)) return true;
      if ((p.skills || []).some((s: any) =>
        typeof s === "string" && s.toLowerCase().includes(query)
      )) return true;
      if ((p.projects || []).some((proj: any) =>
        (proj.title && proj.title.toLowerCase().includes(query)) ||
        (proj.description && proj.description.toLowerCase().includes(query))
      )) return true;
      return false;
    });

    return res.status(200).json({ results });
  } catch (e) {
    console.error("Error in search:", e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;