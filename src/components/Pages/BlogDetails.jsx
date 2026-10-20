import React from "react";
import { useContext } from "react";
import { shoesStore } from "../../Store/contextAPI.js";
import { Link } from "react-router-dom";
import Section from "../Section";
import PageHead from "../PageHead";
import { Icon } from "@iconify/react";
import Spacing from "../Spacing";
import Sidebar from "../Sidebar";

import ReplyWidget from "../Widget/ReplyWidget";
import { pageTitle } from "../../helpers/PageTitle";
import { useParams } from "react-router-dom";

// import BannerSectionStyle9 from "../Section/BannerSection/BannerSectionStyle9.jsx";

export default function BlogDetails() {
  const { idBlogPost } = useParams();

  const ctx = useContext(shoesStore);
  const BlogDetailsStore = ctx.BlogDetails;
  const blogDetailsPost = BlogDetailsStore.find((element) => element.idBlogPost === idBlogPost);
  pageTitle(blogDetailsPost ? blogDetailsPost.title : "Article not found");

  if (!blogDetailsPost) {
    return (
      <>
        <PageHead
          title="Article not found"
          subtitle="This article doesn't exist or may have been moved."
          crumbs={[{ label: "Blog", to: "/blog" }, { label: "Not found" }]}
        />
        <Section topMd={80} bottomMd={120}>
          <div className="container">
            <Link to="/blog" className="vx_btn vx_btn_primary">
              Back to the blog
            </Link>
          </div>
        </Section>
      </>
    );
  }

  const pageUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(blogDetailsPost.title);
  const shareLinks = [
    {
      icon: "fa-brands:facebook-f",
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
    },
    {
      icon: "fa-brands:linkedin-in",
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
    },
    {
      icon: "fa-brands:twitter",
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${shareText}`,
    },
  ];

  return (
    <>
      <PageHead
        eyebrow="Article"
        title={blogDetailsPost.title}
        crumbs={[{ label: "Blog", to: "/blog" }, { label: "Article" }]}
      />
      <Spacing md="60" lg="50" />
      <div className="container">
        <div className="cs_blog_details_info">
          <div className="cs_blog_details_info_left">
            <div className="cs_blog_details_tags">
              {blogDetailsPost.tags?.map((item, index) => (
                <Link key={index} to={item.href}>
                  {item.tag}
                </Link>
              ))}
            </div>

            <div className="cs_blog_details_date">{blogDetailsPost?.publishDate}</div>
          </div>
          <div className="cs_social_links_wrap">
            <h2>Share:</h2>
            <div className="cs_social_links">
              {shareLinks.map(({ icon, label, href }) => (
                <a key={icon} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon icon={icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <Spacing md="55" />
        <img src={blogDetailsPost?.imageHeader} alt="" className="w-100 cs_radius_20" />
        <Spacing md="90" lg="50" />
        <div className="row">
          <div className="col-lg-8">
            <div className="cs_blog_details">
              <h2>{blogDetailsPost?.header1}</h2>
              <p>{blogDetailsPost?.paragraph1}</p>

              <h2>{blogDetailsPost?.header2}</h2>
              <p>{blogDetailsPost?.paragraph2}</p>
              <blockquote
                style={{
                  backgroundImage: `url(${blogDetailsPost?.quote?.image})`,
                }}
              >
                <p>{blogDetailsPost?.quote?.text}</p>
              </blockquote>
              <h2>{blogDetailsPost?.header3}</h2>
              <p>{blogDetailsPost?.paragraph3}</p>
              <h2>{blogDetailsPost?.header4}</h2>
              <p>{blogDetailsPost?.paragraph4}</p>
              <h2>{blogDetailsPost?.header5}</h2>
              <p>{blogDetailsPost?.paragraph5}</p>
            </div>
            <Spacing md="85" />
            <ReplyWidget title="Leave a Reply" />
          </div>
          <div className="col-lg-4">
            <Sidebar articlesData={blogDetailsPost?.papers} />
          </div>
        </div>
      </div>
      <Spacing md="200" xl="150" lg="110" />
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
