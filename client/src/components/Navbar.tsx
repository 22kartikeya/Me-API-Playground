import React, { useState } from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

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
    <div className="flex items-center justify-between px-6 py-3 bg-white shadow-sm border-b border-slate-200">
      <div className="flex items-center font-bold text-xl text-blue-600">
        Me-API Playground
      </div>
      <div className="flex items-center gap-4">
        <form onSubmit={submitSearch} className="flex items-center gap-2">
          <input
            className="w-64 rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60 bg-white"
            placeholder="Search profiles…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 cursor-pointer hover:bg-slate-50 active:bg-slate-100"
            type="submit"
          >
            Search
          </button>
        </form>
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium cursor-pointer hover:bg-slate-50 active:bg-slate-100">
            Explore <ChevronDownIcon className="w-4 h-4" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl bg-white shadow-lg border border-slate-200 focus:outline-none p-3 z-50">
            <form onSubmit={submitProjects} className="flex items-center gap-2">
              <input
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60 bg-white"
                placeholder="Project skill (e.g. react)"
                value={projectSkill}
                onChange={(e) => setProjectSkill(e.target.value)}
              />
              <button
                className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm cursor-pointer hover:bg-slate-50 active:bg-slate-100"
                type="submit"
              >
                Go
              </button>
            </form>
            <div className="my-2 border-t border-slate-200"></div>
            <button
              onClick={onTopSkills}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-sm"
            >
              Top Skills
            </button>
          </Menu.Items>
        </Menu>
        <button
          className="rounded-lg bg-blue-600 text-white px-4 py-2 border-0 shadow-sm hover:bg-blue-600/90 active:bg-blue-700"
          onClick={onAddProfile}
        >
          Add Profile
        </button>
      </div>
    </div>
  );
}
