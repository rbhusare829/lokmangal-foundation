import { Routes, Route, Outlet } from "react-router-dom";
import { LanguageProvider } from "./lib/LanguageContext.jsx";
import Layout from "./components/layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Contribute from "./pages/Contribute.jsx";
import Faq from "./pages/Faq.jsx";
import Gallery from "./pages/Gallery.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Testimonials from "./pages/Testimonials.jsx";
import Volunteer from "./pages/Volunteer.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import DynamicProjectOrNotFound from "./pages/DynamicProjectOrNotFound.jsx";
import { PAGE_SLUGS } from "./lib/pages.js";

import { AdminAuthProvider } from "./admin/AuthContext.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import EntityManager from "./admin/EntityManager.jsx";
import {
  galleryConfig,
  testimonialsConfig,
  teamConfig,
  projectsConfig,
  eventsConfig,
} from "./admin/entityConfigs.js";

const PROJECT_SLUGS = [
  "jalsandharan-project",
  "lokmangal-annapurna-yojana",
  "vidyadaan-yojana",
  "samudayik-vivah-sohala",
];

const PAGE_COMPONENTS = {
  about: <About />,
  contact: <Contact />,
  contribute: <Contribute />,
  faq: <Faq />,
  gallery: <Gallery />,
  projects: <Projects />,
  testimonials: <Testimonials />,
  volunteer: <Volunteer />,
  "privacy-policy": <PrivacyPolicy />,
};

function pageElement(slug) {
  if (!slug) return <Home />;
  if (PROJECT_SLUGS.includes(slug)) return <ProjectDetail slug={slug} />;
  return PAGE_COMPONENTS[slug];
}

export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route element={<Layout />}>
          {PAGE_SLUGS.map((slug) => (
            <Route key={slug || "home"} index={!slug} path={slug || undefined} element={pageElement(slug)} />
          ))}
          <Route path="mr">
            {PAGE_SLUGS.map((slug) => (
              <Route
                key={`mr-${slug || "home"}`}
                index={!slug}
                path={slug || undefined}
                element={pageElement(slug)}
              />
            ))}
            <Route path="*" element={<DynamicProjectOrNotFound />} />
          </Route>
          <Route path="*" element={<DynamicProjectOrNotFound />} />
        </Route>

        <Route
          path="/admin"
          element={
            <AdminAuthProvider>
              <Outlet />
            </AdminAuthProvider>
          }
        >
          <Route path="login" element={<AdminLogin />} />
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="gallery" element={<EntityManager config={galleryConfig} />} />
            <Route path="testimonials" element={<EntityManager config={testimonialsConfig} />} />
            <Route path="team" element={<EntityManager config={teamConfig} />} />
            <Route path="projects" element={<EntityManager config={projectsConfig} />} />
            <Route path="events" element={<EntityManager config={eventsConfig} />} />
          </Route>
        </Route>
      </Routes>
    </LanguageProvider>
  );
}
