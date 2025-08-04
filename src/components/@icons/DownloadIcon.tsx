import { FC, SVGProps, useState } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  fillHover?: string;
  color?: string;
  hoverColor?: string;
}

const MenuIcon: FC<Props> = (props: Props) => {
  const { hoverColor = "white", className, color = "#9ca3af" } = props;

  const [didHover, setDidHover] = useState<boolean>(false);

  return (
    <div
      className="cursor-pointer rounded h-min p-2"
      onMouseEnter={() => setDidHover(true)}
      onMouseLeave={() => setDidHover(false)}
    >
      {/* <svg
        width="24"
        height="24"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className ? className : ""} cursor-pointer`}
      >
        <path
          d="M11.333 16.9997L16.9997 22.6663M16.9997 22.6663L22.6663 16.9997M16.9997 22.6663V11.333M31.1663 16.9997C31.1663 24.8237 24.8237 31.1663 16.9997 31.1663C9.17564 31.1663 2.83301 24.8237 2.83301 16.9997C2.83301 9.17564 9.17564 2.83301 16.9997 2.83301C24.8237 2.83301 31.1663 9.17564 31.1663 16.9997Z"
          stroke=""
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={` transition-all duration-300 ${
            didHover ? "stroke-[#56BC78]" : "stroke-gray-200 "
          }`}
        />
      </svg> */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 39 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className ? className : ""} cursor-pointer`}
      >
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(0 15.5996)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(0 18.2002)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(0 13)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(0 10.4004)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(0 7.80078)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(0 5.19922)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(2.60156 2.60059)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(5.19922)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(7.80078)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(10.4004)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(13)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(15.5996)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(18.2012)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(20.7988)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(23.4004)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(26)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(28.5996)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(31.2012)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(33.8008 2.60059)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(36.4004 5.19922)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(36.4004 7.80078)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(36.4004 10.4004)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(36.4004 13)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(36.4004 15.5996)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(36.4004 18.2002)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(36.4004 20.7998)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(36.4004 23.4004)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(36.4004 26.001)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(33.8008 28.5996)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(31.2012 31.2002)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(28.5996 31.2002)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(26 31.2002)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(23.4004 31.2002)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(20.7988 31.2002)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(18.2012 31.2002)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(15.5996 31.2002)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(13 31.2002)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(10.4004 31.2002)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(7.80078 31.2002)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(5.19922 31.2002)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(2.60156 28.5996)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(0 26.001)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(0 23.4004)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(0 20.7998)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(7.80078 15.5996)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(10.4004 18.2002)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(13 20.7998)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(15.5996 23.4004)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(15.5996 26.001)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(13 23.4004)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(10.4004 20.7998)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(7.80078 18.2002)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(18.2012 23.4004)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(18.2012 26.001)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(20.7988 23.4004)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(20.7988 26.001)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(23.4004 23.4004)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(18.2012 20.7998)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(18.2012 18.2002)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(18.2012 15.5996)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(18.2012 13)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(18.2012 10.4004)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(18.2012 7.80078)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(18.2012 5.19922)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(23.4004 20.7998)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(26 20.7998)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(26 18.2002)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(28.5996 18.2002)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
        <rect
          width="2.60003"
          height="2.60003"
          transform="translate(28.5996 15.5996)"
          className={` transition-all duration-300 ${
            didHover ? "fill-[#56BC78]" : "fill-gray-200 "
          }`}
        />
      </svg>
    </div>
  );
};

export default MenuIcon;
