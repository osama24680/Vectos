import React from "react";
import { Link } from "react-router-dom";

// Shared header for inner pages: breadcrumb, eyebrow, title and one line of context.
export default function PageHead({ eyebrow, title, subtitle, crumbs = [] }) {
  return (
    <section className="vx_page_head">
      <div className="container">
        <nav className="vx_crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          {crumbs.map(({ label, to }) => (
            <React.Fragment key={label}>
              <span aria-hidden="true">/</span>
              {to ? <Link to={to}>{label}</Link> : <span>{label}</span>}
            </React.Fragment>
          ))}
        </nav>
        {eyebrow && <span className="vx_eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
}
