// import React from "react";
import { useContext } from "react";
import { shoesStore } from "../../Store/contextAPI.js";
import { AuthContext } from "../../AuthContext";
// import parse from 'html-react-parser';
import Hero from "../Hero";
import AboutSection from "../Section/AboutSection";
import Banner from "../Section/BannerSection";
import Section from "../Section";
import FeaturesSection from "../Section/FeaturesSection";
// import TestimonialSection from "../Section/TestimonialSection";
// import BlogSection from "../Section/BlogSection";
import PilotSection from "../Section/PilotSection";
import FaqSection from "../Section/FaqSection";
import { pageTitle } from "../../helpers/PageTitle";

export default function Home() {
  const ctx = useContext(shoesStore);
  const { isAuthenticated } = useContext(AuthContext);
  const { featureListData, faqData } = ctx.HomeData;

  pageTitle("Home");
  return (
    <>
      <Hero
        title="Detect <span>risks</span> <br/> before symptoms appear."
        subTitle="Vectos combines physiological sensing and movement data to identify early changes and deliver timely, actionable risk insights."
        // bgUrl="/images/home_1/hero_bg.jpeg"
        imgUrl="/images/home_1/hero_img.png"
        videoBtnText="See Vectos in action"
        videoUrl="/images/home_1/60s.mp4"
        infoList={[
          {
            title: "Hotline",
            subTitle: "+358449547051",
            iconUrl: "/images/contact/icon_1.svg",
          },
          {
            title: "E-Mail",
            subTitle: "vectos@hello.tech",
            iconUrl: "/images/contact/icon_2.svg",
          },
          {
            title: "Location",
            subTitle: "Jyväskylä, Finland",
            iconUrl: "/images/icons/pin.svg",
          },
        ]}
        btnText={isAuthenticated ? "Open dashboard" : "Get started"}
        btnUrl={isAuthenticated ? "/dashboard" : "/register"}
      />
      {/* Feature Section */}
      <FeaturesSection
        sectionTitle="A System That Understands Your Body"
        sectionSubtitle="Sensors in the shoe capture what your body and movement are telling you — Vectos turns it into early, actionable insight."
        data={featureListData}
      />

      {/* About Section */}
      <Section>
        <AboutSection
          imgUrl="/images/home_1/about.jpg"
          spiningImgUrl="/images/home_1/about_mini.svg"
          title="Why Vectos"
          // subTitle="SHOES FIT"
          featureList={[
            {
              featureListTitle:
                "Vectos was built to detect early changes before they become visible health problems.",
              featureListSubTitle:
                "By combining wearable sensing, movement analysis, and real-world usability, Vectos helps transform fragmented signals into earlier and more actionable health insight.",
            },
          ]}
        />
      </Section>

      {/* Testimonial */}
      {/* <Section
        topMd={185}
        topLg={140}
        topXl={100}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <TestimonialSection
          sectionTitle="Some Reviews"
          sectionTitleDown="Of our clients"
        />
      </Section> */}

      {/* Banner Section */}
      <Section>
        <Banner
          bgUrl="/images/home_1/cta_bg.svg"
          imgUrl="/images/home_1/cta_img.jpg"
          title="Built for Real-World Monitoring."
          subTitle="Designed for movement, daily life, and continuous monitoring outside controlled environments."
        />
      </Section>

      {/* Blog Section */}
      {/* <Section topMd={190} topLg={145} topXl={105}>
        <BlogSection
          sectionTitle="Latest Update"
          sectionTitleUp="BLOG POSTS"
          data={blogData.slice(0, 3)}
        />
      </Section> */}

      <PilotSection imgUrl="/images/home_1/appointment.jpeg" />

      <FaqSection data={faqData} sectionTitle="Frequently Asked Questions" />
    </>
  );
}
