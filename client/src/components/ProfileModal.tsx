import React, { useEffect, useState } from "react";
import type { IProfile, IProject, IWork } from "../types";

interface Props {
  profile: IProfile | null;
  isCreate: boolean;
  onClose: () => void;
  onSave: (p: IProfile) => Promise<void>;
}

const emptyProfile: IProfile = {
  name: "",
  email: "",
  education: "",
  skills: [],
  projects: [],
  work: [],
  links: {},
};

export default function ProfileModal({
  profile,
  isCreate,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState<IProfile>(emptyProfile);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(profile ? { ...profile } : emptyProfile);
  }, [profile]);

  const setField = <K extends keyof IProfile>(k: K, v: IProfile[K]) => {
    setForm((s) => ({ ...s, [k]: v }));
  };

  const updateSkill = (index: number, val: string) => {
    const next = [...(form.skills || [])];
    next[index] = val;
    setField("skills", next);
  };

  const addSkill = () => setField("skills", [...(form.skills || []), ""]);
  const removeSkill = (i: number) =>
    setField(
      "skills",
      (form.skills || []).filter((_, idx) => idx !== i)
    );

  const addProject = () =>
    setField("projects", [
      ...(form.projects || []),
      { title: "", description: "", link: "", skills: [] },
    ]);
  const updateProject = (i: number, p: Partial<IProject>) => {
    const next = [...(form.projects || [])];
    next[i] = { ...(next[i] || {}), ...p };
    setField("projects", next);
  };
  const removeProject = (i: number) =>
    setField(
      "projects",
      (form.projects || []).filter((_, idx) => idx !== i)
    );

  const addWork = () =>
    setField("work", [...(form.work || []), { role: "", company: "" }]);
  const updateWork = (i: number, w: Partial<IWork>) => {
    const next = [...(form.work || [])];
    next[i] = { ...(next[i] || {}), ...w };
    setField("work", next);
  };
  const removeWork = (i: number) =>
    setField(
      "work",
      (form.work || []).filter((_, idx) => idx !== i)
    );

  const onSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setSaving(true);
    try {
      if (!form.name || !form.email) {
        alert("Name and email are required");
        setSaving(false);
        return;
      }
      await onSave(form);
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[rgba(13,18,24,0.44)] flex items-center justify-center z-50"
      onMouseDown={onClose}
    >
      <div
        className="w-[880px] max-w-[96%] bg-white rounded-[12px] p-4 shadow-[0_20px_40px_rgba(2,6,23,0.6)] max-h-[90vh] overflow-auto"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between mb-2.5">
          <h2 className="text-lg font-semibold">
            {isCreate ? "Add Profile" : "Edit Profile"}
          </h2>
          <button
            className="rounded-lg border border-slate-900/10 bg-transparent px-3 py-2 cursor-pointer hover:bg-slate-50"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </header>

        <form className="space-y-2.5" onSubmit={onSubmit}>
          <label className="block mb-2.5">
            <span className="block text-sm font-medium text-slate-700">
              Name
            </span>
            <input
              className="w-full px-3 py-2 mt-1.5 rounded-lg border border-slate-900/10 bg-white outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
            />
          </label>

          <label className="block mb-2.5">
            <span className="block text-sm font-medium text-slate-700">
              Email
            </span>
            <input
              className="w-full px-3 py-2 mt-1.5 rounded-lg border border-slate-900/10 bg-white outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
            />
          </label>

          <label className="block mb-2.5">
            <span className="block text-sm font-medium text-slate-700">
              Education
            </span>
            <input
              className="w-full px-3 py-2 mt-1.5 rounded-lg border border-slate-900/10 bg-white outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60"
              value={form.education || ""}
              onChange={(e) => setField("education", e.target.value)}
            />
          </label>

          <div className="mt-3 pt-3 border-t border-dashed border-slate-900/5">
            <div className="flex items-center justify-between">
              <strong className="text-slate-900">Skills</strong>
              <button
                type="button"
                className="rounded-lg border border-slate-900/10 bg-white px-2.5 py-1.5 text-[13px] cursor-pointer hover:bg-slate-50 active:bg-slate-100"
                onClick={addSkill}
              >
                + Add
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-2.5">
              {(form.skills || []).map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    className="w-full px-3 py-2 rounded-lg border border-slate-900/10 bg-white outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60"
                    value={s}
                    onChange={(e) => updateSkill(i, e.target.value)}
                  />
                  <button
                    type="button"
                    className="rounded-lg bg-red-600 text-white px-2.5 py-1.5 text-[13px] cursor-pointer hover:bg-red-600/90"
                    onClick={() => removeSkill(i)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-dashed border-slate-900/5">
            <div className="flex items-center justify-between">
              <strong className="text-slate-900">Projects</strong>
              <button
                type="button"
                className="rounded-lg border border-slate-900/10 bg-white px-2.5 py-1.5 text-[13px] cursor-pointer hover:bg-slate-50 active:bg-slate-100"
                onClick={addProject}
              >
                + Add
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-2.5">
              {(form.projects || []).map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-900/10 bg-white outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60"
                    placeholder="Title"
                    value={p.title || ""}
                    onChange={(e) =>
                      updateProject(i, { title: e.target.value })
                    }
                  />
                  <input
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-900/10 bg-white outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60"
                    placeholder="Description"
                    value={p.description || ""}
                    onChange={(e) =>
                      updateProject(i, { description: e.target.value })
                    }
                  />
                  <input
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-900/10 bg-white outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60"
                    placeholder="Link"
                    value={p.link || ""}
                    onChange={(e) => updateProject(i, { link: e.target.value })}
                  />
                  <button
                    type="button"
                    className="rounded-lg bg-red-600 text-white px-2.5 py-1.5 text-[13px] cursor-pointer hover:bg-red-600/90"
                    onClick={() => removeProject(i)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-dashed border-slate-900/5">
            <div className="flex items-center justify-between">
              <strong className="text-slate-900">Work</strong>
              <button
                type="button"
                className="rounded-lg border border-slate-900/10 bg-white px-2.5 py-1.5 text-[13px] cursor-pointer hover:bg-slate-50 active:bg-slate-100"
                onClick={addWork}
              >
                + Add
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-2.5">
              {(form.work || []).map((w, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    className="w-full px-3 py-2 rounded-lg border border-slate-900/10 bg-white outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60"
                    placeholder="Role"
                    value={w.role || ""}
                    onChange={(e) => updateWork(i, { role: e.target.value })}
                  />
                  <input
                    className="w-full px-3 py-2 rounded-lg border border-slate-900/10 bg-white outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60"
                    placeholder="Company"
                    value={w.company || ""}
                    onChange={(e) => updateWork(i, { company: e.target.value })}
                  />
                  <button
                    type="button"
                    className="rounded-lg bg-red-600 text-white px-2.5 py-1.5 text-[13px] cursor-pointer hover:bg-red-600/90"
                    onClick={() => removeWork(i)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-dashed border-slate-900/5">
            <strong className="text-slate-900">Links</strong>
            <div className="flex items-center gap-2 mt-2">
              <input
                className="w-full px-3 py-2 rounded-lg border border-slate-900/10 bg-white outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60"
                placeholder="GitHub URL"
                value={form.links?.github || ""}
                onChange={(e) =>
                  setField("links", {
                    ...(form.links || {}),
                    github: e.target.value,
                  })
                }
              />
              <input
                className="w-full px-3 py-2 rounded-lg border border-slate-900/10 bg-white outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60"
                placeholder="LinkedIn URL"
                value={form.links?.linkedin || ""}
                onChange={(e) =>
                  setField("links", {
                    ...(form.links || {}),
                    linkedin: e.target.value,
                  })
                }
              />
              <input
                className="w-full px-3 py-2 rounded-lg border border-slate-900/10 bg-white outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60"
                placeholder="Portfolio URL"
                value={form.links?.portfolio || ""}
                onChange={(e) =>
                  setField("links", {
                    ...(form.links || {}),
                    portfolio: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <footer className="flex justify-end gap-2 mt-3">
            <button
              className="rounded-lg border border-slate-900/10 bg-transparent px-3 py-2 cursor-pointer hover:bg-slate-50"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="rounded-lg bg-blue-600 text-white px-3 py-2 border-0 shadow-sm hover:bg-blue-600/90 disabled:opacity-60"
              type="submit"
              disabled={saving}
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
