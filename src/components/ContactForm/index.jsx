import { useContext } from "react";
import { shoesStore } from "../../Store/contextAPI.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// field names match the EmailJS contact template: userName, userEmail, subject, message
export default function ContactForm() {
  const ctx = useContext(shoesStore);
  return (
    <form
      className="vx_contact_form vx_card"
      ref={ctx.form_Contact}
      onSubmit={ctx.sendEmail_Contact}
    >
      <h2>Send us a message</h2>
      <div className="vx_contact_row">
        <div className="vx_field">
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            name="userName"
            autoComplete="name"
            placeholder="Your full name"
            required
          />
        </div>
        <div className="vx_field">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            name="userEmail"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>
      <div className="vx_field">
        <label htmlFor="contact-subject">Subject</label>
        <input id="contact-subject" name="subject" placeholder="What is it about?" />
      </div>
      <div className="vx_field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          placeholder="Tell us how we can help…"
          required
        />
      </div>
      <button type="submit" className="vx_btn vx_btn_primary vx_contact_submit">
        Send message
      </button>
      <ToastContainer position="top-center" />
    </form>
  );
}
