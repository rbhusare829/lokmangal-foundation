import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext.jsx";
import PageBanner from "../components/ui/PageBanner.jsx";

export default function Faq() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <PageBanner title={t.pages.faq.title} />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="divide-y divide-light-green-tint overflow-hidden rounded-2xl border border-light-green-tint bg-card-bg">
            {t.pages.faq.items.map((item, i) => {
              const open = openIndex === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpenIndex(open ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-semibold text-brand-green-primary">{item.q}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-brand-orange-accent transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open && <div className="px-5 pb-4 text-sm text-secondary-text">{item.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
