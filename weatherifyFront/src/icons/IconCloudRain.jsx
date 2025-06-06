import React from 'react';
export function IconCloudRain({ size = "20", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
      <line x1="8" y1="19" x2="8" y2="21"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="16" y1="19" x2="16" y2="21"></line>
    </svg>
  );
}