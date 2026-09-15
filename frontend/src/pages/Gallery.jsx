import { useMemo, useState } from "react";
import { useLanguage } from "../lib/LanguageContext.jsx";
import { useApi } from "../lib/useApi.js";
import PageBanner from "../components/ui/PageBanner.jsx";
import { LoadingState, ErrorState } from "../components/ui/AsyncState.jsx";

export default function Gallery() {
  const { t, lang } = useLanguage();
  const { data, error, loading } = useApi("/gallery");
  const [filter, setFilter] = useState("all");

  const categories = [
    { key: "all", label: t.pages.gallery.filterAll },
    { key: "annapoorna", label: t.projectsMenu.annapoorna },
    { key: "jalsandharan", label: t.projectsMenu.jalsandharan },
    { key: "vidyadaan", label: t.projectsMenu.lotus },
    { key: "vivah", label: t.projectsMenu.vivah },
  ];

  const filtered = useMemo(() => {
    if (!data) return [];
    return filter === "all" ? data : data.filter((img) => img.category === filter);
  }, [data, filter]);

  return (
    <>
      <PageBanner title={t.pages.gallery.title} />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-4 text-center">
            <p className="text-secondary-text">{t.pages.gallery.subtitle}</p>
          </div>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filter === c.key
                    ? "bg-brand-orange-accent text-orange-btn-text"
                    : "bg-light-green-tint text-brand-green-primary hover:bg-brand-orange-accent hover:text-orange-btn-text"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {loading && <LoadingState />}
          {error && <ErrorState />}

          {!loading && !error && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((img) => (
                <figure key={img.id} className="overflow-hidden rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.06)]">
                  <img
                    src={img.imageUrl}
                    alt={lang === "mr" ? img.titleMr : img.titleEn}
                    className="h-[200px] w-full object-cover transition hover:scale-105"
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
