import React, { useState } from "react";

interface Props {
  onSearch: (q: string) => void;
  onSearchProjects: (skill: string) => void;
  onTopSkills: () => void;
  onAddProfile: () => void;
}

export default function Navbar({
  onSearch,
  onSearchProjects,
  onTopSkills,
  onAddProfile,
}: Props) {
  const [query, setQuery] = useState("");
  const [projectSkill, setProjectSkill] = useState("");

  const submitSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    onSearch(query);
  };

  const submitProjects = (e?: React.FormEvent) => {
    e?.preventDefault();
    onSearchProjects(projectSkill);
  };

  return (
    <div className="flex items-center justify-between px-5 py-3 bg-transparent border-b border-black/5">
      <div className="flex items-center">
        <div className="font-bold text-blue-600">Me-API Playground</div>
      </div>

      <div className="flex flex-col items-center">
        <form onSubmit={submitSearch} className="flex items-center gap-2">
          <input
            className="min-w-[220px] rounded-lg border border-slate-900/10 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60 bg-white"
            placeholder="Search profiles (name, email, skills, projects)…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="rounded-lg border border-slate-900/10 bg-white px-3 py-2 cursor-pointer hover:bg-slate-50 active:bg-slate-100"
            type="submit"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-2 ml-3 mt-2">
          <form onSubmit={submitProjects} className="flex items-center gap-2">
            <input
              className="min-w-[160px] rounded-lg border border-slate-900/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60 bg-white"
              placeholder="Project skill (e.g. react)"
              value={projectSkill}
              onChange={(e) => setProjectSkill(e.target.value)}
            />
            <button
              className="rounded-lg border border-slate-900/10 bg-white px-2.5 py-1.5 text-[13px] cursor-pointer hover:bg-slate-50 active:bg-slate-100"
              type="submit"
            >
              Find Projects
            </button>
          </form>

          <button
            className="rounded-lg border border-slate-900/10 bg-transparent px-3 py-2 cursor-pointer hover:bg-slate-50"
            onClick={onTopSkills}
          >
            Top Skills
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <button
          className="rounded-lg bg-blue-600 text-white px-3 py-2 border-0 shadow-sm hover:bg-blue-600/90 active:bg-blue-700"
          onClick={onAddProfile}
        >
          Add Profile
        </button>
      </div>
    </div>
  );
}
