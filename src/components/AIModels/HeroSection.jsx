import React from "react";
import PageHead from "../PageHead";

const HeroSection = () => (
  <PageHead
    eyebrow="Machine learning"
    title="AI Models"
    subtitle="Models trained on physiological and movement data to turn raw sensor readings into health insights."
    crumbs={[{ label: "AI Models" }]}
  />
);

export default HeroSection;
