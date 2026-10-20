import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import "./header.css";

const privateLinks = [
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/models", label: "AI Models" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile menu whenever the route changes
  useEffect(() => setMenuOpen(false), [pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const links = [{ to: "/", label: "Home", end: true }, ...(isAuthenticated ? privateLinks : [])];
  const firstName = user?.name?.split(" ")[0];

  return (
    <header className={`vx_header ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "is-open" : ""}`}>
      <div className="vx_header_bar container">
        <Link to="/" className="vx_brand" aria-label="Vectos home">
          <img src="/images/logo_icon.svg" alt="" width="36" height="36" />
          <span>Vectos</span>
        </Link>

        <div className="vx_menu">
          <nav className="vx_nav" aria-label="Main">
            {links.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className="vx_nav_link">
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="vx_actions">
            {isAuthenticated ? (
              <>
                <span className="vx_user" title={user?.email}>
                  <span className="vx_avatar" aria-hidden="true">
                    {firstName?.[0]?.toUpperCase()}
                  </span>
                  {firstName}
                </span>
                <button type="button" className="vx_btn vx_btn_ghost" onClick={handleLogout}>
                  Log out
                </button>
              </>
            ) : (
              <Link to="/register" className="vx_btn vx_btn_primary">
                Sign in
              </Link>
            )}
          </div>
        </div>

        <button
          type="button"
          className="vx_menu_toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
