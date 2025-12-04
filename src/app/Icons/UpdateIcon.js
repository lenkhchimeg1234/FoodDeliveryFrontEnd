import * as React from "react";
const UpdateIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={44}
    height={44}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M0 22C0 9.85 9.85 0 22 0s22 9.85 22 22-9.85 22-22 22S0 34.15 0 22Z"
    />
    <g clipPath="url(#a)">
      <path
        stroke="#EF4444"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M25.332 16a1.884 1.884 0 1 1 2.667 2.667l-9 9-3.667 1 1-3.667 9-9Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M14 14h16v16H14z" />
      </clipPath>
    </defs>
  </svg>
);
export default UpdateIcon;
