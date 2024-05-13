export default function LinkedinIcon({
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
        <path fill="#0B69C7" d="M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24Z" />
        <path
          fill="#fff"
          d="M9.32 7.64a1.64 1.64 0 1 1-3.28 0 1.64 1.64 0 0 1 3.28 0ZM8.54 9.96H6.82a.4.4 0 0 0-.4.4v7.24c0 .22.18.4.4.4h1.72a.4.4 0 0 0 .41-.4v-7.23a.4.4 0 0 0-.4-.4ZM17.96 14.13v3.5a.37.37 0 0 1-.37.37h-1.85a.37.37 0 0 1-.38-.37v-3.39c0-.5.15-2.21-1.32-2.21-1.14 0-1.37 1.17-1.42 1.7v3.9a.37.37 0 0 1-.37.37h-1.8a.37.37 0 0 1-.36-.37v-7.3a.37.37 0 0 1 .37-.37h1.79a.37.37 0 0 1 .38.38v.63c.42-.63 1.05-1.13 2.39-1.13 2.96 0 2.94 2.77 2.94 4.3Z"
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
