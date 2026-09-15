import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Heart, Menu, X } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext.jsx";
import { asset } from "../../lib/assetUrl.js";

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 text-sm font-semibold transition-colors ${
    isActive ? "text-brand-orange-accent" : "text-brand-green-primary hover:text-brand-orange-accent"
  }`;

function LangSwitch({ className = "inline-flex" }) {
  const { lang, otherLangPath } = useLanguage();
  return (
    <div className={`items-center gap-2 rounded-full bg-light-green-tint px-3.5 py-1.5 ${className}`}>
      <Link
        to={lang === "en" ? "#" : otherLangPath}
        className={`text-[13px] font-semibold ${
          lang === "en" ? "text-brand-green-primary font-bold" : "text-secondary-text hover:text-brand-orange-accent"
        }`}
      >
        English
      </Link>
      <span className="text-xs text-[#A9C7B2]">|</span>
      <Link
        to={lang === "mr" ? "#" : otherLangPath}
        className={`text-[13px] font-semibold ${
          lang === "mr" ? "text-brand-green-primary font-bold" : "text-secondary-text hover:text-brand-orange-accent"
        }`}
      >
        मराठी
      </Link>
    </div>
  );
}

export default function Navbar() {
  const { t, path } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [mAboutOpen, setMAboutOpen] = useState(false);
  const [mProjectsOpen, setMProjectsOpen] = useState(false);

  const projectLinks = [
    { label: t.projectsMenu.annapoorna, slug: "lokmangal-annapurna-yojana" },
    { label: t.projectsMenu.jalsandharan, slug: "jalsandharan-project" },
    { label: t.projectsMenu.lotus, slug: "vidyadaan-yojana" },
    { label: t.projectsMenu.vivah, slug: "samudayik-vivah-sohala" },
  ];

  const aboutLinks = [
    { label: t.nav.aboutFoundation, slug: "about" },
    { label: t.nav.volunteerJoin, slug: "volunteer" },
    { label: t.nav.faq, slug: "faq" },
    { label: t.nav.testimonials, slug: "testimonials" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b-2 border-light-green-tint bg-white shadow-[0_4px_20px_rgba(20,67,42,0.08)]">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4">
        <Link to={path("")} className="shrink-0">
          <img src={asset("logo/lokmangal-logo.png")} alt="Lokmangal Foundation" className="h-12 w-auto" />
        </Link>

        <nav className="hidden lg:flex lg:items-center lg:gap-1">
          <NavLink to={path("")} end className={navLinkClass}>
            {t.nav.home}
          </NavLink>

          <div
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-brand-green-primary hover:text-brand-orange-accent">
              {t.nav.about} <ChevronDown size={14} />
            </button>
            <AnimatePresence>
              {aboutOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full min-w-[220px] overflow-hidden rounded-lg border-t-[3px] border-brand-orange-accent bg-white shadow-xl"
                >
                  {aboutLinks.map((l) => (
                    <li key={l.slug}>
                      <Link
                        to={path(l.slug)}
                        className="block px-5 py-2.5 text-sm text-main-text hover:bg-light-green-tint hover:text-brand-green-primary"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setProjectsOpen(true)}
            onMouseLeave={() => setProjectsOpen(false)}
          >
            <Link
              to={path("projects")}
              className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-brand-green-primary hover:text-brand-orange-accent"
            >
              {t.nav.projects} <ChevronDown size={14} />
            </Link>
            <AnimatePresence>
              {projectsOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full min-w-[260px] overflow-hidden rounded-lg border-t-[3px] border-brand-orange-accent bg-white shadow-xl"
                >
                  {projectLinks.map((l) => (
                    <li key={l.slug}>
                      <Link
                        to={path(l.slug)}
                        className="block px-5 py-2.5 text-sm text-main-text hover:bg-light-green-tint hover:text-brand-green-primary"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <NavLink to={path("gallery")} className={navLinkClass}>
            {t.nav.gallery}
          </NavLink>
          <NavLink to={path("contribute")} className={navLinkClass}>
            {t.nav.contribute}
          </NavLink>
          <a
            href={t.common.blogUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 text-sm font-semibold text-brand-green-primary hover:text-brand-orange-accent"
          >
            {t.nav.blogs}
          </a>
          <NavLink to={path("contact")} className={navLinkClass}>
            {t.nav.contact}
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitch className="hidden sm:inline-flex" />
          <a
            href={t.common.donateUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-brand-orange-accent px-5 py-2.5 text-sm font-bold text-orange-btn-text shadow-[0_4px_12px_rgba(234,139,34,0.3)] transition hover:-translate-y-0.5 hover:bg-[#D97A14] hover:text-white sm:inline-flex"
          >
            <Heart size={16} /> {t.common.donate}
          </a>
          <button
            aria-label="Toggle Menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green-primary text-white lg:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t-2 border-light-green-tint bg-white lg:hidden"
          >
            <ul className="py-2">
              <li>
                <Link
                  to={path("")}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between border-b border-light-green-tint px-5 py-3.5 text-[15px] font-semibold text-brand-green-primary"
                >
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setMAboutOpen((v) => !v)}
                  className="flex w-full items-center justify-between border-b border-light-green-tint px-5 py-3.5 text-[15px] font-semibold text-brand-green-primary"
                >
                  {t.nav.about} <ChevronDown size={16} className={mAboutOpen ? "rotate-180" : ""} />
                </button>
                {mAboutOpen && (
                  <ul className="border-b border-light-green-tint bg-[#F5FAF6]">
                    {aboutLinks.map((l) => (
                      <li key={l.slug}>
                        <Link
                          to={path(l.slug)}
                          onClick={() => setMobileOpen(false)}
                          className="block border-l-[3px] border-brand-orange-accent px-7 py-2.5 text-sm text-brand-green-primary"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li>
                <button
                  onClick={() => setMProjectsOpen((v) => !v)}
                  className="flex w-full items-center justify-between border-b border-light-green-tint px-5 py-3.5 text-[15px] font-semibold text-brand-green-primary"
                >
                  {t.nav.projects} <ChevronDown size={16} className={mProjectsOpen ? "rotate-180" : ""} />
                </button>
                {mProjectsOpen && (
                  <ul className="border-b border-light-green-tint bg-[#F5FAF6]">
                    {projectLinks.map((l) => (
                      <li key={l.slug}>
                        <Link
                          to={path(l.slug)}
                          onClick={() => setMobileOpen(false)}
                          className="block border-l-[3px] border-brand-orange-accent px-7 py-2.5 text-sm text-brand-green-primary"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              {[
                ["gallery", t.nav.gallery],
                ["contribute", t.nav.contribute],
              ].map(([slug, label]) => (
                <li key={slug}>
                  <Link
                    to={path(slug)}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between border-b border-light-green-tint px-5 py-3.5 text-[15px] font-semibold text-brand-green-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={t.common.blogUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between border-b border-light-green-tint px-5 py-3.5 text-[15px] font-semibold text-brand-green-primary"
                >
                  {t.nav.blogs}
                </a>
              </li>
              <li>
                <Link
                  to={path("contact")}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between border-b border-light-green-tint px-5 py-3.5 text-[15px] font-semibold text-brand-green-primary"
                >
                  {t.nav.contact}
                </Link>
              </li>
              <li className="flex justify-center px-5 pb-2 pt-4">
                <a
                  href={t.common.donateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full bg-brand-orange-accent px-6 py-3 text-[15px] font-bold text-orange-btn-text"
                >
                  <Heart size={16} /> {t.common.donateNow}
                </a>
              </li>
              <li className="flex justify-center px-5 pb-4 pt-2">
                <LangSwitch />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
