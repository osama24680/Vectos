import React from "react";
import { Icon } from "@iconify/react";
import PageHead from "../PageHead";
import ContactForm from "../ContactForm";
import { pageTitle } from "../../helpers/PageTitle";
import "./Contact.css";

const channels = [
  {
    icon: "fa6-solid:envelope",
    label: "Email",
    value: "vectos@hello.tech",
    href: "mailto:vectos@hello.tech",
  },
  { icon: "fa6-solid:phone", label: "Phone", value: "+358 44 954 7051", href: "tel:+358449547051" },
  { icon: "fa6-solid:location-dot", label: "Location", value: "Jyväskylä, Finland" },
];

export default function Contact() {
  pageTitle("Contact");
  return (
    <>
      <PageHead
        eyebrow="Get in touch"
        title="Contact the Vectos team"
        subtitle="Questions about the smart shoe, a pilot, or a partnership? Send us a message and we'll get back to you."
        crumbs={[{ label: "Contact" }]}
      />
      <section className="vx_contact">
        <div className="container">
          <div className="vx_contact_grid">
            <aside className="vx_contact_info">
              {channels.map(({ icon, label, value, href }) => (
                <div className="vx_contact_channel vx_card" key={label}>
                  <span className="vx_contact_icon">
                    <Icon icon={icon} />
                  </span>
                  <div>
                    <span>{label}</span>
                    {href ? <a href={href}>{value}</a> : <strong>{value}</strong>}
                  </div>
                </div>
              ))}
              <p className="vx_contact_note">
                For pilot programs, use the <a href="/#pilot">pilot request form</a> on the home
                page.
              </p>
            </aside>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
