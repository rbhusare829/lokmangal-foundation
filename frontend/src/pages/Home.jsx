import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  CheckCircle,
  ArrowRightCircle,
  GraduationCap,
  BookOpen,
  Landmark,
  Building2,
  Trophy,
} from "lucide-react";
import { useLanguage } from "../lib/LanguageContext.jsx";
import { useApi } from "../lib/useApi.js";
import { asset } from "../lib/assetUrl.js";
import SectionTitle from "../components/ui/SectionTitle.jsx";

const awardIcons = { GraduationCap, BookOpen, Landmark, Building2, Trophy };

function Hero({ slides, readMoreLabel, projectsLabel, projectsHref }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  const slide = slides[index];

  return (
    <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${asset(slide.image)})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 sm:justify-center sm:pb-0">
        <motion.div
          key={`content-${index}`}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl"
        >
          <h1 className="text-2xl font-extrabold text-white drop-shadow sm:text-4xl">{slide.title}</h1>
          <p className="mt-4 hidden text-sm text-white/90 sm:block">{slide.text}</p>
          <div className="mt-6 flex gap-3">
            <Link
              to={slide.link}
              className="rounded-full bg-brand-orange-accent px-6 py-2.5 text-sm font-bold text-orange-btn-text hover:bg-[#D97A14] hover:text-white"
            >
              {readMoreLabel}
            </Link>
            <a
              href={projectsHref}
              className="rounded-full border-2 border-white px-6 py-2.5 text-sm font-bold text-white hover:bg-white hover:text-brand-green-primary"
            >
              {projectsLabel}
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-brand-orange-accent" : "w-2 bg-white/60"}`}
          />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const { t, lang, path } = useLanguage();
  const h = t.home;

  const { data: apiProjects } = useApi("/projects");
  const { data: apiEvents } = useApi("/events");
  const { data: apiTestimonials } = useApi("/testimonials");
  const { data: apiGallery } = useApi("/gallery");

  const galleryPreview = (apiGallery ?? []).filter(
    (img, i, arr) => arr.findIndex((x) => x.category === img.category) === i
  );

  return (
    <>
      <Hero
        slides={h.hero}
        readMoreLabel={t.common.readMore}
        projectsLabel={h.projectsTitle}
        projectsHref="#our-projects"
      />

      {/* Welcome + Core Pillars */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle pre={h.welcomeTitle.split(" ").slice(0, -2).join(" ")} accent={h.welcomeTitle.split(" ").slice(-2).join(" ")} subtitle={h.welcomeText} />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {h.pillars.map((p) => (
              <div key={p.title} className="overflow-hidden rounded-2xl bg-card-bg shadow-[0_4px_15px_rgba(0,0,0,0.06)]">
                <img src={asset(p.image)} alt={p.title} className="h-48 w-full object-cover" />
                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <img src={asset(`icons/${p.icon}`)} alt="" className="h-9 w-9" />
                    <div>
                      <h4 className="font-bold text-main-text">{p.title}</h4>
                      <p className="text-sm font-semibold text-brand-orange-accent">{p.subtitle}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-secondary-text">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="our-projects" className="bg-light-green-tint/40 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <h2 className="text-2xl font-extrabold text-brand-green-primary sm:text-3xl">
              {h.projectsTitle.split(" ")[0]}{" "}
              <span className="text-brand-orange-accent">{h.projectsTitle.split(" ").slice(1).join(" ")}</span>
            </h2>
            <Link
              to={path("projects")}
              className="rounded-full bg-brand-green-primary px-5 py-2 text-sm font-bold text-white hover:bg-brand-green-medium"
            >
              {h.allProjects}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {(apiProjects ?? []).map((p) => {
              const title = lang === "mr" ? p.titleMr : p.titleEn;
              const summary = lang === "mr" ? p.summaryMr : p.summaryEn;
              const stat = lang === "mr" ? p.statMr : p.statEn;
              return (
                <div key={p.id} className="overflow-hidden rounded-2xl bg-card-bg shadow-[0_4px_15px_rgba(0,0,0,0.06)]">
                  {p.videoUrl && (
                    <div className="aspect-video w-full">
                      <iframe
                        src={p.videoUrl}
                        title={title}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                  <div className="p-5 text-center">
                    <Link to={path(p.slug)}>
                      <h4 className="font-bold text-brand-green-primary">{title}</h4>
                    </Link>
                    <p className="mt-2 text-sm text-secondary-text">{summary}</p>
                    <div className="mt-4 h-[7px] w-full overflow-hidden rounded-full bg-[#f0f0f0]">
                      <div className="h-full w-full rounded-full bg-brand-orange-accent" />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      {stat && (
                        <span className="rounded-full bg-light-orange-tint px-3 py-1 text-xs font-bold text-orange-icon">
                          {stat}
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Events (कार्यक्रम) */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle pre={h.eventsTitle.split(" ")[0]} accent={h.eventsTitle.split(" ").slice(1).join(" ")} />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(apiEvents ?? []).map((ev) => {
              const title = lang === "mr" ? ev.titleMr : ev.titleEn;
              const description = lang === "mr" ? ev.descriptionMr : ev.descriptionEn;
              return (
                <div key={ev.id} className="overflow-hidden rounded-2xl bg-card-bg shadow-[0_4px_15px_rgba(0,0,0,0.06)]">
                  {ev.imageUrl && <img src={ev.imageUrl} alt={title} className="h-[220px] w-full object-cover" />}
                  <div className="p-5">
                    {ev.eventDate && (
                      <p className="text-xs font-bold uppercase tracking-wide text-brand-orange-accent">
                        {ev.eventDate}
                      </p>
                    )}
                    <h4 className="mt-1 font-bold text-main-text">{title}</h4>
                    <p className="mt-2 text-sm text-secondary-text">{description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Foundation */}
      <section id="about-foundation" className="bg-light-green-tint/40 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle pre={h.aboutTitle.split(" ").slice(0, -1).join(" ")} accent={h.aboutTitle.split(" ").slice(-1).join(" ")} />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="flex flex-col items-center gap-5 sm:flex-row">
                <img src={asset("resource/what-we-do.jpg")} alt="" className="h-40 w-full rounded-xl object-cover sm:w-1/2" />
                <div>
                  <h3 className="font-bold text-brand-green-primary">{h.whatWeDoTitle}</h3>
                  <p className="mt-2 text-sm text-secondary-text">{h.whatWeDoText}</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-5 sm:flex-row">
                <img src={asset("resource/pillers.jpg")} alt="" className="h-40 w-full rounded-xl object-cover sm:w-1/2" />
                <div>
                  <h3 className="font-bold text-brand-green-primary">{h.pillarsTitle}</h3>
                  <ul className="mt-2 space-y-1.5">
                    {h.pillarsList.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-secondary-text">
                        <CheckCircle2 size={16} className="text-brand-green-medium" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

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
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle pre={h.statsTitle.split(" ").slice(0, -1).join(" ")} accent={h.statsTitle.split(" ").slice(-1).join(" ")} subtitle={h.statsSubtitle} />
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {h.stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-card-bg p-6 text-center shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
                <div
                  className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full ${
                    s.tint === "orange" ? "bg-light-orange-tint" : "bg-light-green-tint"
                  }`}
                >
                  <img src={asset(`icons/${s.icon}`)} alt="" className="h-7 w-7" />
                </div>
                <div className="text-2xl font-extrabold text-brand-green-primary">{s.number}</div>
                <div className="mt-1 text-xs font-medium text-secondary-text">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shikshak Ratna Awards */}
      <section className="bg-page-bg py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle pre={h.awardsTitle.split(" ").slice(0, 1).join(" ")} accent={h.awardsTitle.split(" ").slice(1).join(" ")} subtitle={h.awardsSubtitle} />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {h.awards.map((a) => {
              const Icon = awardIcons[a.icon];
              return (
                <div key={a.title} className="rounded-xl border border-[#E4DFD2] bg-card-bg p-5 text-center shadow-[0_4px_15px_rgba(0,0,0,0.04)]">
                  <Icon size={28} className="mx-auto mb-2 text-brand-green-medium" />
                  <h4 className="text-sm font-bold text-main-text">{a.title}</h4>
                  <a
                    href={asset(a.pdf)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-xs font-bold text-brand-orange-accent"
                  >
                    {h.viewDetails} &rarr;
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Volunteers of the Month */}
      <section className="bg-[#F3EFE6] py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle pre={h.volunteersTitle.split(" ").slice(0, -1).join(" ")} accent={h.volunteersTitle.split(" ").slice(-1).join(" ")} />
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {h.volunteers.map((v) => (
              <div key={v.name} className="overflow-hidden rounded-xl bg-card-bg shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
                <img src={asset(v.image)} alt={v.name} className="h-[220px] w-full object-cover sm:h-[260px]" />
                <div className="p-3 text-center">
                  <h4 className="text-sm font-bold text-main-text sm:text-base">{v.name}</h4>
                  <p className="text-xs font-semibold text-brand-orange-accent sm:text-sm">{v.place}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="bg-page-bg py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle pre={h.galleryTitle.split(" ").slice(0, -1).join(" ")} accent={h.galleryTitle.split(" ").slice(-1).join(" ")} />
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {galleryPreview.map((img) => (
              <div key={img.id} className="overflow-hidden rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.06)]">
                <img
                  src={img.imageUrl}
                  alt={lang === "mr" ? img.titleMr : img.titleEn}
                  className="h-[200px] w-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to={path("gallery")}
              className="rounded-full bg-brand-orange-accent px-7 py-2.5 text-sm font-bold text-orange-btn-text hover:bg-[#D97A14] hover:text-white"
            >
              {h.viewFullGallery} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="bg-cover bg-center py-16"
        style={{ backgroundImage: `url(${asset("background/8.jpg")})` }}
      >
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            pre={h.testimonialsTitle.split(" ").slice(0, -1).join(" ")}
            accent={h.testimonialsTitle.split(" ").slice(-1).join(" ")}
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {(apiTestimonials ?? []).map((ts) => (
              <div
                key={ts.id}
                className="rounded-2xl border-l-4 border-brand-orange-accent bg-brand-green-primary/90 p-6 backdrop-blur"
              >
                <p className="italic text-footer-text">"{lang === "mr" ? ts.messageMr : ts.messageEn}"</p>
                <h4 className="mt-3 font-bold text-[#FFD285]">{ts.name}</h4>
                {(lang === "mr" ? ts.roleMr : ts.roleEn) && (
                  <span className="text-sm text-footer-muted">{lang === "mr" ? ts.roleMr : ts.roleEn}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
