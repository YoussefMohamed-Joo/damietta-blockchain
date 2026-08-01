"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function FloatingPathsBackground({
  position,
  children,
  className,
  colorClass = "text-[#2b2b2b]",
}: {
  position: number;
  className?: string;
  children: React.ReactNode;
  colorClass?: string;
}) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className={cn("w-full relative", className)}>
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className={`w-full h-full ${colorClass}`}
          viewBox="0 0 696 316"
          fill="none"
        >
          {paths.map((path) => (
            <path
              key={path.id}
              d={path.d}
              pathLength={1}
              stroke="currentColor"
              strokeWidth={path.width}
              strokeOpacity={0.1 + path.id * 0.03}
              className="fp-path"
              style={{
                animationDuration: `${20 + Math.random() * 10}s`,
                animationDelay: `${-Math.random() * 30}s`,
              }}
            />
          ))}
        </svg>
      </div>
      {children}
    </div>
  );
}
