import { FC, SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
}

const CloseIcon: FC<Props> = (props: Props) => {
  const { size = 50, className } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-300 stroke-gray-300 hover:stroke-white stroke-light-gray ${className}`}
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloseIcon;
