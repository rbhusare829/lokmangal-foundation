export const galleryConfig = {
  title: "Gallery",
  endpoint: "/gallery",
  columns: [
    { key: "imageUrl", label: "Photo", image: true },
    { key: "category", label: "Category" },
    { key: "titleEn", label: "Title (EN)" },
    { key: "titleMr", label: "Title (MR)" },
  ],
  fields: [
    { name: "category", label: "Category", type: "select", options: ["annapoorna", "jalsandharan", "vidyadaan", "vivah"], required: true },
    { name: "titleEn", label: "Title (English)", type: "text", required: true },
    { name: "titleMr", label: "Title (Marathi)", type: "text", required: true },
    { name: "sortOrder", label: "Sort Order", type: "text" },
    { name: "image", label: "Photo", type: "file", wide: true, required: true, urlField: "imageUrl" },
  ],
};

export const testimonialsConfig = {
  title: "Testimonials",
  endpoint: "/testimonials",
  columns: [
    { key: "name", label: "Name" },
    { key: "roleEn", label: "Role (EN)" },
    { key: "messageEn", label: "Message (EN)" },
  ],
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "roleEn", label: "Role (English)", type: "text" },
    { name: "roleMr", label: "Role (Marathi)", type: "text" },
    { name: "messageEn", label: "Message (English)", type: "textarea", required: true, wide: true },
    { name: "messageMr", label: "Message (Marathi)", type: "textarea", required: true, wide: true },
    { name: "sortOrder", label: "Sort Order", type: "text" },
    { name: "image", label: "Photo (optional)", type: "file", wide: true, urlField: "photoUrl" },
  ],
};

export const teamConfig = {
  title: "Team",
  endpoint: "/team",
  columns: [
    { key: "photoUrl", label: "Photo", image: true },
    { key: "name", label: "Name" },
    { key: "roleEn", label: "Role (EN)" },
    { key: "roleMr", label: "Role (MR)" },
  ],
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "roleEn", label: "Role (English)", type: "text", required: true },
    { name: "roleMr", label: "Role (Marathi)", type: "text", required: true },
    { name: "sortOrder", label: "Sort Order", type: "text" },
    { name: "image", label: "Photo", type: "file", wide: true, required: true, urlField: "photoUrl" },
  ],
};

export const projectsConfig = {
  title: "Projects",
  endpoint: "/projects",
  columns: [
    { key: "coverImageUrl", label: "Cover", image: true },
    { key: "slug", label: "Slug" },
    { key: "titleEn", label: "Title (EN)" },
    { key: "statEn", label: "Stat" },
  ],
  fields: [
    { name: "slug", label: "Slug (e.g. my-project)", type: "text", required: true },
    { name: "titleEn", label: "Title (English)", type: "text", required: true },
    { name: "titleMr", label: "Title (Marathi)", type: "text", required: true },
    { name: "summaryEn", label: "Summary (English)", type: "textarea", required: true },
    { name: "summaryMr", label: "Summary (Marathi)", type: "textarea", required: true },
    { name: "objectiveEn", label: "Objective (English)", type: "textarea" },
    { name: "objectiveMr", label: "Objective (Marathi)", type: "textarea" },
    { name: "descriptionEn", label: "Full description (English)", type: "textarea", rows: 6, wide: true },
    { name: "descriptionMr", label: "Full description (Marathi)", type: "textarea", rows: 6, wide: true },
    { name: "statEn", label: "Stat badge (English)", type: "text" },
    { name: "statMr", label: "Stat badge (Marathi)", type: "text" },
    { name: "videoUrl", label: "YouTube embed URL", type: "text", wide: true },
    { name: "sortOrder", label: "Sort Order", type: "text" },
    { name: "image", label: "Cover Image", type: "file", wide: true, urlField: "coverImageUrl" },
  ],
};

export const eventsConfig = {
  title: "Events",
  endpoint: "/events",
  columns: [
    { key: "imageUrl", label: "Photo", image: true },
    { key: "titleEn", label: "Title (EN)" },
    { key: "eventDate", label: "Date" },
  ],
  fields: [
    { name: "titleEn", label: "Title (English)", type: "text", required: true },
    { name: "titleMr", label: "Title (Marathi)", type: "text", required: true },
    { name: "descriptionEn", label: "Description (English)", type: "textarea", required: true },
    { name: "descriptionMr", label: "Description (Marathi)", type: "textarea", required: true },
    { name: "eventDate", label: "Date (e.g. 18 February, 2018)", type: "text" },
    { name: "image", label: "Photo", type: "file", urlField: "imageUrl" },
    { name: "document", label: "PDF (optional)", type: "pdf", urlField: "documentUrl" },
  ],
};
