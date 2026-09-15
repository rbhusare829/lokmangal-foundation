import { CheckCircle, ArrowRightCircle } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext.jsx";
import { useApi } from "../lib/useApi.js";
import { asset } from "../lib/assetUrl.js";
import PageBanner from "../components/ui/PageBanner.jsx";
import SectionTitle from "../components/ui/SectionTitle.jsx";
import { LoadingState, ErrorState } from "../components/ui/AsyncState.jsx";

export default function About() {
  const { t, lang } = useLanguage();
  const a = t.pages.about;
  const h = t.home;
  const { data: team, error, loading } = useApi("/team");

  return (
    <>
      <PageBanner title={a.title} />

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <img src={asset("resource/about-1.jpg")} alt="" className="h-48 w-full rounded-xl object-cover" />
            <img src={asset("resource/about-2.jpg")} alt="" className="mt-8 h-48 w-full rounded-xl object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-brand-green-primary sm:text-3xl">{a.introTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-secondary-text">{a.introText}</p>
          </div>
        </div>
      </section>

      <section className="bg-light-green-tint/40 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-2xl border border-[#EAE5D9] bg-card-bg p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h3 className="text-brand-green-primary">{h.objectivesTitle}</h3>
            <p className="mt-2 text-sm text-secondary-text">{h.objectivesIntro}</p>
            <ul className="mt-3 space-y-2">
              {h.objectives.map((o) => (
                <li key={o} className="flex items-start gap-2 text-sm text-secondary-text">
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-brand-orange-accent" /> {o}
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-brand-orange-accent">{h.visionTitle}</h3>
            <ul className="mt-3 space-y-2">
              {h.vision.map((v) => (
                <li key={v} className="flex items-start gap-2 text-sm text-secondary-text">
                  <ArrowRightCircle size={16} className="mt-0.5 shrink-0 text-brand-green-medium" /> {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            pre={a.teamTitle.split(" ").slice(0, -1).join(" ")}
            accent={a.teamTitle.split(" ").slice(-1).join(" ")}
          />
          {loading && <LoadingState />}
          {error && <ErrorState />}
          {!loading && !error && (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {team.map((member) => (
                <div key={member.id} className="text-center">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="mx-auto h-32 w-32 rounded-full object-cover shadow-[0_4px_15px_rgba(0,0,0,0.08)] sm:h-40 sm:w-40"
                  />
                  <h4 className="mt-3 text-sm font-bold text-main-text sm:text-base">{member.name}</h4>
                  <p className="text-xs font-semibold text-brand-orange-accent sm:text-sm">
                    {lang === "mr" ? member.roleMr : member.roleEn}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
