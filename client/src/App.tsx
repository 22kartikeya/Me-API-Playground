import { useEffect, useState } from "react";
import type { IProfile } from "./types";
import { api } from "./api";
import Navbar from "./components/Navbar";
import ProfileCard from "./components/ProfileCard";
import ProfileModal from "./components/ProfileModal";

export default function App() {
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeProfile, setActiveProfile] = useState<IProfile | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const res = await api.get("/profile");
      setProfiles(res.data.profiles || []);
      setError(null);
    } catch (e: any) {
      setError("Failed to fetch profiles");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const onSearch = async (q: string) => {
    if (!q) {
      fetchProfiles();
      return;
    }
    try {
      setLoading(true);
      const res = await api.get("/search", { params: { q } });
      setProfiles(res.data.results || []);
      setError(null);
    } catch (e) {
      setError("Search failed");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onSearchProjects = async (skill: string) => {
    if (!skill) {
      fetchProfiles();
      return;
    }
    try {
      setLoading(true);
      const res = await api.get("/projects", { params: { skill } });
      const projects = res.data.projects || [];
      const pseudo: IProfile[] = projects.map((p: any, idx: number) => ({
        _id: "proj-" + idx,
        name: p.title,
        email: "",
        education: "",
        skills: p.skills || [],
        projects: [p],
        work: [],
        links: {},
      }));
      setProfiles(pseudo);
      setError(null);
    } catch (e) {
      console.error(e);
      setError("Project search failed");
    } finally {
      setLoading(false);
    }
  };

  const onTopSkills = async () => {
    try {
      setLoading(true);
      const res = await api.get("/skills/top");
      const topSkills: string[] = res.data.topSkills || [];
      if (topSkills.length) {
        onSearch(topSkills[0]);
      } else {
        setError("No top skills found");
      }
    } catch (e) {
      console.error(e);
      setError("Top skills fetch failed");
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (profile: IProfile) => {
    setActiveProfile(profile);
    setIsCreateMode(false);
    setShowModal(true);
  };

  const openCreate = () => {
    setActiveProfile(null);
    setIsCreateMode(true);
    setShowModal(true);
  };

  const handleSave = async (p: IProfile) => {
    try {
      setLoading(true);
      if (isCreateMode) {
        await api.post("/profile", p);
      } else {
        await api.put("/profile", p);
      }
      await fetchProfiles();
      setShowModal(false);
    } catch (e) {
      console.error(e);
      setError("Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-root">
      <Navbar
        onSearch={onSearch}
        onSearchProjects={onSearchProjects}
        onTopSkills={onTopSkills}
        onAddProfile={openCreate}
      />
      <main className="container">
        {loading && <div className="info">Loading…</div>}
        {error && <div className="error">{error}</div>}
        {!loading && !profiles.length && (
          <div className="info">No profiles yet</div>
        )}
        <div className="grid">
          {profiles.map((p) => (
            <ProfileCard
              key={p._id || p.email || Math.random()}
              profile={p}
              onClick={() => openEdit(p)}
            />
          ))}
        </div>
      </main>

      {showModal && (
        <ProfileModal
          profile={activeProfile}
          isCreate={isCreateMode}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
