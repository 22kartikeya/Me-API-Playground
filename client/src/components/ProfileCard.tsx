import type { IProfile } from "../types";

const ProfileCard = ({
  profile,
  onClick,
}: {
  profile: IProfile;
  onClick?: () => void;
}) => {
  return (
    <div className="bg-white rounded-[12px] p-3 cursor-pointer transition-transform duration-150 hover:-translate-y-1.5 flex gap-2 flex-col"
      onClick={onClick}
    >
      <div className="mb-1">
        <h3 className="m-0 text-[18px] font-semibold leading-6">
          {profile.name}
        </h3>
        <div className="text-slate-500">{profile.email}</div>
      </div>

      <div className="mt-2">
        <div className="flex justify-between mt-2">
          <div>Education:</div>
          <span>{profile.education || "—"}</span>
        </div>

        <div className="flex justify-between mt-2">
          <div>Skills:</div>
          <div className="flex flex-wrap gap-2 max-w-[70%] justify-end">
            {(profile.skills || []).map((s) => (
              <span
                className="bg-slate-100 px-2 py-1 rounded-full text-[13px]"
                key={s}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {profile.projects && profile.projects.length > 0 && (
          <div className="flex justify-between mt-2">
            <div>Projects:</div>
            <div className="max-w-[70%] text-right">
              {profile.projects!.slice(0, 3).map((pj) => (
                <div key={pj.title} className="mt-1.5">
                  <div className="font-semibold">{pj.title}</div>
                  {pj.description && (
                    <div className="text-[13px] text-slate-500">
                      {pj.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-3">
          <div className="text-[14px]">
            {profile.links?.github && (
              <a
                href={profile.links.github}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 no-underline mr-2 hover:underline"
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
                className="text-blue-600 no-underline mr-2 hover:underline"
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
                className="text-blue-600 no-underline mr-2 hover:underline"
              >
                Portfolio
              </a>
            )}
          </div>
          <div className="text-[12px] text-slate-500">Click card to edit</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
