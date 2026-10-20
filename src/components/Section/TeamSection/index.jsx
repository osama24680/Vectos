import React from "react";
import Spacing from "../../Spacing";
import SectionHeading from "../../SectionHeading";
import Team from "../../Team";
import "./style.css";
export default function TeamSection({ sectionTitle, sectionTitleUp, data }) {
  return (
    <div className="container">
      <SectionHeading title={sectionTitle} titleUp={sectionTitleUp} center />
      <Spacing md="72" lg="50" />
      <div className="teamLayoutImages vx_team">
        {data?.map((item) => (
          <Team key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
}
