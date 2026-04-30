import { useState } from "react";

const INDUSTRIES = [
  { id: "equipment_rental", label: "Equipment Rental", icon: "🏗️", avg: "$550" },
  { id: "hvac", label: "HVAC / Commercial", icon: "❄️", avg: "$650" },
  { id: "generators", label: "Generator Dealers", icon: "⚡", avg: "$850" },
  { id: "machine_shops", label: "Machine Shops", icon: "⚙️", avg: "$900" },
  { id: "contractors", label: "General Contractors", icon: "🔨", avg: "$400" },
  { id: "industrial", label: "Industrial Distributors", icon: "🏭", avg: "$500" },
  { id: "brokers", label: "Freight Brokers", icon: "📋", avg: "$225" },
];

const TERRITORIES = [
  { id: "north_attleboro", label: "North Attleboro / Corridor" },
  { id: "boston_metro", label: "Boston Metro" },
  { id: "providence_metro", label: "Providence Metro" },
  { id: "south_shore", label: "South Shore MA" },
  { id: "all", label: "All Territories" },
];

const STAGES = ["NEW", "CONTACTED", "QUALIFIED", "CLOSED"];
const STAGE_COLORS = {
  NEW: "#00D4FF",
  CONTACTED: "#F5A623",
  QUALIFIED: "#A78BFA",
  CLOSED: "#22C55E",
};

// FIX: use response.json() directly; model corrected for the artifact sandbox;
// only Content-Type header (API key is injected automatically).
async function callClaude(prompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      (data.error && data.error.message) || "API error " + res.status
    );
  }

  if (data.error) {
    throw new Error(data.error.message || JSON.stringify(data.error));
  }

  return (data.content && data.content[0] && data.content[0].text) || "";
}

export default function EmpireLeadsPro() {
  const [industry, setIndustry] = useState("equipment_rental");
  const [territory, setTerritory] = useState("north_attleboro");
  const [count, setCount] = useState("5");
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [leadStages, setLeadStages] = useState({});
  const [expandedLead, setExpandedLead] = useState(null);
  const [scriptLead, setScriptLead] = useState(null);
  const [script, setScript] = useState("");
  const [scriptLoading, setScriptLoading] = useState(false);
  const [totalGenerated, setTotalGenerated] = useState(0);
  const [pipelineValue, setPipelineValue] = useState(0);

  const generateLeads = async () => {
    setLoading(true);
    setError("");

    const industryLabel =
      INDUSTRIES.find((i) => i.id === industry)?.label || industry;
    const territoryLabel =
      TERRITORIES.find((t) => t.id === territory)?.label || territory;

    const prompt =
      "Generate " +
      count +
      " B2B leads for Empire Logistics, a CDL Class A flatbed hotshot trucking company in North Attleboro MA serving the Boston and Providence RI corridor. Hauls HVAC units, generators, CNC machines, skid steers, steel, building materials. Owner has construction background. Same-day regional service. Does NOT do hazmat, OTR, residential, or household moves. Ideal leads: companies with 5-200 employees in MA/RI that move heavy industrial freight and have no in-house fleet." +
      " Industry: " +
      industryLabel +
      ". Territory: " +
      territoryLabel +
      ". Return ONLY a JSON array starting with [ and ending with ]. Each object must have exactly these keys: company, address, contact_name, contact_title, phone, email, why_fit, outreach, priority (HIGH/MEDIUM/LOW), monthly_loads (number as string e.g. '8-12'), revenue_potential (dollar amount string e.g. '$4,800/mo'), key_insight.";

    try {
      const raw = await callClaude(prompt);
      const match = raw.match(/\[[\s\S]*\]/);
      if (!match)
        throw new Error("No JSON array in response. Got: " + raw.slice(0, 200));
      const parsed = JSON.parse(match[0]);
      if (!Array.isArray(parsed) || !parsed.length)
        throw new Error("Empty or invalid array");
      const withIds = parsed.map((l, i) => ({ ...l, id: Date.now() + i }));
      setLeads(withIds);
      setTotalGenerated((prev) => prev + withIds.length);
      const stages = {};
      withIds.forEach((l) => {
        stages[l.id] = "NEW";
      });
      setLeadStages((prev) => ({ ...prev, ...stages }));
      // rough pipeline value calc
      const total = withIds.reduce((acc, l) => {
        const num = parseInt((l.revenue_potential || "").replace(/\D/g, ""), 10);
        return acc + (isNaN(num) ? 0 : num);
      }, 0);
      setPipelineValue((prev) => prev + total);
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setLoading(false);
    }
  };

  const generateScript = async (lead) => {
    setScript("");
    setScriptLoading(true);
    const prompt =
      "Write a cold call script under 100 words for Empire Logistics approaching " +
      lead.contact_name +
      " at " +
      lead.company +
      ". Empire Logistics is a flatbed hotshot carrier in North Attleboro MA. Direct, trades-friendly tone. Mention same-day service and ability to move heavy freight fast.";
    try {
      const text = await callClaude(prompt);
      setScript(text || "No script returned.");
    } catch (e) {
      setScript("Error: " + String(e.message || e));
    } finally {
      setScriptLoading(false);
    }
  };

  const pc = (p) =>
    p === "HIGH" ? "#F5A623" : p === "MEDIUM" ? "#00D4FF" : "#64748B";

  const fmtValue = (v) =>
    v >= 1000000
      ? "$" + (v / 1000000).toFixed(1) + "M"
      : v >= 1000
      ? "$" + Math.round(v / 1000) + "K"
      : "$" + v;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060912",
        fontFamily: "'IBM Plex Mono','Courier New',monospace",
        color: "#C8D6E5",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&family=Bebas+Neue&display=swap');
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        button { font-family: 'IBM Plex Mono','Courier New',monospace; }
      `}</style>

      {/* Header */}
      <div
        style={{
          background: "#080C14",
          borderBottom: "1px solid #1A2744",
          padding: "18px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "30px",
                letterSpacing: "6px",
                color: "#FFF",
              }}
            >
              EMPIRE LOGISTICS
            </div>
            <div
              style={{ fontSize: "9px", letterSpacing: "4px", color: "#F5A623" }}
            >
              LEAD PROCUREMENT ENGINE
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "28px",
              fontSize: "11px",
              color: "#4A6080",
            }}
          >
            <span>
              LEADS:{" "}
              <span style={{ color: "#F5A623" }}>{totalGenerated}</span>
            </span>
            {pipelineValue > 0 && (
              <span>
                PIPELINE:{" "}
                <span style={{ color: "#22C55E" }}>
                  {fmtValue(pipelineValue)}/mo
                </span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "24px",
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "20px",
          alignItems: "start",
        }}
      >
        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Industry */}
          <div
            style={{
              background: "#0A0F1E",
              border: "1px solid #1A2744",
              padding: "16px",
            }}
          >
            <div
              style={{
                fontSize: "8px",
                letterSpacing: "3px",
                color: "#4A6080",
                marginBottom: "10px",
              }}
            >
              INDUSTRY
            </div>
            {INDUSTRIES.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setIndustry(ind.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 10px",
                  marginBottom: "4px",
                  background:
                    industry === ind.id
                      ? "rgba(245,166,35,0.1)"
                      : "transparent",
                  border:
                    "1px solid " +
                    (industry === ind.id ? "#F5A623" : "#1A2744"),
                  color: industry === ind.id ? "#F5A623" : "#6B7C93",
                  cursor: "pointer",
                  fontSize: "10px",
                  textAlign: "left",
                }}
              >
                <span>
                  {ind.icon} {ind.label}
                </span>
                <span style={{ opacity: 0.5, fontSize: "9px" }}>{ind.avg}</span>
              </button>
            ))}
          </div>

          {/* Territory */}
          <div
            style={{
              background: "#0A0F1E",
              border: "1px solid #1A2744",
              padding: "16px",
            }}
          >
            <div
              style={{
                fontSize: "8px",
                letterSpacing: "3px",
                color: "#4A6080",
                marginBottom: "10px",
              }}
            >
              TERRITORY
            </div>
            {TERRITORIES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTerritory(t.id)}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  marginBottom: "4px",
                  background:
                    territory === t.id
                      ? "rgba(0,212,255,0.08)"
                      : "transparent",
                  border:
                    "1px solid " +
                    (territory === t.id ? "#00D4FF" : "#1A2744"),
                  color: territory === t.id ? "#00D4FF" : "#6B7C93",
                  cursor: "pointer",
                  fontSize: "10px",
                  textAlign: "left",
                }}
              >
                {territory === t.id ? "▶ " : "  "}
                {t.label}
              </button>
            ))}
          </div>

          {/* Lead count */}
          <div
            style={{
              background: "#0A0F1E",
              border: "1px solid #1A2744",
              padding: "16px",
            }}
          >
            <div
              style={{
                fontSize: "8px",
                letterSpacing: "3px",
                color: "#4A6080",
                marginBottom: "10px",
              }}
            >
              LEAD COUNT
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {["5", "10", "15"].map((n) => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  style={{
                    flex: 1,
                    padding: "12px 0",
                    background: count === n ? "#F5A623" : "#0D1526",
                    color: count === n ? "#000" : "#6B7C93",
                    border: count === n ? "none" : "1px solid #1A2744",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "900",
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={generateLeads}
            disabled={loading}
            style={{
              width: "100%",
              padding: "18px",
              background: loading
                ? "#0A0F1E"
                : "linear-gradient(135deg,#F5A623,#E8941A)",
              color: loading ? "#4A6080" : "#000",
              border: loading ? "1px solid #1A2744" : "none",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "20px",
              letterSpacing: "3px",
            }}
          >
            {loading ? (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    animation: "spin 1s linear infinite",
                  }}
                >
                  ◎
                </span>{" "}
                SCANNING...
              </span>
            ) : (
              "▶ GENERATE LEADS"
            )}
          </button>

          {/* Error */}
          {error && (
            <div
              style={{
                background: "#0F0508",
                border: "1px solid #7F1D1D",
                padding: "14px",
              }}
            >
              <div
                style={{
                  color: "#FCA5A5",
                  fontSize: "11px",
                  wordBreak: "break-word",
                }}
              >
                ✗ {error}
              </div>
            </div>
          )}
        </div>

        {/* Lead list */}
        <div>
          {/* Skeleton loading */}
          {loading && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    background: "#0A0F1E",
                    border: "1px solid #111827",
                    padding: "24px",
                    animation: "pulse 1.5s infinite",
                    animationDelay: i * 0.15 + "s",
                  }}
                >
                  <div
                    style={{
                      height: "14px",
                      background: "#111827",
                      width: "55%",
                      marginBottom: "10px",
                    }}
                  />
                  <div
                    style={{
                      height: "10px",
                      background: "#111827",
                      width: "35%",
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Leads */}
          {!loading && leads.length > 0 && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <div
                style={{
                  fontSize: "9px",
                  letterSpacing: "3px",
                  color: "#F5A623",
                  marginBottom: "14px",
                }}
              >
                {leads.length} LEADS ·{" "}
                {leads.filter((l) => l.priority === "HIGH").length} HIGH ·{" "}
                {leads.filter((l) => l.priority === "MEDIUM").length} MED
              </div>

              {leads.map((lead) => {
                const stage = leadStages[lead.id] || "NEW";
                const expanded = expandedLead === lead.id;
                return (
                  <div
                    key={lead.id}
                    style={{
                      background: "#0A0F1E",
                      border: "1px solid #1A2744",
                      borderLeft: "4px solid " + pc(lead.priority),
                      marginBottom: "10px",
                    }}
                  >
                    {/* Card header */}
                    <div
                      style={{ padding: "16px 18px", cursor: "pointer" }}
                      onClick={() =>
                        setExpandedLead(expanded ? null : lead.id)
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "8px",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontFamily: "'Bebas Neue',sans-serif",
                              fontSize: "17px",
                              letterSpacing: "2px",
                              color: "#FFF",
                            }}
                          >
                            {lead.company}
                          </div>
                          <div style={{ fontSize: "10px", color: "#4A6080" }}>
                            {lead.address}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                            flexShrink: 0,
                          }}
                        >
                          <span
                            style={{
                              padding: "3px 8px",
                              border: "1px solid " + pc(lead.priority),
                              color: pc(lead.priority),
                              fontSize: "8px",
                              letterSpacing: "2px",
                            }}
                          >
                            {lead.priority}
                          </span>
                          <span
                            style={{
                              fontSize: "10px",
                              color: "#22C55E",
                              fontWeight: "700",
                            }}
                          >
                            {lead.revenue_potential}
                          </span>
                          <span style={{ color: "#4A6080", fontSize: "11px" }}>
                            {expanded ? "▲" : "▼"}
                          </span>
                        </div>
                      </div>
                      <div style={{ fontSize: "11px", color: "#C8D6E5" }}>
                        {lead.contact_name}{" "}
                        <span style={{ color: "#4A6080" }}>
                          · {lead.contact_title}
                        </span>
                        <span
                          style={{ color: "#F5A623", marginLeft: "16px" }}
                        >
                          {lead.monthly_loads} loads/mo
                        </span>
                      </div>
                    </div>

                    {/* Expanded content */}
                    {expanded && (
                      <div
                        style={{
                          borderTop: "1px solid #111827",
                          padding: "16px",
                        }}
                      >
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "10px",
                            marginBottom: "12px",
                          }}
                        >
                          <div
                            style={{
                              background: "#060912",
                              border: "1px solid #111827",
                              padding: "10px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "8px",
                                color: "#4A6080",
                                letterSpacing: "2px",
                                marginBottom: "4px",
                              }}
                            >
                              CONTACT
                            </div>
                            <div
                              style={{ fontSize: "11px", color: "#00D4FF" }}
                            >
                              {lead.phone}
                            </div>
                            <div
                              style={{ fontSize: "11px", color: "#00D4FF" }}
                            >
                              {lead.email}
                            </div>
                          </div>
                          <div
                            style={{
                              background: "#060912",
                              border: "1px solid #111827",
                              padding: "10px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "8px",
                                color: "#4A6080",
                                letterSpacing: "2px",
                                marginBottom: "4px",
                              }}
                            >
                              OUTREACH
                            </div>
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#F5A623",
                                fontWeight: "700",
                              }}
                            >
                              {lead.outreach}
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            background: "#060912",
                            border: "1px solid #111827",
                            padding: "12px",
                            marginBottom: "12px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "8px",
                              color: "#4A6080",
                              letterSpacing: "2px",
                              marginBottom: "6px",
                            }}
                          >
                            WHY THEY FIT
                          </div>
                          <div
                            style={{
                              fontSize: "11px",
                              color: "#94A3B8",
                              lineHeight: "1.7",
                            }}
                          >
                            {lead.why_fit}
                          </div>
                        </div>

                        {lead.key_insight && (
                          <div
                            style={{
                              background: "rgba(245,166,35,0.05)",
                              border: "1px solid rgba(245,166,35,0.2)",
                              padding: "12px",
                              marginBottom: "12px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "8px",
                                color: "#F5A623",
                                letterSpacing: "2px",
                                marginBottom: "4px",
                              }}
                            >
                              ⚡ KEY INSIGHT
                            </div>
                            <div
                              style={{
                                fontSize: "11px",
                                color: "#C8A96E",
                                lineHeight: "1.6",
                              }}
                            >
                              {lead.key_insight}
                            </div>
                          </div>
                        )}

                        {/* Pipeline stage */}
                        <div style={{ marginBottom: "12px" }}>
                          <div
                            style={{
                              fontSize: "8px",
                              color: "#4A6080",
                              letterSpacing: "2px",
                              marginBottom: "6px",
                            }}
                          >
                            PIPELINE STAGE
                          </div>
                          <div style={{ display: "flex", gap: "6px" }}>
                            {STAGES.map((s) => (
                              <button
                                key={s}
                                onClick={() =>
                                  setLeadStages((prev) => ({
                                    ...prev,
                                    [lead.id]: s,
                                  }))
                                }
                                style={{
                                  flex: 1,
                                  padding: "7px 4px",
                                  fontSize: "8px",
                                  letterSpacing: "1px",
                                  background:
                                    stage === s
                                      ? STAGE_COLORS[s]
                                      : "transparent",
                                  color: stage === s ? "#000" : "#4A6080",
                                  border:
                                    "1px solid " +
                                    (stage === s
                                      ? STAGE_COLORS[s]
                                      : "#1A2744"),
                                  cursor: "pointer",
                                  fontWeight: "700",
                                }}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setScriptLead(lead);
                            generateScript(lead);
                          }}
                          style={{
                            width: "100%",
                            padding: "11px",
                            background: "transparent",
                            border: "1px solid #F5A623",
                            color: "#F5A623",
                            fontSize: "11px",
                            letterSpacing: "3px",
                            cursor: "pointer",
                            fontWeight: "700",
                          }}
                        >
                          ▶ GENERATE OUTREACH SCRIPT
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty state */}
          {!loading && leads.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "80px 32px",
                color: "#1A2744",
                border: "1px dashed #111827",
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "42px",
                  letterSpacing: "4px",
                  marginBottom: "10px",
                }}
              >
                READY
              </div>
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "3px",
                  color: "#2D3F55",
                }}
              >
                SELECT PARAMETERS AND GENERATE LEADS
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Script modal */}
      {scriptLead && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.88)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#0A0F1E",
              border: "1px solid #F5A623",
              maxWidth: "560px",
              width: "100%",
              maxHeight: "80vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid #1A2744",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: "18px",
                    letterSpacing: "3px",
                    color: "#F5A623",
                  }}
                >
                  OUTREACH SCRIPT
                </div>
                <div style={{ fontSize: "10px", color: "#4A6080" }}>
                  {scriptLead.company} · {scriptLead.contact_name}
                </div>
              </div>
              <button
                onClick={() => {
                  setScriptLead(null);
                  setScript("");
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#4A6080",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <div
              style={{ padding: "20px", overflowY: "auto", flex: 1 }}
            >
              {scriptLoading ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "32px",
                    color: "#4A6080",
                  }}
                >
                  <div
                    style={{
                      animation: "spin 1s linear infinite",
                      fontSize: "24px",
                      marginBottom: "10px",
                    }}
                  >
                    ◎
                  </div>
                  WRITING...
                </div>
              ) : (
                <div
                  style={{
                    fontSize: "13px",
                    color: "#C8D6E5",
                    lineHeight: "2",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {script}
                </div>
              )}
            </div>

            {script && (
              <div
                style={{
                  padding: "14px 20px",
                  borderTop: "1px solid #1A2744",
                }}
              >
                <button
                  onClick={() =>
                    navigator.clipboard && navigator.clipboard.writeText(script)
                  }
                  style={{
                    padding: "10px 20px",
                    background: "#F5A623",
                    color: "#000",
                    border: "none",
                    fontSize: "11px",
                    letterSpacing: "2px",
                    cursor: "pointer",
                    fontWeight: "700",
                  }}
                >
                  COPY SCRIPT
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
