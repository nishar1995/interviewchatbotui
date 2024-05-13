export default function TwitterIcon({
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <g clipPath="url(#a)">
        <path
          fill="#000"
          d="M14.23 10.16 22.98 0H20.9l-7.59 8.82L7.25 0h-7l9.18 13.34L.26 24h2.07l8.02-9.32 6.4 9.32h7l-9.52-13.84Zm-2.83 3.3-.93-1.33-7.4-10.57h3.19l5.96 8.53.93 1.33 7.76 11.1h-3.19l-6.32-9.06Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
