import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import VideoModal from "../VideoModal";
import "./style.css";

export default function Hero({
  title,
  subTitle,
  bgUrl,
  imgUrl,
  videoBtnText,
  videoUrl,
  infoList,
  btnText,
  btnUrl,
}) {
  return (
    <section className="cs_hero cs_style_1">
      <div
        className="cs_hero_wrap cs_bg_filed"
        // style={{ backgroundImage: bgUrl ? `url(${bgUrl})` : 'none' }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-grid"></div>
        <div className="hero-text-glow"></div>
        <div className="hero-boot-glow"></div>
        <div className="hero-sensor-glow"></div>

        <div className="container">
          <div className="cs_hero_content">
            <div className="cs_hero_text">
              <h1 className="cs_hero_title cs_fs_94">{parse(title)}</h1>
              <p className="cs_hero_subtitle cs_fs_20 cs_heading_color">{parse(subTitle)}</p>
              <div className="cs_hero_btn_wrap">
                {btnText && (
                  <Link to={btnUrl} className="vx_btn vx_btn_primary vx_hero_cta">
                    {btnText}
                  </Link>
                )}
                <VideoModal
                  videoUrl={videoUrl}
                  videoBtnText={videoBtnText}
                  variant="cs_heading_color"
                />
              </div>
            </div>
            <div className="cs_hero_img_wrap">
              <img
                src={imgUrl}
                alt="Vectos smart shoe with embedded sensors"
                className="cs_hero_img"
              />
            </div>
          </div>

          <div className="cs_hero_info_wrap cs_shadow_1 cs_white_bg cs_radius_15">
            {infoList.map((item, index) => (
              <div className="cs_hero_info_col" key={index}>
                <div className="cs_hero_info d-flex align-items-center">
                  <div className="cs_hero_info_icon cs_center rounded-circle cs_accent_bg">
                    <img src={item.iconUrl} alt="Icon" />
                  </div>
                  <div className="cs_hero_info_right">
                    <h3 className="cs_hero_info_title cs_semibold">{item.title}</h3>
                    <p className="cs_hero_info_subtitle cs_fs_20">{item.subTitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
