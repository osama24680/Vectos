import React from "react";
import "./style.css";

export default function FeaturesSection({ sectionTitle, sectionSubtitle, data }) {
  return (
    <section className="vx_features">
      <div className="container">
        <div className="vx_section_head">
          <span className="vx_eyebrow">How it works</span>
          <h2>{sectionTitle}</h2>
          {sectionSubtitle && <p>{sectionSubtitle}</p>}
        </div>

        <div className="vx_features_grid">
          {data?.map(({ iconSrc, title, subTitle }, index) => (
            <article className="vx_feature vx_card" key={title}>
              <div className="vx_feature_top">
                <span className="vx_feature_icon">
                  <img src={iconSrc} alt="" />
                </span>
                <span className="vx_feature_step">0{index + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{subTitle}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
