import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext.jsx";
import { useApi } from "../lib/useApi.js";
import PageBanner from "../components/ui/PageBanner.jsx";
import { LoadingState, ErrorState } from "../components/ui/AsyncState.jsx";

export default function Projects() {
  const { t, lang, path } = useLanguage();
  const { data, error, loading } = useApi("/projects");

  return (
    <>
      <PageBanner title={t.pages.projects.title} />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <p className="mb-10 text-center text-secondary-text">{t.pages.projects.subtitle}</p>

          {loading && <LoadingState />}
          {error && <ErrorState />}

          {!loading && !error && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {data.map((p) => (
                <div
                  key={p.id}
                  className="overflow-hidden rounded-2xl bg-card-bg shadow-[0_4px_15px_rgba(0,0,0,0.06)]"
                >
                  {p.coverImageUrl && (
                    <img
                      src={p.coverImageUrl}
                      alt={lang === "mr" ? p.titleMr : p.titleEn}
                      className="h-52 w-full object-cover"
                    />
                  )}
                  <div className="p-6 text-center">
                    <h4 className="font-bold text-brand-green-primary">
                      {lang === "mr" ? p.titleMr : p.titleEn}
                    </h4>
                    <p className="mt-2 text-sm text-secondary-text">
                      {lang === "mr" ? p.summaryMr : p.summaryEn}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      {(lang === "mr" ? p.statMr : p.statEn) && (
                        <span className="rounded-full bg-light-orange-tint px-3 py-1 text-xs font-bold text-orange-icon">
                          {lang === "mr" ? p.statMr : p.statEn}
                        </span>
                      )}
                      <Link
                        to={path(p.slug)}
                        className="ml-auto inline-flex items-center gap-1 text-sm font-bold text-brand-orange-accent"
                      >
                        {t.common.readMore} <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
