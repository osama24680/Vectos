// import React from "react";
import { useContext } from "react";
import { shoesStore } from "../../Store/contextAPI.js";
import Hero from "../Hero";
import AboutSection from "../Section/AboutSection";
import Banner from "../Section/BannerSection";
import Section from "../Section";
import FeaturesSection from "../Section/FeaturesSection";
// import TestimonialSection from "../Section/TestimonialSection";
// import BlogSection from "../Section/BlogSection";
import AppointmentSection from "../Section/AppointmentSection";
import FaqSection from "../Section/FaqSection";
import { pageTitle } from "../../helpers/PageTitle";

export default function Home() {
  const ctx = useContext(shoesStore);
  const { featureListData, faqData } = ctx.HomeData;

  pageTitle("Home");
  return (
    <>
      <Hero
        title="Risk monitoring & early warning insights, designed for real life."
        subTitle="A smart wearable platform that monitors physiological patterns and movement, then sends early warnings and actionable insights. Not a medical diagnosis.."
        bgUrl="/images/home_1/hero_bg.jpeg"
        imgUrl="images/home_1/hero_img.png"
        videoBtnText="See how we work"
        videoUrl="/images/home_1/60s.mp4"
        infoList={[
          {
            title: "Hotline",
            subTitle: "+201111765114",
            iconUrl: "/images/contact/icon_1.svg",
          },
          {
            title: "E-Mail",
            subTitle: "vectos@hello.tech",
            iconUrl: "/images/icons/ambulance.svg",
          },
          {
            title: "Location",
            subTitle: "Jyväskylä, Finland",
            iconUrl: "/images/icons/pin.svg",
          },
        ]}
        btnText="Book Now"
        btnUrl="/appointments"
      />
      {/* Feature Section */}
      <Section
        topMd={185}
        topLg={140}
        topXl={100}
        bottomMd={185}
        bottomLg={140}
        bottomXl={100}
      >
        <FeaturesSection sectionTitle="What Vectos monitors" data={featureListData} />
      </Section>

      {/* About Section */}
      <Section>
        <AboutSection
          imgUrl="/images/home_1/about.jpg"
          spiningImgUrl="/images/home_1/about_mini.svg"
          title="About Vectos"
          // subTitle="SHOES FIT"
          featureList={[
            {
              featureListTitle:
                "Vectos was created to rethink how early health risks are discovered.",
              featureListSubTitle:
                "By combining wearable sensing, AI-driven pattern analysis, and real-world usability, we aim to reduce delayed detection and transform monitoring into proactive awareness.",
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
          bgUrl="images/home_1/cta_bg.svg"
          imgUrl="images/home_1/cta_img.png"
          title="Take Control Before Symptoms Appear."
          subTitle="Your body signals change before you feel it.
Vectos detects subtle deviations and turns them into early insights."
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

      {/* Appointment Section */}
      <Section topMd={190} topLg={145} topXl={105} id="appointment">
        <AppointmentSection
          sectionTitle="Pilot Request Form"
          // sectionTitleUp="BOOK AN"
          imgUrl="/images/home_1/appointment.jpeg"
        />
      </Section>

      {/* FAQ Section */}
      <Section topMd={190} topLg={145} topXl={105}>
        <FaqSection
          data={faqData}
          sectionTitle="Usually Asked"
          sectionTitleUp="What People"
        />
      </Section>
    </>
  );
}
