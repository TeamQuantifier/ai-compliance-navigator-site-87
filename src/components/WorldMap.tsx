import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

// Partner locations with coordinates for SVG positioning
const partnerLocations = [
  { id: 1, name: "Londyn", x: 49.5, y: 35 },
  { id: 2, name: "Paryż", x: 50, y: 37 },
  { id: 3, name: "Berlin", x: 51.5, y: 34 },
  { id: 4, name: "Madryt", x: 48, y: 41 },
  { id: 5, name: "Rzym", x: 51.5, y: 42 },
  { id: 6, name: "Warszawa", x: 53, y: 34 },
  { id: 7, name: "Nowy Jork", x: 25, y: 38 },
  { id: 8, name: "San Francisco", x: 15, y: 40 },
  { id: 9, name: "Chicago", x: 22, y: 37 },
  { id: 10, name: "Mexico City", x: 18, y: 50 },
  { id: 11, name: "São Paulo", x: 32, y: 68 },
  { id: 12, name: "Rio de Janeiro", x: 33, y: 67 }
];

const WorldMap = () => {
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-slate-50 to-slate-100">
      <svg 
        viewBox="0 0 100 60" 
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Minimalist world map outline - simplified continents */}
        <g className="continents" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.15">
          {/* North America */}
          <path d="M 8,25 L 10,20 L 15,18 L 18,15 L 22,15 L 25,18 L 28,20 L 28,28 L 25,35 L 22,38 L 18,40 L 15,42 L 12,42 L 10,38 L 8,35 Z" />
          
          {/* South America */}
          <path d="M 25,45 L 28,42 L 30,45 L 32,50 L 33,58 L 32,65 L 30,68 L 28,70 L 25,68 L 23,65 L 22,58 L 23,50 Z" />
          
          {/* Europe */}
          <path d="M 45,20 L 48,18 L 52,18 L 55,20 L 58,22 L 58,28 L 56,32 L 52,35 L 48,36 L 45,35 L 43,32 L 43,25 Z" />
          
          {/* Africa */}
          <path d="M 45,38 L 48,37 L 52,38 L 55,40 L 57,45 L 58,52 L 57,60 L 54,65 L 50,68 L 46,68 L 43,65 L 42,58 L 43,50 L 44,43 Z" />
          
          {/* Asia */}
          <path d="M 60,18 L 65,15 L 72,15 L 78,18 L 82,22 L 85,28 L 85,35 L 82,40 L 78,43 L 72,45 L 68,45 L 63,42 L 60,38 L 58,32 L 58,25 Z" />
          
          {/* Australia */}
          <path d="M 75,55 L 80,53 L 85,55 L 88,58 L 88,62 L 85,66 L 80,68 L 75,66 L 72,62 L 72,58 Z" />
        </g>

        {/* Grid lines for a subtle technical feel */}
        <g className="grid" stroke="#e2e8f0" strokeWidth="0.08" opacity="0.3">
          <line x1="0" y1="20" x2="100" y2="20" />
          <line x1="0" y1="40" x2="100" y2="40" />
          <line x1="25" y1="0" x2="25" y2="60" />
          <line x1="50" y1="0" x2="50" y2="60" />
          <line x1="75" y1="0" x2="75" y2="60" />
        </g>

        {/* Partner location markers */}
        {partnerLocations.map((location) => (
          <g key={location.id}>
            {/* Pulsing circle background */}
            <circle
              cx={location.x}
              cy={location.y}
              r="1.2"
              className="fill-innovation-600/20 animate-pulse"
            />
            
            {/* Main pin */}
            <circle
              cx={location.x}
              cy={location.y}
              r="0.6"
              className="fill-innovation-600 cursor-pointer transition-all hover:r-0.8"
              onMouseEnter={() => setHoveredLocation(location.id)}
              onMouseLeave={() => setHoveredLocation(null)}
            />
            
            {/* Tooltip */}
            {hoveredLocation === location.id && (
              <g>
                <rect
                  x={location.x - 3}
                  y={location.y - 3.5}
                  width="6"
                  height="1.8"
                  rx="0.3"
                  className="fill-slate-900"
                />
                <text
                  x={location.x}
                  y={location.y - 2.2}
                  textAnchor="middle"
                  className="fill-white text-[0.8px] font-medium"
                  style={{ fontSize: '0.8px' }}
                >
                  {location.name}
                </text>
              </g>
            )}
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md text-xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-innovation-600 animate-pulse" />
          <span className="text-slate-800 font-medium">Lokalizacje partnerów</span>
        </div>
        <div className="text-slate-600 text-[10px]">
          {partnerLocations.length} miast na 3 kontynentach
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
