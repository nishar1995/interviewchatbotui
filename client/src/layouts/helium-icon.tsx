export default function HeliumIcon({
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 66 56"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M59 1H7a6 6 0 0 0-6 6v42a6 6 0 0 0 6 6h52a6 6 0 0 0 6-6V7a6 6 0 0 0-6-6ZM7 0a7 7 0 0 0-7 7v42a7 7 0 0 0 7 7h52a7 7 0 0 0 7-7V7a7 7 0 0 0-7-7H7Z"
        clipRule="evenodd"
        opacity={0.1}
      />
      <path
        fill="currentColor"
        d="M28 9a5 5 0 0 1 5-5h24a5 5 0 0 1 5 5v38a5 5 0 0 1-5 5H33a5 5 0 0 1-5-5V9ZM4 9a5 5 0 0 1 5-5h9a5 5 0 0 1 5 5v38a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z"
        opacity={0.1}
      />
      <path fill="currentColor" d="M7 10a3 3 0 1 1 6 0 3 3 0 1 1-6 0Z" />
      <path
        fill="currentColor"
        d="M7 17.5A1.5 1.5 0 0 1 8.5 16h10a1.5 1.5 0 0 1 0 3h-10A1.5 1.5 0 0 1 7 17.5Z"
        opacity={0.7}
      />
      <path
        fill="currentColor"
        d="M7 23.5A1.5 1.5 0 0 1 8.5 22h8a1.5 1.5 0 0 1 0 3h-8A1.5 1.5 0 0 1 7 23.5Z"
        opacity={0.4}
      />
    </svg>
  );
}
