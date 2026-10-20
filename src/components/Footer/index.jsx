import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { AuthContext } from "../../AuthContext";
import "./style.css";

const contact = [
  { icon: "fa6-solid:location-dot", label: "Jyväskylä, Finland" },
  { icon: "fa6-solid:phone", label: "+358 44 954 7051", href: "tel:+358449547051" },
  { icon: "fa6-solid:envelope", label: "vectos@hello.tech", href: "mailto:vectos@hello.tech" },
];

export default function Footer() {
  const { isAuthenticated } = useContext(AuthContext);

  const explore = isAuthenticated
    ? [
        { to: "/about", label: "About" },
        { to: "/blog", label: "Blog" },
        { to: "/models", label: "AI Models" },
        { to: "/dashboard", label: "Dashboard" },
        { to: "/contact", label: "Contact" },
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/register", label: "Sign in" },
        { to: "/register", label: "Create account" },
      ];

  return (
    <footer className="vx_footer">
      <div className="container">
        <div className="vx_footer_cta">
          <div>
            <h2>Ready to test Vectos in the real world?</h2>
            <p>Clinics, research teams and partners — join our pilot program.</p>
          </div>
          <a href="/#pilot" className="vx_btn vx_btn_light">
            Request a pilot
          </a>
        </div>

        <div className="vx_footer_grid">
          <div className="vx_footer_brand">
            <Link to="/" className="vx_footer_logo">
              <img src="/images/logo_icon.svg" alt="" width="40" height="40" />
              Vectos
            </Link>
            <p>
              AI-powered smart shoes for early health-risk detection — continuous physiological and
              movement insight, outside the clinic.
            </p>
          </div>

          <nav className="vx_footer_col" aria-label="Footer">
            <h3>Explore</h3>
            <ul>
              {explore.map(({ to, label }) => (
                <li key={label}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="vx_footer_col">
            <h3>Contact</h3>
            <ul>
              {contact.map(({ icon, label, href }) => (
                <li key={label}>
                  <Icon icon={icon} className="vx_footer_icon" />
                  {href ? <a href={href}>{label}</a> : <span>{label}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="vx_footer_bottom">
          <span>© {new Date().getFullYear()} Vectos. All rights reserved.</span>
          <span>Vectos supports early risk awareness — it does not replace clinical diagnosis.</span>
        </div>
      </div>
    </footer>
  );
}
