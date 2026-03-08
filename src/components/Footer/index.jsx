import React from 'react';
import ContactInfoWidget from '../Widget/ContactInfoWidget';
import MenuWidget from '../Widget/MenuWidget';
import SocialWidget from '../Widget/SocialWidget';
import Newsletter from '../Widget/Newsletter';
import TextWidget from '../Widget/TextWidget';
const menuDataOne = [
  { title: 'How It Works', href: '/' },
  { title: 'Technology', href: '/' },
  { title: 'Pilot Program', href: '/' },
  { title: 'Request Early Access', href: '/' },
  { title: 'Dashboard', href: '/' }
];
const menuDataTwo = [
  { title: 'Privacy Policy', href: '/blog' },
  { title: 'Data Security', href: '/contact' },
  { title: 'Terms of Service', href: '/' },
  { title: 'Regulatory Disclaimer', href: '/' }
];

export default function Footer() {
  return (
    <footer className="cs_footer cs_style_1 cs_heading_color">
      <div
        className="cs_footer_logo_wrap"
        style={{ backgroundImage: "url(/images/footer_bg_1.svg)" }}
      >
        <div
          className="cs_footer_brand"
          style={{ backgroundImage: "url(/images/footer_logo_bg.svg)" }}
        >
          <img
            src="/images/logo_icon.svg"
            alt="Logo Icon"
            className="cs_footer_brand_icon"
          />
          <h2 className="cs_footer_brand_text">Vectos</h2>
        </div>
      </div>
      <div className="cs_footer_main">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="cs_footer_item">
                <TextWidget text="Vectos AI-powered early risk monitoring platform
Designed for continuous physiological insight." />
                <ContactInfoWidget />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="cs_footer_item">
                <MenuWidget data={menuDataOne} />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="cs_footer_item">
                <MenuWidget data={menuDataTwo} />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cs_footer_item">
                <Newsletter
                  title="Stay Connected"
                  subTitle="Join the Predictive Health Movement"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cs_footer_bottom cs_accent_bg">
        <div className="container">
          <div className="cs_footer_bottom_in">
            <SocialWidget />
            <div className="cs_copyright">
              Copyright © 2024 Vectos Health. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
