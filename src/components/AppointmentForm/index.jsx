import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AppointmentForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <form action="#" className="row">
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Name</label>
        <input type="text" className="cs_form_field" placeholder="Osama Megahed " />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Organization</label>
        <input
          type="text"
          className="cs_form_field"
          placeholder="+201111765114"
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
        <div className="col-lg-12">
        <label className="cs_input_label cs_heading_color">
          Country
        </label>
        <input
          type="text"
          className="cs_form_field"
          placeholder="Finland"
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-12">
        <label className="cs_input_label cs_heading_color">
          Email
        </label>
        <input
          type="text"
          className="cs_form_field"
          placeholder="osama@gmail.com"
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
    
      <div className="col-lg-12">
        <label className="cs_input_label cs_heading_color">
          What are you interested in?
        </label>
        <div className="cs_radio_group">
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="reasonForVisit"
              id="routineCheckup"
              defaultValue="routineCheckup"
            />
            <label className="cs_radio_label" htmlFor="routineCheckup">
              Pilot
            </label>
          </div>
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="reasonForVisit"
              id="newPatientVisit"
              defaultValue="newPatientVisit"
              defaultChecked=""
            />
            <label className="cs_radio_label" htmlFor="newPatientVisit">
             Partnership
            </label>
          </div>
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="reasonForVisit"
              id="specificConcern"
              defaultValue="specificConcern"
            />
            <label className="cs_radio_label" htmlFor="specificConcern">
           Investor
            </label>
          </div>
        </div>
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      {/* <div className="col-lg-12">
        <label className="cs_input_label cs_heading_color">Department</label>
        <div className="cs_radio_group">
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="department"
              id="pediatric"
              defaultValue="pediatric"
            />
            <label className="cs_radio_label" htmlFor="pediatric">
              Pediatric
            </label>
          </div>
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="department"
              id="obstetricsGynecology"
              defaultValue="obstetricsGynecology"
              defaultChecked=""
            />
            <label className="cs_radio_label" htmlFor="obstetricsGynecology">
              Obstetrics and Gynecology
            </label>
          </div>
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="department"
              id="cardiology"
              defaultValue="cardiology"
            />
            <label className="cs_radio_label" htmlFor="cardiology">
              Cardiology
            </label>
          </div>
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="department"
              id="neurology"
              defaultValue="neurology"
            />
            <label className="cs_radio_label" htmlFor="neurology">
              Neurology
            </label>
          </div>
        </div>
        <div className="cs_height_42 cs_height_xl_25" />
      </div> */}
      <div className="col-lg-12">
        <button className="cs_btn cs_style_1">
          <span>Submit</span>
          <i>
            <img src="/images/icons/arrow_white.svg" alt="Icon" />
            <img src="/images/icons/arrow_white.svg" alt="Icon" />
          </i>
        </button>
      </div>
    </form>
  );
}
