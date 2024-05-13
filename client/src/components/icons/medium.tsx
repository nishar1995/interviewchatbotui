export default function MediumIcon({
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
          d="M21.4 24H2.6A2.6 2.6 0 0 1 0 21.4V2.6A2.6 2.6 0 0 1 2.6 0h18.8A2.6 2.6 0 0 1 24 2.6v18.8a2.6 2.6 0 0 1-2.6 2.6Z"
        />
        <path
          fill="#000"
          d="M21.4 24H2.6A2.6 2.6 0 0 1 0 21.4V2.6A2.6 2.6 0 0 1 2.6 0h18.8A2.6 2.6 0 0 1 24 2.6v18.8a2.6 2.6 0 0 1-2.6 2.6Z"
        />
        <path
          fill="#fff"
          d="M13.16 12c0 2.86-2.3 5.17-5.13 5.17A5.15 5.15 0 0 1 2.89 12c0-2.86 2.3-5.17 5.14-5.17A5.15 5.15 0 0 1 13.16 12ZM18.8 12c0 2.69-1.15 4.87-2.57 4.87s-2.57-2.18-2.57-4.87 1.15-4.87 2.57-4.87S18.8 9.31 18.8 12ZM21.1 12c0 2.41-.4 4.36-.9 4.36s-.9-1.95-.9-4.36c0-2.4.4-4.36.9-4.36s.9 1.95.9 4.36Z"
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
