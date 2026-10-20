import React from "react";
import { useContext } from "react";
import { shoesStore } from "../../Store/contextAPI.js";
import PageHead from "../PageHead";
// import BannerSectionStyle9 from "../Section/BannerSection/BannerSectionStyle9";
import Section from "../Section";
import DepartmentSectionStyle2 from "../Section/DepartmentSection/DepartmentSectionStyle2";

import TeamSection from "../Section/TeamSection";
import AwardSectionStyle2 from "../Section/AwardSection/AwardSectionStyle2";
import { pageTitle } from "../../helpers/PageTitle";

export default function About() {
  const ctx = useContext(shoesStore);
  const {
    departmentData,

    teamData,
    awardData,
  } = ctx.AboutData;

  pageTitle("About");
  return (
    <>
      <PageHead
        eyebrow="About Vectos"
        title="Wearable systems for early health-risk monitoring"
        subtitle="An AI health-technology startup combining embedded sensing, movement analysis and pattern detection — built at the intersection of wearable hardware, AI and real-world health insight."
        crumbs={[{ label: "About" }]}
      />
      <div className="container">
        <img
          className="vx_about_photo"
          src="/images/about/banner_img.jpg"
          alt="The Vectos team working on the smart shoe, sensor boards and the monitoring dashboard"
        />
      </div>
      <Section topMd={200} topLg={150} topXl={110}>
        <DepartmentSectionStyle2
          sectionTitle="Platform capabilities"
          sectionTitleUp="What Vectos does"
          data={departmentData}
        />
      </Section>

      <Section topMd={190} topLg={145} topXl={105}>
        <TeamSection
          sectionTitle="The Team Behind Vectos"
          sectionTitleUp="Meet the people"
          data={teamData}
        />
      </Section>

      <Section topMd={190} topLg={145} topXl={105} bottomMd={200} bottomLg={150} bottomXl={110}>
        <AwardSectionStyle2
          sectionTitle="Recognition & awards"
          sectionTitleUp="Validation"
          sectionSubTitle="Early recognition for the vision, feasibility, and innovation behind Vectos."
          data={awardData}
        />
      </Section>

      {/* <Section className="cs_footer_margin_0">
        <BannerSectionStyle9
          imgUrl="/images/footer/backSeat.jpg"
          title="Don’t Let Your Health <br />Take a Backseat!"
          subTitle="Schedule an appointment with one of our experienced <br />medical professionals today!"
        />
      </Section> */}
    </>
  );
}
