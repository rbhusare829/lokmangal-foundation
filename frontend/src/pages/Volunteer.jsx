import { Link } from "react-router-dom";
import { useLanguage } from "../lib/LanguageContext.jsx";
import { asset } from "../lib/assetUrl.js";
import PageBanner from "../components/ui/PageBanner.jsx";

export default function Volunteer() {
  const { t, path } = useLanguage();
  const v = t.pages.volunteer;

  return (
    <>
      <PageBanner title={v.title} />
      <section className="py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 lg:grid-cols-2">
          <img
            src={asset("resource/volunteer-bg.jpg")}
            alt=""
            className="h-72 w-full rounded-2xl object-cover shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
          />
          <div>
            <h2 className="text-2xl font-extrabold text-brand-green-primary sm:text-3xl">{v.introTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-secondary-text">{v.introText}</p>
            <Link
              to={path("contact")}
              className="mt-6 inline-block rounded-full bg-brand-orange-accent px-7 py-2.5 text-sm font-bold text-orange-btn-text hover:bg-[#D97A14] hover:text-white"
            >
              {t.home.becomeVolunteer}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
