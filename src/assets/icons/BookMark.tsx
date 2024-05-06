export const BookMark = ({ isActive }: { isActive: boolean }) => {
  let color = isActive ? 'rgb(241, 121, 0)' : 'none'
  return (
    <svg
      width="24.000000"
      height="24.000000"
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="clip1_138">
          <rect
            id="bookmark"
            width="24.000000"
            height="24.000000"
            transform="translate(-0.455566 -0.955566)"
            fill="white"
            fillOpacity="0"
          />
        </clipPath>
      </defs>
      <rect
        id="bookmark"
        width="24.000000"
        height="24.000000"
        transform="translate(-0.455566 -0.955566)"
        fill="#FFFFFF"
        fillOpacity="0"
      />
      <g clipPath="url(#clip1_138)">
        <path
          id="Vector"
          d="M11.54 16.04L4.54 20.04L4.54 4.04C4.54 3.51 4.75 3 5.13 2.63C5.5 2.25 6.01 2.04 6.54 2.04L16.54 2.04C17.07 2.04 17.58 2.25 17.95 2.63C18.33 3 18.54 3.51 18.54 4.04L18.54 20.04L11.54 16.04Z"
          stroke="#F17900"
          strokeOpacity="1.000000"
          strokeWidth="2.000000"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
