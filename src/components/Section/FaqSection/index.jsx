import React, { useId, useState } from "react";
import "./style.css";

export default function FaqSection({ data, sectionTitle }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <section className="vx_faq">
      <div className="container">
        <div className="vx_section_head">
          <span className="vx_eyebrow">FAQ</span>
          <h2>{sectionTitle}</h2>
        </div>

        <div className="vx_faq_list">
          {data?.map(({ title, content }, index) => {
            const isOpen = open === index;
            const panelId = `${baseId}-panel-${index}`;
            return (
              <div className={`vx_faq_item ${isOpen ? "is-open" : ""}`} key={title}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                  >
                    {title}
                    <span className="vx_faq_icon" aria-hidden="true" />
                  </button>
                </h3>
                {/* grid-rows 0fr -> 1fr animates to the content's real height */}
                <div className="vx_faq_panel" id={panelId} role="region">
                  <div>
                    <p>{content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
