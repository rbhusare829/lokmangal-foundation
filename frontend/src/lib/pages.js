// Canonical list of page slugs shared between the two languages.
// path: '' means the home page (root of each language).
export const PAGE_SLUGS = [
  "",
  "about",
  "contact",
  "contribute",
  "faq",
  "gallery",
  "projects",
  "jalsandharan-project",
  "lokmangal-annapurna-yojana",
  "vidyadaan-yojana",
  "samudayik-vivah-sohala",
  "testimonials",
  "volunteer",
  "privacy-policy",
];

export function pathFor(lang, slug) {
  const base = lang === "mr" ? "/mr" : "";
  if (!slug) return base || "/";
  return `${base}/${slug}`;
}
