import { FC, SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const MenuIcon: FC<Props> = (props: Props) => {
  const { className, ...componentProps } = props;

  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-300 stroke-gray-300 hover:stroke-white stroke-light-gray cursor-pointer ${className}`}
      {...componentProps}
    >
      <path d="M5 7H19" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 12H19" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 17H19" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export default MenuIcon;
