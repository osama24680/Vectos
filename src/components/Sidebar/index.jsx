import React from "react";
// import SideMenuWidget from "../Widget/SideMenuWidget";
import RecentPostWidget from "../Widget/RecentPostWidget";
import NewsletterStyle5 from "../Widget/NewsletterStyle5";
// const categoryData = [
//   {
//     title: "Health Tips and Tricks",
//     url: "/",
//   },
//   {
//     title: "Trends and Analysis",
//     url: "/",
//   },
//   {
//     title: "Time Management",
//     url: "/",
//   },
// ];
export default function Sidebar({ articlesData }) {
  return (
    <div className="cs_sidebar">
      <div className="cs_sidebar_item">
        <RecentPostWidget
          title="Popular Articles"
          articlesData={articlesData}
        />
      </div>
      <div className="cs_sidebar_item widget_categories">
        <NewsletterStyle5 title="Newsletter Sign Up Form" />
      </div>
    </div>
  );
}
