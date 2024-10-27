import React from 'react';

interface SemiCircleProgressProps {
  percentage: number;
}

const SemiCircleProgress = ({ percentage }: SemiCircleProgressProps) => {
  // Calculate the circumference and the stroke offset based on the percentage
  const radius = 30;
  const circumference = Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const color = '#0099d6';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="relative"
    >
      <svg width="100" height="60" viewBox="0 0 100 60">
        {/* Background semi-circle */}
        <path
          d="M15 50 A35 35 0 1 1 85 50"
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="8"
        />
        {/* Progress semi-circle with dynamic color */}
        <path
          d="M15 50 A35 35 0 1 1 85 50"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          fontSize: '1em',
          fontWeight: 'bold',
          marginTop: '1.5em',
        }}
        className="text-text-100"
      >
        {percentage}%
      </div>
    </div>
  );
};

export default SemiCircleProgress;
