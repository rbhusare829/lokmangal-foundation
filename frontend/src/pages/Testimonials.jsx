import { useLanguage } from "../lib/LanguageContext.jsx";
import { useApi } from "../lib/useApi.js";
import PageBanner from "../components/ui/PageBanner.jsx";
import { LoadingState, ErrorState } from "../components/ui/AsyncState.jsx";

export default function Testimonials() {
  const { t, lang } = useLanguage();
  const { data, error, loading } = useApi("/testimonials");

  return (
    <>
      <PageBanner title={t.pages.testimonials.title} />
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <p className="mb-10 text-center text-secondary-text">{t.pages.testimonials.subtitle}</p>

          {loading && <LoadingState />}
          {error && <ErrorState />}

          {!loading && !error && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {data.map((ts) => (
                <div
                  key={ts.id}
                  className="rounded-2xl border-l-4 border-brand-orange-accent bg-card-bg p-6 shadow-[0_4px_15px_rgba(0,0,0,0.06)]"
                >
                  <p className="italic text-secondary-text">
                    "{lang === "mr" ? ts.messageMr : ts.messageEn}"
                  </p>
                  <h4 className="mt-3 font-bold text-brand-green-primary">{ts.name}</h4>
                  {(lang === "mr" ? ts.roleMr : ts.roleEn) && (
                    <span className="text-sm text-secondary-text">{lang === "mr" ? ts.roleMr : ts.roleEn}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
