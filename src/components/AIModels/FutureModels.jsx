import React from "react";
import { Icon } from "@iconify/react";
import "./FutureModels.css";

const FutureModels = () => (
  <section className="vx_future">
    <div className="container">
      <div className="vx_future_card">
        <span className="vx_future_icon">
          <Icon icon="mdi:flask-outline" />
        </span>
        <div>
          <h2>More models in the lab</h2>
          <p>
            We're training new models on gait and vital-sign data — next up is early heart-disease
            risk prediction.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default FutureModels;
