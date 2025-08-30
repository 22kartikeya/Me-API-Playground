import { useEffect, useState } from "react";
import type { IProfile } from "./types";
import Navbar from "./components/Navbar";
import ProfileCard from "./components/ProfileCard";
import ProfileModal from "./components/ProfileModal";
import axios from "axios";
import { Loading } from "./components/Loading";

export default function App() {
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeProfile, setActiveProfile] = useState<IProfile | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const API_BASE = import.meta.env.VITE_BASE_URL || "";

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/profile`);
      setProfiles(res.data.profiles || []);
      setError(null);
    } catch (e) {
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
      const res = await axios.get(`${API_BASE}/search`, { params: { q } });
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
      const res = await axios.get(`${API_BASE}/projects`, { params: { skill } });
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
      const res = await axios.get(`${API_BASE}/skills/top`);
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
        await axios.post(
          `${API_BASE}/profile`,
          p,
          { headers: { "Content-Type": "application/json" } }
        );
      } else {
        await axios.put(`${API_BASE}/profile`, p,
          { headers: { "Content-Type": "application/json" }}
        );
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
      <div className="container mx-auto p-4">
        {loading && <Loading/>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !profiles.length && (
          <div className="text-gray-500">No profiles yet</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {profiles.map((p) => (
            <ProfileCard
              key={p._id || p.email || Math.random()}
              profile={p}
              onClick={() => openEdit(p)}
            />
          ))}
        </div>
      </div>

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
