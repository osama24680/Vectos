import React from "react";
import { Link } from "react-router-dom";
import { pageTitle } from "../../helpers/PageTitle";

export default function ErrorPage() {
  pageTitle("Page not found");
  return (
    <main className="vx_404">
      <img src="/images/logo_icon.svg" alt="" width="56" height="56" />
      <span className="vx_eyebrow">Error 404</span>
      <h1>This page could not be found.</h1>
      <p>The link may be broken, or the page may have been moved.</p>
      <Link to="/" className="vx_btn vx_btn_primary">
        Back to home
      </Link>
    </main>
  );
}
