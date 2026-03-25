import React from 'react';
import "./style.css";
export default function Banner({ bgUrl, imgUrl, title, subTitle }) {
  return (
    <div className="container vectos_banner_container">
      <div
        className="cs_banner cs_style_1 cs_bg_filed vectos_banner"
        style={{ backgroundImage: `url(${bgUrl})` }}
      >
        <div className="vectos_banner_overlay" />

        <div className="vectos_banner_content">
          <h2 className="cs_banner_title cs_white_color cs_fs_72 vectos_banner_title">
            {title}
          </h2>

          <p className="cs_banner_subtitle cs_heading_color cs_fs_20 cs_medium m-0 vectos_banner_subtitle">
            {subTitle}
          </p>
        </div>

        <div className="vectos_banner_img_wrap">
          <img src={imgUrl} alt="Banner" className=" vectos_banner_img" />
        </div>
      </div>
    </div>
  );
}