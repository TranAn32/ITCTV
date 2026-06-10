import React from 'react';

interface ItcLogoProps {
  className?: string;
  size?: number | string; // width and height of the SVG
  showText?: boolean;
  textColor?: string;
  subTextColor?: string;
}

export default function ItcLogo({ 
  className = '', 
  size = 44, 
  showText = false, 
  textColor = 'text-slate-900',
  subTextColor = 'text-slate-500'
}: ItcLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`} id="itc-brand-logo-wrapper">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        id="itc-logo-svg"
      >
        <defs>
          {/* Sphere Radial Metallic Gradient */}
          <radialGradient id="sphereGrad" cx="32%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="28%" stopColor="#E2E8F0" />
            <stop offset="65%" stopColor="#94A3B8" />
            <stop offset="90%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1E293B" />
          </radialGradient>

          {/* Rear Ring Gradient - Deep Royal to Indigo */}
          <linearGradient id="ringBackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>

          {/* Front Ring Gradient - Bright Cyan to Electric Royal Blue for gloss effect */}
          <linearGradient id="ringFrontGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1C3D82" />
            <stop offset="35%" stopColor="#2563EB" />
            <stop offset="65%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Floating Technology Cubes Gradients */}
          <linearGradient id="cubeGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          <linearGradient id="cubeGradSecondary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>

          <linearGradient id="cubeGradAccent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>

          {/* Sphere Drop Shadow */}
          <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="1" dy="3" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* 1. REAR ARC OF SWOOSH RING (Behind the sphere) */}
        <path 
          d="M 17,44 C 21,29 41,20 63,24 C 75,26 81,32 83,38" 
          stroke="url(#ringBackGrad)" 
          strokeWidth="7.2" 
          strokeLinecap="round" 
          fill="none" 
        />

        {/* 2. CENTRAL 3D METALLIC SILVER SPHERE */}
        <circle 
          cx="51" 
          cy="48" 
          r="21.5" 
          fill="url(#sphereGrad)" 
          filter="url(#softShadow)" 
        />

        {/* 3. FRONT ARC OF SWOOSH RING (In front of the sphere, completes Orbit) */}
        <path 
          d="M 83,38 C 85,46 76,61 54,69 C 30,78 15,70 13,58 C 12,51 14,46 17,44" 
          stroke="url(#ringFrontGrad)" 
          strokeWidth="7.2" 
          strokeLinecap="round" 
          fill="none" 
        />

        {/* 4. FLOATING TECHNOLOGY CUBES (In the top-right area, matching reference) */}
        <rect x="68" y="24" width="8.5" height="8.5" fill="url(#cubeGradPrimary)" rx="1.5" />
        <rect x="74" y="15" width="6" height="6" fill="url(#cubeGradSecondary)" rx="1.2" />
        <rect x="80" y="10" width="4.5" height="4.5" fill="url(#cubeGradAccent)" rx="1" />
        <rect x="70" y="10" width="3.5" height="3.5" fill="url(#cubeGradPrimary)" rx="0.8" />
      </svg>

      {/* 5. TEXT LABELS (Optional, matches header/footer branding) */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-display text-xl font-extrabold tracking-tight ${textColor}`}>
              ITC
            </span>
          </div>
          <span className={`text-[9px] font-bold tracking-widest uppercase mt-0.5 ${subTextColor}`}>
            Technology Consulting
          </span>
        </div>
      )}
    </div>
  );
}
