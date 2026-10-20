import React from "react";
import HeroSection from "../AIModels/HeroSection.jsx";
import ModelsSection from "../AIModels/ModelsSection";
import InteractiveForm from "../AIModels/InteractiveForm";
import FutureModels from "../AIModels/FutureModels";
import { pageTitle } from "../../helpers/PageTitle";

const AIModelsPage = () => {
  pageTitle("AI Models");
  return (
    <div>
      <HeroSection />
      <ModelsSection />
      <InteractiveForm />
      <FutureModels />
    </div>
  );
};

export default AIModelsPage;
