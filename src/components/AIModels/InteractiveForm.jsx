import React, { useState, useEffect } from "react";
import axios from "axios";
import "./InteractiveForm.css";

// base URL of the Flask models API, e.g. http://127.0.0.1:5000 locally (see .env.example)
const ML_API_URL = (process.env.REACT_APP_ML_API_URL || "").replace(/\/$/, "");

const InteractiveForm = () => {
  const [selectedModel, setSelectedModel] = useState("calories");

  const [calories_age, setCalories_Age] = useState("");
  const [calories_temperature, setCalories_temperature] = useState("");
  const [calories_heart_rate, setCalories_heart_rate] = useState("");
  const [calories_duration, setCalories_duration] = useState("");

  const [Humidity, setHumidity] = useState("");
  const [Temperature_C, setTemperature_C] = useState("");
  const [Step_count, setStep_count] = useState("");

  const [Age, setAge] = useState("");
  const [Height_meters, setHeight_meters] = useState("");
  const [Weight_kg, setWeight_kg] = useState("");
  const [HoehnYahr, setHoehnYahr] = useState("");
  const [UPDRSM, setUPDRSM] = useState("");
  const [TUAG, setTUAG] = useState("");
  const [Speed_01_msec, setSpeed_01_msec] = useState("");
  const [Speed_10, setSpeed_10] = useState("");

  const [SS_Age, setSS_Age] = useState("");
  const [SS_HeartRate, setSS_Heart_Rate] = useState("");
  const [SS_Sleep_Duration, setSS_Sleep_Duration] = useState("");
  const [SS_Systole, setSS_Systole] = useState("");
  const [SS_Diastole, setSS_Diastole] = useState("");

  const [prediction, setPrediction] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const SubjnumConstant = 5;

  // each model: its Flask endpoint, the payload it expects, and how to read the answer
  const requests = {
    calories: () => ({
      path: "/predictCalories",
      body: {
        calories_age: Number(calories_age),
        calories_duration: Number(calories_duration),
        calories_temperature: Number(calories_temperature),
        calories_heart_rate: Number(calories_heart_rate),
      },
      read: (data) => data.calories,
    }),
    stress: () => ({
      path: "/predictStress",
      body: {
        Humidity: Number(Humidity),
        Temperature_C: Number(Temperature_C),
        Step_count: Number(Step_count),
      },
      read: (data) => data.stress,
    }),
    parkinson: () => ({
      path: "/predictParkinson",
      body: {
        Subjnum: Number(SubjnumConstant),
        Age: Number(Age),
        Height_meters: Number(Height_meters),
        Weight_kg: Number(Weight_kg),
        HoehnYahr: Number(HoehnYahr),
        UPDRSM: Number(UPDRSM),
        TUAG: Number(TUAG),
        Speed_01_msec: Number(Speed_01_msec),
        Speed_10: Number(Speed_10),
      },
      read: (data) => data.parkinson,
    }),
    sleepStress: () => ({
      path: "/sleepStress",
      body: {
        age: Number(SS_Age),
        heart_rate: Number(SS_HeartRate),
        sleep_duration: Number(SS_Sleep_Duration),
        systole: Number(SS_Systole),
        diastole: Number(SS_Diastole),
      },
      read: (data) =>
        data.predicted_sleep != null && data.predicted_stress != null
          ? { sleep: data.predicted_sleep, stress: data.predicted_stress }
          : undefined,
    }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrediction(null);
    setError("");

    if (!ML_API_URL) {
      setError(
        "The AI service isn't connected in this deployment yet. Run the Flask models locally and set REACT_APP_ML_API_URL to try them.",
      );
      return;
    }

    const { path, body, read } = requests[selectedModel]();
    setLoading(true);
    try {
      const response = await axios.post(`${ML_API_URL}${path}`, body, { timeout: 15000 });
      const result = read(response.data);
      if (result === undefined) throw new Error("Unexpected response from the model.");
      setPrediction(result);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          (err.request && !err.response
            ? "Couldn't reach the AI service — it may be offline. Please try again later."
            : err.message),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPrediction(null);
    setError("");
  }, [selectedModel]);

  const renderInputs = () => {
    if (selectedModel === "calories") {
      return (
        <>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              placeholder="Enter your age"
              value={calories_age}
              onChange={(e) => setCalories_Age(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Duration (min)</label>
            <input
              type="number"
              name="duration"
              placeholder="Enter activity duration"
              value={calories_duration}
              onChange={(e) => setCalories_duration(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Temperature (°C)</label>
            <input
              type="number"
              name="temperature"
              placeholder="Enter temperature"
              value={calories_temperature}
              onChange={(e) => setCalories_temperature(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Heart Rate</label>
            <input
              type="number"
              name="heartRate"
              placeholder="Enter your heart rate"
              value={calories_heart_rate}
              onChange={(e) => setCalories_heart_rate(e.target.value)}
            />
          </div>
        </>
      );
    } else if (selectedModel === "stress") {
      return (
        <>
          <div className="form-group">
            <label>Sweat (%)</label>
            <input
              type="number"
              name="humidity"
              placeholder="Enter sweat"
              value={Humidity}
              onChange={(e) => setHumidity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Temperature (°C)</label>
            <input
              type="number"
              name="temperature"
              placeholder="Enter temperature"
              value={Temperature_C}
              onChange={(e) => setTemperature_C(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Step Count</label>
            <input
              type="number"
              name="stepCount"
              placeholder="Enter step count"
              value={Step_count}
              onChange={(e) => setStep_count(e.target.value)}
            />
          </div>
        </>
      );
    } else if (selectedModel === "parkinson") {
      return (
        <>
          <div className="form-group">
            <label>Age</label>
            <input
              type="text"
              name="Age"
              placeholder="Enter value of age"
              value={Age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Height (m)</label>
            <input
              type="text"
              name="Height (m)"
              placeholder="Enter value of Height"
              value={Height_meters}
              onChange={(e) => setHeight_meters(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Weight (Kg)</label>
            <input
              type="text"
              name="Weight (Kg)"
              placeholder="Enter value of weight"
              value={Weight_kg}
              onChange={(e) => setWeight_kg(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>HoehnYahr</label>
            <input
              type="text"
              name="HoehnYahr"
              placeholder="Enter value for C"
              value={HoehnYahr}
              onChange={(e) => setHoehnYahr(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>UPDRSM</label>
            <input
              type="text"
              name="UPDRSM"
              placeholder="Enter value of UPDRSM"
              value={UPDRSM}
              onChange={(e) => setUPDRSM(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>TUAG</label>
            <input
              type="text"
              name="TUAG"
              placeholder="Enter value of TUAG"
              value={TUAG}
              onChange={(e) => setTUAG(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Speed_01_msec</label>
            <input
              type="text"
              name="Speed_01_msec"
              placeholder="Enter value of Speed_01_msec"
              value={Speed_01_msec}
              onChange={(e) => setSpeed_01_msec(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Speed_10_msec</label>
            <input
              type="text"
              name="Speed_10"
              placeholder="Enter value of Speed_10"
              value={Speed_10}
              onChange={(e) => setSpeed_10(e.target.value)}
            />
          </div>
        </>
      );
    } else if (selectedModel === "sleepStress") {
      return (
        <>
          <div className="form-group">
            <label>Age</label>
            <input
              type="text"
              name="age"
              placeholder="Enter value of age"
              value={SS_Age}
              onChange={(e) => setSS_Age(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Sleep Duration (H)</label>
            <input
              type="text"
              name="Sleep Duration (H):"
              placeholder="Enter value of Height"
              value={SS_Sleep_Duration}
              onChange={(e) => setSS_Sleep_Duration(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Heart Rate (BPS)</label>
            <input
              type="text"
              name="Heart Rate (BPM):"
              placeholder="Enter value of weight"
              value={SS_HeartRate}
              onChange={(e) => setSS_Heart_Rate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Systole</label>
            <input
              type="text"
              name="Systole"
              placeholder="Enter value for Systole"
              value={SS_Systole}
              onChange={(e) => setSS_Systole(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Diastole</label>
            <input
              type="text"
              name="Diastole"
              placeholder="Enter value for Diastole"
              value={SS_Diastole}
              onChange={(e) => setSS_Diastole(e.target.value)}
            />
          </div>
        </>
      );
    }
  };

  return (
    <section className="interactive-form" id="try">
      <span className="vx_eyebrow">Try it</span>
      <h2>Test our AI models</h2>
      <p className="interactive-form_lead">
        Pick a model, enter a few readings and get a prediction from the same models the shoe uses.
      </p>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group select-only">
          <label>Choose Model</label>
          <select name="model" onChange={(e) => setSelectedModel(e.target.value)}>
            <option value="calories">Calories Estimation</option>
            {/* <option value="stress">Stress Level Prediction</option> */}
            {/* <option value="parkinson">parkinson Disease Prediction</option> */}
            <option value="sleepStress">Stress Level and Sleep Quality</option>
          </select>
        </div>
        {renderInputs()}
        <div className="submit-container">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Predicting..." : "Submit"}
          </button>
        </div>
      </form>
      {error && (
        <div className="output-container">
          <div className="output-box output-error" role="alert">
            <p>⚠️ {error}</p>
          </div>
        </div>
      )}
      {prediction !== null && (
        <div className="output-container">
          <div className="output-box">
            {selectedModel === "calories" && <p>🔥 Estimated Calories Burned: {prediction}</p>}
            {selectedModel === "stress" && <p>🧘 Predicted Stress Level: {prediction}</p>}
            {selectedModel === "parkinson" && (
              <p>🧠 Predicted parkinson Disease Risk: {prediction}</p>
            )}
            {selectedModel === "sleepStress" && (
              <>
                <p>💤 Quality of Sleep: {prediction?.sleep}</p>
                <p>🧘 Stress Level: {prediction?.stress}</p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default InteractiveForm;
