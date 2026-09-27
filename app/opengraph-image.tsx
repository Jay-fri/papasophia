import { ImageResponse } from "next/og";

export const alt = "PAPA SOPHIA — Call of Duty Mobile Creator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: "#050505", color: "#f5f5f5", display: "flex", height: "100%", width: "100%", padding: "58px 70px", position: "relative", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "flex", fontSize: 19, letterSpacing: 4, opacity: .7 }}>SIGNAL // ACTIVE</div>
      <div style={{ display: "flex", flexDirection: "column", fontFamily: "Impact, Arial Black, sans-serif", fontSize: 172, lineHeight: .72, letterSpacing: -7 }}>
        <span>PAPA</span><span style={{ marginLeft: 115, color: "transparent", WebkitTextStroke: "2px #f5f5f5" }}>SOPHIA</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #777", paddingTop: 18, fontSize: 18, letterSpacing: 3 }}><span>CALL OF DUTY MOBILE</span><span>LIVE. ACTIVE. UNFILTERED.</span></div>
    </div>,
    { ...size }
  );
}
