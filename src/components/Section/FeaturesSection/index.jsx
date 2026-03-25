import React from 'react';
import SectionHeading from '../../SectionHeading';
import Spacing from '../../Spacing';
import Feature from '../../Feature';
import './style.css';

export default function FeaturesSection({ sectionTitle, data }) {
  return (
    <div className="cs_shape_wrap vectos_features_section">
      <div className="cs_shape_1 vectos_features_bg" />

      <div className="container">
        <SectionHeading title={sectionTitle} center />
        <Spacing md="72" lg="50" />

        <div className="cs_random_features vectos_features_grid">
          {data?.map((item, index) => (
            <div
              className="cs_random_features_col vectos_feature_col"
              key={index}
            >
              <div className="vectos_feature_card">
                <Feature {...item} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}