import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const company = searchParams.get("company") || "Company";
  const award = searchParams.get("award") || "AWARD";
  const year = searchParams.get("year") || "2025";
  const bg = searchParams.get("bg") || "1e293b";
  const accent = searchParams.get("accent") || "1e3a8a";
  const text = searchParams.get("text") || "ffffff";

  const width = 300;
  const height = 350;

  // Create SVG badge
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .hexagon { fill: #f3f4f6; }
          .company-text { font-size: 18px; font-weight: bold; fill: #${accent}; text-anchor: middle; }
          .award-text { font-size: 16px; font-weight: bold; fill: #${text}; text-anchor: middle; }
          .year-text { font-size: 16px; font-weight: bold; fill: #${accent}; text-anchor: middle; }
        </style>
      </defs>
      
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="#${bg}"/>
      
      <!-- Hexagon outer border -->
      <polygon points="150,20 220,55 220,125 150,160 80,125 80,55" fill="none" stroke="#000000" stroke-width="3"/>
      
      <!-- Hexagon accent border -->
      <polygon points="150,25 215,57 215,123 150,155 85,123 85,57" fill="none" stroke="#${accent}" stroke-width="2"/>
      
      <!-- Hexagon light border -->
      <polygon points="150,30 210,59 210,121 150,150 90,121 90,59" fill="none" stroke="#e5e7eb" stroke-width="2"/>
      
      <!-- Hexagon fill -->
      <polygon points="150,35 205,61 205,119 150,145 95,119 95,61" class="hexagon"/>
      
      <!-- Company name -->
      <text x="150" y="85" class="company-text">${company}</text>
      
      <!-- Ribbon -->
      <rect x="50" y="130" width="200" height="40" fill="#${accent}" stroke="#ffffff" stroke-width="2"/>
      <polygon points="30,130 50,130 60,150 30,150" fill="#${accent}"/>
      <polygon points="270,130 250,130 240,150 270,150" fill="#${accent}"/>
      
      <!-- Award text -->
      <text x="150" y="150" class="award-text">${award}</text>
      
      <!-- Year -->
      <text x="150" y="240" class="year-text">${year}</text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
