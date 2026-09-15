import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext.jsx";
import SocialIcons from "./SocialIcons.jsx";

export default function Footer() {
  const { t, path } = useLanguage();

  const projectLinks = [
    { label: t.projectsMenu.annapoorna, slug: "lokmangal-annapurna-yojana" },
    { label: t.projectsMenu.jalsandharan, slug: "jalsandharan-project" },
    { label: t.projectsMenu.lotus, slug: "vidyadaan-yojana" },
    { label: t.projectsMenu.vivah, slug: "samudayik-vivah-sohala" },
  ];

  const quickLinks = [
    { label: t.nav.about, slug: "about" },
    { label: t.nav.projects, slug: "projects" },
    { label: t.nav.gallery, slug: "gallery" },
    { label: t.nav.contribute, slug: "contribute" },
    { label: t.nav.contact, slug: "contact" },
    { label: t.footer.privacyPolicy, slug: "privacy-policy" },
  ];

  return (
    <footer>
      <div className="bg-[#F3EFE6] py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <h4 className="text-lg font-bold text-brand-green-primary">{t.home.calloutTitle}</h4>
          <Link
            to={path("volunteer")}
            className="rounded-full bg-brand-orange-accent px-6 py-2.5 text-sm font-bold text-orange-btn-text hover:bg-[#D97A14] hover:text-white"
          >
            {t.home.becomeVolunteer}
          </Link>
        </div>
      </div>

      <div className="bg-brand-green-primary py-14 text-footer-text">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="mb-4 text-base font-bold text-white">{t.footer.aboutUs}</h4>
            <p className="text-sm leading-relaxed text-footer-text/90">{t.footer.aboutText}</p>
            <Link
              to={path("about")}
              className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-orange-accent"
            >
              {t.common.readMore} <ArrowRight size={14} />
            </Link>
          </div>

          <div>
            <h4 className="mb-4 text-base font-bold text-white">{t.footer.ourProjects}</h4>
            <ul className="space-y-2 text-sm">
              {projectLinks.map((l) => (
                <li key={l.slug}>
                  <Link to={path(l.slug)} className="text-footer-text/90 hover:text-brand-orange-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-base font-bold text-white">{t.footer.quickLinks}</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((l) => (
                <li key={l.slug}>
                  <Link to={path(l.slug)} className="text-footer-text/90 hover:text-brand-orange-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={t.common.blogUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-footer-text/90 hover:text-brand-orange-accent"
                >
                  {t.nav.blogs}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-base font-bold text-white">{t.footer.getInTouch}</h4>
            <ul className="space-y-3 text-sm text-footer-text/90">
              <li className="flex gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-orange-accent" />
                <span>
                  <strong className="text-white">{t.footer.addressLabel}</strong> {t.common.address}
                </span>
              </li>
              <li className="flex gap-2">
                <Phone size={16} className="mt-0.5 shrink-0 text-brand-orange-accent" />
                <span>
                  <strong className="text-white">{t.footer.phoneLabel}</strong> {t.common.phoneDisplay}
                </span>
              </li>
              <li className="flex gap-2">
                <Mail size={16} className="mt-0.5 shrink-0 text-brand-orange-accent" />
                <span>
                  <strong className="text-white">{t.footer.emailLabel}</strong> {t.common.email}
                </span>
              </li>
            </ul>
            <SocialIcons className="mt-4" />
          </div>
        </div>
      </div>

      <div className="bg-[#0E301E] py-4 text-center text-xs text-footer-muted">{t.footer.copyright}</div>
    </footer>
  );
}
