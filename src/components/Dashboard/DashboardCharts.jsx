import React, { useContext, useMemo } from "react";
import { Icon } from "@iconify/react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { shoesStore } from "../../Store/contextAPI.js";
import "./DashboardCharts.css";

// What the smart shoe publishes to each ThingSpeak field.
const FIELDS = {
  acceleration: {
    field: "field1",
    label: "Acceleration",
    unit: "m/s²",
    digits: 2,
    icon: "mdi:axis-arrow",
  },
  gyroscope: {
    field: "field2",
    label: "Rotation",
    unit: "rad/s",
    digits: 3,
    icon: "mdi:rotate-3d-variant",
  },
  steps: { field: "field3", label: "Steps", unit: "", digits: 0, icon: "mdi:shoe-print" },
  fall: {
    field: "field4",
    label: "Fall detection",
    unit: "",
    digits: 0,
    icon: "mdi:human-handsdown",
  },
  heartRate: {
    field: "field5",
    label: "Heart rate",
    unit: "bpm",
    digits: 0,
    icon: "mdi:heart-pulse",
    zeroIsNoSignal: true,
  },
  spo2: {
    field: "field6",
    label: "Blood oxygen",
    unit: "%",
    digits: 0,
    icon: "mdi:water-percent",
    zeroIsNoSignal: true,
  },
  humidity: { field: "field7", label: "Humidity", unit: "%", digits: 1, icon: "mdi:water-outline" },
  temperature: {
    field: "field8",
    label: "Temperature",
    unit: "°C",
    digits: 1,
    icon: "mdi:thermometer",
  },
};

const CARD_ORDER = [
  "heartRate",
  "spo2",
  "temperature",
  "humidity",
  "steps",
  "fall",
  "acceleration",
  "gyroscope",
];

const COLORS = {
  acceleration: "#307bc4",
  gyroscope: "#8b5cf6",
  temperature: "#f97316",
  humidity: "#0ea5e9",
  heartRate: "#e11d48",
  spo2: "#14b8a6",
};

const toNumber = (value) => {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : null;
};

const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

const formatStamp = (iso) =>
  new Date(iso).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });

function readingText(key, value) {
  const meta = FIELDS[key];
  if (value === null) return { text: "—", note: "No data" };
  if (key === "fall") {
    return value > 0 ? { text: "Fall detected", alert: true } : { text: "No falls", ok: true };
  }
  if (meta.zeroIsNoSignal && value === 0) return { text: "—", note: "No signal" };
  return { text: value.toFixed(meta.digits), unit: meta.unit };
}

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="vx_dash_chart vx_card">
      <div className="vx_dash_chart_head">
        <h3>{title}</h3>
        {subtitle && <span>{subtitle}</span>}
      </div>
      <div className="vx_dash_chart_body">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const axisProps = { tick: { fill: "#6b7d90", fontSize: 12 }, tickLine: false, axisLine: false };
const gridProps = { stroke: "rgba(39, 71, 96, 0.08)", vertical: false };
const tooltipProps = {
  contentStyle: {
    borderRadius: 12,
    border: "1px solid rgba(39,71,96,0.12)",
    boxShadow: "0 10px 30px rgba(30,47,69,0.12)",
  },
  labelStyle: { color: "#1e2f45", fontWeight: 600 },
};

const DashboardCharts = () => {
  const { thingSpeakData, thingSpeakError, thingSpeakLoading, refreshThingSpeak } =
    useContext(shoesStore);

  // oldest -> newest, one object per reading with every field parsed
  const series = useMemo(() => {
    const feeds = thingSpeakData?.feeds ?? [];
    return [...feeds]
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      .map((feed) => {
        const row = { id: feed.entry_id, at: feed.created_at, time: formatTime(feed.created_at) };
        Object.entries(FIELDS).forEach(([key, { field }]) => (row[key] = toNumber(feed[field])));
        return row;
      });
  }, [thingSpeakData]);

  const latest = series[series.length - 1];
  const hoursOld = latest ? (Date.now() - new Date(latest.at)) / 36e5 : 0;

  if (thingSpeakError) {
    return (
      <section className="vx_dash">
        <div className="container">
          <div className="vx_dash_state vx_card">
            <Icon icon="mdi:access-point-network-off" />
            <h3>Couldn't load sensor data</h3>
            <p>{thingSpeakError}</p>
            <button type="button" className="vx_btn vx_btn_primary" onClick={refreshThingSpeak}>
              Try again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!latest) {
    return (
      <section className="vx_dash">
        <div className="container">
          <div className="vx_dash_state vx_card">
            <span className="vx_dash_spinner" aria-hidden="true" />
            <p>{thingSpeakLoading ? "Loading sensor readings…" : "No readings published yet."}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="vx_dash">
      <div className="container">
        {/* status bar */}
        <div className="vx_dash_status vx_card">
          <div className="vx_dash_status_main">
            <span className={`vx_dash_dot ${hoursOld < 1 ? "is-live" : ""}`} aria-hidden="true" />
            <div>
              <strong>{hoursOld < 1 ? "Live" : "Latest recorded session"}</strong>
              <span>
                Last reading {formatStamp(latest.at)} · {series.length} readings ·{" "}
                {thingSpeakData.channel?.name || "ThingSpeak"} channel
              </span>
            </div>
          </div>
          <button
            type="button"
            className="vx_btn vx_btn_ghost vx_dash_refresh"
            onClick={refreshThingSpeak}
            disabled={thingSpeakLoading}
          >
            <Icon icon="mdi:refresh" className={thingSpeakLoading ? "is-spinning" : ""} />
            {thingSpeakLoading ? "Refreshing" : "Refresh"}
          </button>
        </div>

        {/* latest values */}
        <div className="vx_dash_cards">
          {CARD_ORDER.map((key) => {
            const meta = FIELDS[key];
            const reading = readingText(key, latest[key]);
            return (
              <div
                key={key}
                className={`vx_dash_kpi vx_card ${reading.alert ? "is-alert" : ""} ${reading.ok ? "is-ok" : ""}`}
              >
                <span className="vx_dash_kpi_icon">
                  <Icon icon={meta.icon} />
                </span>
                <span className="vx_dash_kpi_label">{meta.label}</span>
                <span className="vx_dash_kpi_value">
                  {reading.text}
                  {reading.unit && <small>{reading.unit}</small>}
                </span>
                {reading.note && <span className="vx_dash_kpi_note">{reading.note}</span>}
              </div>
            );
          })}
        </div>

        {/* trends */}
        <div className="vx_dash_charts">
          <ChartCard title="Acceleration" subtitle="m/s² · total magnitude">
            <AreaChart data={series} margin={{ top: 10, right: 12, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="fillAccel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.acceleration} stopOpacity={0.28} />
                  <stop offset="100%" stopColor={COLORS.acceleration} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="time" {...axisProps} minTickGap={28} />
              <YAxis {...axisProps} domain={["auto", "auto"]} />
              <Tooltip {...tooltipProps} formatter={(v) => [`${v} m/s²`, "Acceleration"]} />
              <Area
                type="monotone"
                dataKey="acceleration"
                stroke={COLORS.acceleration}
                strokeWidth={2}
                fill="url(#fillAccel)"
              />
            </AreaChart>
          </ChartCard>

          <ChartCard title="Rotation" subtitle="rad/s · gyroscope">
            <AreaChart data={series} margin={{ top: 10, right: 12, left: -6, bottom: 0 }}>
              <defs>
                <linearGradient id="fillGyro" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.gyroscope} stopOpacity={0.28} />
                  <stop offset="100%" stopColor={COLORS.gyroscope} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="time" {...axisProps} minTickGap={28} />
              <YAxis {...axisProps} domain={["auto", "auto"]} />
              <Tooltip {...tooltipProps} formatter={(v) => [`${v} rad/s`, "Rotation"]} />
              <Area
                type="monotone"
                dataKey="gyroscope"
                stroke={COLORS.gyroscope}
                strokeWidth={2}
                fill="url(#fillGyro)"
              />
            </AreaChart>
          </ChartCard>

          <ChartCard title="Temperature & humidity" subtitle="°C · %">
            <LineChart data={series} margin={{ top: 10, right: 0, left: -12, bottom: 0 }}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="time" {...axisProps} minTickGap={28} />
              <YAxis yAxisId="t" {...axisProps} domain={["auto", "auto"]} />
              <YAxis yAxisId="h" orientation="right" {...axisProps} domain={["auto", "auto"]} />
              <Tooltip {...tooltipProps} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 13 }} />
              <Line
                yAxisId="t"
                type="monotone"
                dataKey="temperature"
                name="Temperature (°C)"
                stroke={COLORS.temperature}
                strokeWidth={2}
                dot={false}
              />
              <Line
                yAxisId="h"
                type="monotone"
                dataKey="humidity"
                name="Humidity (%)"
                stroke={COLORS.humidity}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartCard>

          <ChartCard title="Heart rate & SpO₂" subtitle="bpm · %">
            <LineChart data={series} margin={{ top: 10, right: 12, left: -12, bottom: 0 }}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="time" {...axisProps} minTickGap={28} />
              <YAxis {...axisProps} domain={[0, "auto"]} />
              <Tooltip {...tooltipProps} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 13 }} />
              <Line
                type="monotone"
                dataKey="heartRate"
                name="Heart rate (bpm)"
                stroke={COLORS.heartRate}
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="spo2"
                name="SpO₂ (%)"
                stroke={COLORS.spo2}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartCard>
        </div>

        {/* raw readings */}
        <div className="vx_dash_table vx_card">
          <div className="vx_dash_chart_head">
            <h3>Recent readings</h3>
            <span>Newest first</span>
          </div>
          <div className="vx_dash_table_scroll">
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>#</th>
                  {CARD_ORDER.map((key) => (
                    <th key={key}>
                      {FIELDS[key].label}
                      {FIELDS[key].unit && <small> ({FIELDS[key].unit})</small>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...series]
                  .reverse()
                  .slice(0, 10)
                  .map((row) => (
                    <tr key={row.id}>
                      <td>{row.time}</td>
                      <td>{row.id}</td>
                      {CARD_ORDER.map((key) => (
                        <td key={key}>
                          {row[key] === null
                            ? "—"
                            : key === "fall"
                              ? row[key] > 0
                                ? "Fall"
                                : "—"
                              : row[key].toFixed(FIELDS[key].digits)}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardCharts;
