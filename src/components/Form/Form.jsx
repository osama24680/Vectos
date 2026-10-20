// Form.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Form.css";
import { AuthContext } from "../../AuthContext";
import { createSalt, hashPassword, verifyPassword } from "../../helpers/password";

const From = () => {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
  const idRegex = /^\d{5}$/;
  const nameRegex = /^[A-Z][a-zA-Z\s]{2,29}$/;

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", id: "", email: "", password: "" });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let error = "";

    if (name === "name" && !nameRegex.test(value)) {
      error = "Name must start with an uppercase letter and contain 3-30 letters only.";
    } else if (name === "id" && !idRegex.test(value)) {
      error = "ID must be exactly 5 numeric characters.";
    } else if (name === "email" && !emailRegex.test(value)) {
      error = "Please enter a valid email address.";
    } else if (name === "password" && !passwordRegex.test(value)) {
      error =
        "Password must include at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const email = formData.email.trim().toLowerCase();

    if (isLogin) {
      const user = users.find((u) => u.email.toLowerCase() === email);
      const valid = user && (await verifyPassword(user, formData.password));

      if (valid) {
        // upgrade an account saved before hashing: drop its plain-text password
        if (!user.hash) {
          user.salt = createSalt();
          user.hash = await hashPassword(formData.password, user.salt);
          delete user.password;
          localStorage.setItem("users", JSON.stringify(users));
        }
        login(user);
        toast.success(`Login successful! Welcome, ${user.name}.`);
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        toast.error("Invalid email or password.");
      }
    } else {
      if (!formData.name || !formData.id || !formData.email || !formData.password) {
        toast.error("All fields are required.");
        return;
      }

      if (Object.values(errors).some((err) => err)) {
        toast.error("Please fix the errors before submitting.");
        return;
      }

      const emailExists = users.some((u) => u.email.toLowerCase() === email);
      const idExists = users.some((u) => u.id === formData.id);

      if (emailExists) {
        toast.error("This email is already registered.");
        return;
      }

      if (idExists) {
        toast.error("This ID is already registered.");
        return;
      }

      const salt = createSalt();
      const newUser = {
        name: formData.name.trim(),
        id: formData.id,
        email,
        salt,
        hash: await hashPassword(formData.password, salt),
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      toast.success("Registration successful! You can now log in.");
      toggleForm();
    }
  };

  return (
    <section className="vx_auth">
      <div
        className="vx_auth_aside"
        // public-folder image: set inline so the CSS bundler doesn't try to resolve it
        style={{ "--auth-photo": "url(/images/about/banner_img.jpg)" }}
      >
        <div className="vx_auth_aside_in">
          <img src="/images/logo_icon.svg" alt="" width="52" height="52" />
          <h2>Your health, read from every step.</h2>
          <p>
            Sign in to see live sensor readings from the Vectos smart shoe and try our AI models for
            calories, stress and sleep quality.
          </p>
          <ul>
            <li>Live heart rate, SpO₂ and temperature</li>
            <li>Motion analysis and fall detection</li>
            <li>AI-powered health predictions</li>
          </ul>
        </div>
      </div>

      <div className="vx_auth_main">
        <div className="vx_auth_card">
          <span className="vx_eyebrow">{isLogin ? "Welcome back" : "Get started"}</span>
          <h1>{isLogin ? "Sign in to Vectos" : "Create your account"}</h1>

          <form className="vx_auth_form" onSubmit={handleSubmit} noValidate>
            {!isLogin && (
              <>
                <div className="vx_field">
                  <label htmlFor="auth-name">Full name</label>
                  <input
                    id="auth-name"
                    type="text"
                    name="name"
                    placeholder="e.g. Sara Ahmed"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name && <p className="vx_field_error">{errors.name}</p>}
                </div>
                <div className="vx_field">
                  <label htmlFor="auth-id">Member ID</label>
                  <input
                    id="auth-id"
                    type="text"
                    name="id"
                    placeholder="5 digits"
                    autoComplete="off"
                    value={formData.id}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.id)}
                  />
                  {errors.id && <p className="vx_field_error">{errors.id}</p>}
                </div>
              </>
            )}
            <div className="vx_field">
              <label htmlFor="auth-email">Email</label>
              <input
                id="auth-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && <p className="vx_field_error">{errors.email}</p>}
            </div>
            <div className="vx_field">
              <label htmlFor="auth-password">Password</label>
              <input
                id="auth-password"
                type="password"
                name="password"
                placeholder="At least 8 characters"
                autoComplete={isLogin ? "current-password" : "new-password"}
                value={formData.password}
                onChange={handleChange}
                aria-invalid={Boolean(errors.password)}
              />
              {errors.password && <p className="vx_field_error">{errors.password}</p>}
            </div>

            <button type="submit" className="vx_btn vx_btn_primary vx_auth_submit">
              {isLogin ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="vx_auth_switch">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button type="button" onClick={toggleForm}>
              {isLogin ? "Create one" : "Sign in"}
            </button>
          </p>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </section>
  );
};

export default From;
