import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext.jsx";
import { useApi } from "../lib/useApi.js";
import PageBanner from "../components/ui/PageBanner.jsx";
import { LoadingState, ErrorState } from "../components/ui/AsyncState.jsx";

function Paragraphs({ text }) {
  const lines = (text || "").split("\n").filter(Boolean);
  return (
    <ul className="space-y-2">
      {lines.map((line, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-secondary-text">
          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-green-medium" />
          {line}
        </li>
      ))}
    </ul>
  );
}

export default function ProjectDetail({ slug }) {
  const { t, lang, path } = useLanguage();
  const { data, error, loading } = useApi("/projects");
  const project = data?.find((p) => p.slug === slug);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!project) return <ErrorState />;

  const title = lang === "mr" ? project.titleMr : project.titleEn;
  const objective = lang === "mr" ? project.objectiveMr : project.objectiveEn;
  const description = lang === "mr" ? project.descriptionMr : project.descriptionEn;
  const stat = lang === "mr" ? project.statMr : project.statEn;
  const descriptionParagraphs = (description || "").split("\n\n").filter(Boolean);
  const objectiveIsList = (objective || "").includes("\n");

  return (
    <>
      <PageBanner title={title} />
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          {project.videoUrl && (
            <div className="mb-8 aspect-video w-full overflow-hidden rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
              <iframe
                src={project.videoUrl}
                title={title}
                className="h-full w-full"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {stat && (
            <div className="mb-8 text-center">
              <span className="inline-block rounded-full bg-light-orange-tint px-5 py-2 text-sm font-bold text-orange-icon">
                {stat}
              </span>
            </div>
          )}

          {objective && (
            <div className="mb-10">
              <h3 className="mb-3 text-lg font-bold text-brand-green-primary">{t.pages.projectDetail.objective}</h3>
              {objectiveIsList ? (
                <Paragraphs text={objective} />
              ) : (
                <p className="text-sm text-secondary-text">{objective}</p>
              )}
            </div>
          )}

          {descriptionParagraphs.length > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-bold text-brand-green-primary">{t.pages.projectDetail.whyHow}</h3>
              <div className="space-y-4">
                {descriptionParagraphs.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-secondary-text">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              to={path("projects")}
              className="inline-block rounded-full bg-brand-green-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-green-medium"
            >
              {t.pages.projectDetail.backToProjects}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
