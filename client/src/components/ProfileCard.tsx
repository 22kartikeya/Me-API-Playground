import type { IProfile } from "../types";

const ProfileCard = ({
  profile,
  onClick,
}: {
  profile: IProfile;
  onClick?: () => void;
}) => {
  const displayedSkills = (profile.skills || []).slice(0, 4);
  const displayedProject = profile.projects?.[0];
  const displayedWork = profile.work?.[0];

  return (
    <div
      className="bg-white rounded-2xl p-4 cursor-pointer transition-transform duration-150 hover:-translate-y-1 shadow-md hover:shadow-lg border border-slate-200 flex flex-col justify-between"
      onClick={onClick}
    >
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-slate-900">{profile.name}</h3>
        <div className="text-sm text-slate-500">{profile.email}</div>
      </div>
      <div className="mb-2 flex justify-between text-sm text-slate-700">
        <span className="font-medium">Education:</span>
        <span>{profile.education || "—"}</span>
      </div>
      {displayedSkills.length > 0 && (
        <div className="mb-2">
          <span className="font-medium text-sm text-slate-700">Skills:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {displayedSkills.map((s) => (
              <span
                key={s}
                className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full"
              >
                {s}
              </span>
            ))}
            {(profile.skills || []).length > 4 && (
              <span className="text-xs text-slate-400">
                +{profile.skills.length - 4}
              </span>
            )}
          </div>
        </div>
      )}
      {displayedProject && (
        <div className="mb-2">
          <span className="font-medium text-sm text-slate-700">Project:</span>
          <div className="mt-1 text-sm text-slate-800">
            <div className="font-semibold">{displayedProject.title}</div>
            {displayedProject.description && (
              <div className="text-slate-500 text-xs">
                {displayedProject.description}
              </div>
            )}
          </div>
        </div>
      )}
      {displayedWork && (
        <div className="mb-2 text-sm text-slate-700 flex justify-between">
          <span className="font-medium">Work:</span>
          <span className="truncate max-w-[70%]">
            {displayedWork.role} @ {displayedWork.company}
          </span>
        </div>
      )}
      <div className="mt-3 flex justify-between items-center text-sm">
        <div className="flex gap-2">
          {profile.links?.github && (
            <a
              href={profile.links.github}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>
          )}
          {profile.links?.linkedin && (
            <a
              href={profile.links.linkedin}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
          )}
          {profile.links?.portfolio && (
            <a
              href={profile.links.portfolio}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Portfolio
            </a>
          )}
        </div>
        <div className="text-xs text-slate-400">Click to edit</div>
      </div>
    </div>
  );
};

export default ProfileCard;
