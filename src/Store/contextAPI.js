import React, { useRef, useState, useEffect } from "react";
import { createContext } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import * as HomeData from "./Data/HomeData.js";
import * as AboutData from "./Data/AboutData.js";
import { BlogDetails } from "./Data/BlogDetails.js";

// keys come from .env.local (see .env.example) so they stay out of the repository
const THINGSPEAK_CHANNEL = process.env.REACT_APP_THINGSPEAK_CHANNEL_ID;
const THINGSPEAK_READ_KEY = process.env.REACT_APP_THINGSPEAK_READ_KEY;
const THINGSPEAK_RESULTS = process.env.REACT_APP_THINGSPEAK_RESULTS || 30;
const EMAILJS_SERVICE = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const EMAILJS_TEMPLATE_BLOG = process.env.REACT_APP_EMAILJS_TEMPLATE_BLOG;
const EMAILJS_TEMPLATE_CONTACT = process.env.REACT_APP_EMAILJS_TEMPLATE_CONTACT;

export const shoesStore = createContext(0);
export const ShoesProvider = (props) => {
  const [thingSpeakData, setThingSpeakData] = useState(null);
  const [thingSpeakError, setThingSpeakError] = useState(null);
  const [thingSpeakLoading, setThingSpeakLoading] = useState(false);

  const fetchData = async () => {
    if (!THINGSPEAK_CHANNEL || !THINGSPEAK_READ_KEY) {
      setThingSpeakError("Sensor feed isn't configured (missing ThingSpeak keys).");
      return;
    }
    setThingSpeakLoading(true);
    setThingSpeakError(null);
    try {
      const response = await fetch(
        `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL}/feeds.json?api_key=${THINGSPEAK_READ_KEY}&results=${THINGSPEAK_RESULTS}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      const sortedFeeds = result.feeds.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );

      setThingSpeakData({ ...result, feeds: sortedFeeds });
    } catch (err) {
      setThingSpeakError(err.message);
    } finally {
      setThingSpeakLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const form_BlgDetails = useRef();
  const form_Contact = useRef();

  const sendEmail_BlogDetails = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE_BLOG, form_BlgDetails.current, {
        publicKey: EMAILJS_PUBLIC_KEY,
      })
      .then(
        () => {
          toast.success("Message sent successfully!", {});
        },
        (error) => {
          console.error("EmailJS error:", error.text);
          toast.error("Something wrong happened!");
        },
      );
  };

  const sendEmail_Contact = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE_CONTACT, form_Contact.current, {
        publicKey: EMAILJS_PUBLIC_KEY,
      })
      .then(
        () => {
          toast.success("Message sent — we'll get back to you soon.");
          form_Contact.current?.reset();
        },
        (error) => {
          console.error("EmailJS error:", error.text);
          toast.error("Something wrong happened!");
        },
      );
  };

  let values = {
    HomeData,
    BlogDetails,
    AboutData,
    form_BlgDetails,
    form_Contact,
    sendEmail_BlogDetails,
    sendEmail_Contact,
    thingSpeakData,
    thingSpeakError,
    thingSpeakLoading,
    refreshThingSpeak: fetchData,
  };

  return <shoesStore.Provider value={values}>{props.children}</shoesStore.Provider>;
};
