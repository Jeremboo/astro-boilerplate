type Props = {
  pathClass?: string;
};

export default function SVGWeb({ pathClass }: Props) {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1253_4958)">
        <path
          d="M7.99963 14.904C11.8126 14.904 14.9036 11.8131 14.9036 8.00012C14.9036 4.18719 11.8126 1.09619 7.99963 1.09619C4.1867 1.09619 1.0957 4.18719 1.0957 8.00012C1.0957 11.8131 4.1867 14.904 7.99963 14.904Z"
          stroke="white"
          stroke-width="1.13"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path d="M1.0957 8H14.9036" stroke="white" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round" />
        <path
          d="M10.6554 8.00012C10.525 10.5248 9.59508 12.9426 8.00008 14.904C6.40508 12.9426 5.47516 10.5248 5.34473 8.00012C5.47516 5.47542 6.40508 3.0576 8.00008 1.09619C9.59508 3.0576 10.525 5.47542 10.6554 8.00012Z"
          stroke="white"
          stroke-width="1.13"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1253_4958">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
