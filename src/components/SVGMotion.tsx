type Props = {
  isWhite?: boolean;
  width?: number;
  isActive?: boolean;
};

export default function SVGWeb({ width = 60, isWhite = false, isActive = true }: Props) {
  const color = isWhite ? 'white' : 'black';
  return (
    <svg width={width} height={(width / 60) * 26} viewBox="0 0 60 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M35.2838 1.11866C33.6693 0.399641 31.8813 0 30 0C22.8203 0 17 5.8203 17 13C17 20.1797 22.8203 26 30 26C31.8813 26 33.6693 25.6004 35.2838 24.8813C32.0392 21.9531 30 17.7147 30 13C30 8.28531 32.0392 4.04689 35.2838 1.11866Z"
        fill={color}
        class="transition-[fill-opacity] duration-base"
        fill-opacity={isActive ? 1 : 0}
      />
      <path
        d="M18.2838 1.11866C16.6693 0.399641 14.8813 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26C14.8813 26 16.6693 25.6004 18.2838 24.8813C15.0392 21.9531 13 17.7147 13 13C13 8.28531 15.0392 4.04689 18.2838 1.11866Z"
        fill={color}
        class="transition-[fill-opacity] duration-base"
        fill-opacity={isActive ? 1 : 0}
      />
      <circle class="transition-[cx] duration-base" cx={isActive ? 47 : 47 - 18} cy="13" r="13" fill={color} />
    </svg>
  );
}
