import React, { ElementType, ReactNode } from "react";

type StarBorderProps<T extends ElementType = "button"> = {
  /** The element or component to render as (defaults to "button") */
  as?: T;
  /** Additional class names */
  className?: string;
  /** The color to use in the radial gradient */
  color?: string;
  /** The animation duration (e.g. "6s") */
  speed?: string;
  /** Children to render inside the StarBorder */
  children?: ReactNode;
} & React.ComponentPropsWithoutRef<T>;

const StarBorder = <T extends ElementType = "button">({
  as: Component = "button",
  className = "",
  color = "white",
  speed = "6s",
  children,
  ...rest
}: StarBorderProps<T>) => {
  return (
    <Component
      className={`relative inline-block py-[1px] overflow-hidden rounded-[20px] ${className}`}
      {...rest}
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
