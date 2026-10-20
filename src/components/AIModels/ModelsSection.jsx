import React from "react";
import "./ModelsSection.css";

const models = [
  {
    title: "Calories Estimation",
    description:
      "Estimates calories burned during an activity from its duration and your body signals.",
    image: "/images/models/Calories_model_BG.jpg",
    inputs: ["Age", "Duration", "Heart rate", "Body temperature"],
  },
  {
    title: "Stress Level & Sleep Quality",
    description:
      "Predicts stress level and sleep quality from heart rate, sleep duration and blood pressure.",
    image: "/images/models/Stress_model_BG.jpg",
    inputs: ["Age", "Heart rate", "Sleep duration", "Blood pressure"],
  },
];

const ModelsSection = () => (
  <section className="vx_models">
    <div className="container">
      <div className="vx_models_grid">
        {models.map((model) => (
          <article key={model.title} className="vx_model vx_card">
            <div className="vx_model_media">
              <img src={model.image} alt="" loading="lazy" />
            </div>
            <div className="vx_model_body">
              <h3>{model.title}</h3>
              <p>{model.description}</p>
              <ul aria-label="Model inputs">
                {model.inputs.map((input) => (
                  <li key={input}>{input}</li>
                ))}
              </ul>
              <a href="#try" className="vx_model_link">
                Try this model →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ModelsSection;
