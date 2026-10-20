import React, { useState } from "react";
import "./style.css";

const PILOT_EMAIL = "vectos@hello.tech";
const INTERESTS = ["Pilot program", "Partnership", "Investment"];
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// No backend yet: the request opens the visitor's mail app with everything filled in.
export default function PilotSection({ imgUrl }) {
  const [form, setForm] = useState({ name: "", organization: "", country: "", email: "", interest: INTERESTS[0] });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !emailRegex.test(form.email)) {
      setError("Please add your name and a valid email address.");
      return;
    }
    setError("");
    const subject = encodeURIComponent(`${form.interest} request — ${form.organization || form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nOrganization: ${form.organization || "-"}\nCountry: ${form.country || "-"}\nEmail: ${form.email}\nInterested in: ${form.interest}`
    );
    window.location.href = `mailto:${PILOT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section className="vx_pilot" id="pilot">
      <div className="container">
        <div className="vx_pilot_grid">
          <div>
            <span className="vx_eyebrow">Work with us</span>
            <h2>Request a Pilot</h2>
            <p className="vx_pilot_lead">
              Clinics, research teams and partners can test Vectos in real-world settings. Tell us a
              little about you and we'll get back to you.
            </p>

            <form className="vx_pilot_form" onSubmit={handleSubmit} noValidate>
              <div className="vx_field">
                <label htmlFor="pilot-name">Name</label>
                <input id="pilot-name" name="name" autoComplete="name" placeholder="Your full name" value={form.name} onChange={update} />
              </div>
              <div className="vx_field">
                <label htmlFor="pilot-org">Organization</label>
                <input id="pilot-org" name="organization" autoComplete="organization" placeholder="Clinic, lab or company" value={form.organization} onChange={update} />
              </div>
              <div className="vx_field">
                <label htmlFor="pilot-country">Country</label>
                <input id="pilot-country" name="country" autoComplete="country-name" placeholder="Where are you based?" value={form.country} onChange={update} />
              </div>
              <div className="vx_field">
                <label htmlFor="pilot-email">Email</label>
                <input id="pilot-email" type="email" name="email" autoComplete="email" placeholder="you@organization.com" value={form.email} onChange={update} />
              </div>

              <fieldset className="vx_pilot_interest">
                <legend>What are you interested in?</legend>
                {INTERESTS.map((option) => (
                  <label key={option} className={form.interest === option ? "is-checked" : ""}>
                    <input type="radio" name="interest" value={option} checked={form.interest === option} onChange={update} />
                    {option}
                  </label>
                ))}
              </fieldset>

              {error && <p className="vx_field_error" role="alert">{error}</p>}
              {sent && !error && (
                <p className="vx_pilot_note" role="status">
                  Your email app should open with the request ready to send. Nothing opened? Write to{" "}
                  <a href={`mailto:${PILOT_EMAIL}`}>{PILOT_EMAIL}</a>.
                </p>
              )}

              <button type="submit" className="vx_btn vx_btn_primary vx_pilot_submit">
                Send request
              </button>
            </form>
          </div>

          <div className="vx_pilot_media">
            <img src={imgUrl} alt="Vectos smart shoes next to the monitoring dashboard" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
