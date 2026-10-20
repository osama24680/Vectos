// import React from "react";
import { useContext } from "react";
import { shoesStore } from "../../Store/contextAPI.js";
// import BannerSectionStyle9 from "../Section/BannerSection/BannerSectionStyle9";
import Section from "../Section";
import BlogSectionStyle2 from "../Section/BlogSection/index.jsx";
import PageHead from "../PageHead";
import { pageTitle } from "../../helpers/PageTitle";

export default function Blog() {
  const ctx = useContext(shoesStore);
  const { blogData } = ctx.HomeData;

  pageTitle("Blog");
  return (
    <>
      <PageHead
        eyebrow="Blog"
        title="Health & lifestyle insights"
        subtitle="Research-backed articles on the signals Vectos measures — from heart health and oxygen levels to stress, metabolism and movement."
        crumbs={[{ label: "Blog" }]}
      />
      <Section topMd={100} topLg={80} topXl={70} bottomMd={200} bottomLg={150} bottomXl={110}>
        <BlogSectionStyle2 data={blogData} />
      </Section>
      {/* <Section className="cs_footer_margin_0">
        <BannerSectionStyle9
          title="Don’t Let Your Health <br />Take a Backseat!"
          subTitle="Schedule an appointment with one of our experienced <br />medical professionals today!"
          imgUrl="/images/footer/backSeat.jpg"
        />
      </Section> */}
    </>
  );
}
