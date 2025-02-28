import React, { ElementType, ReactNode } from "react";

interface Props<T extends ElementType = "button"> {
  as?: T;
  children?: ReactNode;
  className?: string;
  color?: string;
  speed?: string;
}

type StarBorderProps<T extends ElementType = "button"> = Props<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof Props>;

const StarBorder = <T extends ElementType = "button">(
  { as, className = "", color = "white", speed = "6s", children, ...props }: StarBorderProps<T>
) => {
  const Component = as || "button";

  return (
    <Component
      className={`relative inline-block py-[1px] overflow-hidden rounded-[20px] ${className}`}
      {...props}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className="relative z-1 bg-gradient-to-b from-black to-gray-900 border border-gray-800 text-white text-center text-[16px] py-[16px] px-[26px] rounded-[20px]">
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
