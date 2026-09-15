import { useLocation } from "react-router-dom";
import { useApi } from "../lib/useApi.js";
import { LoadingState } from "../components/ui/AsyncState.jsx";
import ProjectDetail from "./ProjectDetail.jsx";
import NotFound from "./NotFound.jsx";

// Catch-all for any URL that isn't one of the fixed PAGE_SLUGS routes.
// Handles project pages created/renamed through the admin panel (whose
// slugs aren't known at build time) by checking the live project list;
// anything that still doesn't match falls through to a real 404 instead
// of the blank page an unmatched route would otherwise render.
export default function DynamicProjectOrNotFound() {
  const location = useLocation();
  const slug = location.pathname.replace(/^\/mr/, "").replace(/^\//, "").replace(/\/$/, "");
  const { data: projects, loading } = useApi("/projects");

  if (loading) return <LoadingState />;

  const exists = projects?.some((p) => p.slug === slug);
  return exists ? <ProjectDetail slug={slug} /> : <NotFound />;
}
