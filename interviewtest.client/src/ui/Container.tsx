import React from "react";

type ContainerType = {
  children: React.ReactNode;
  className?: string;
};

/**
 * A component that wraps it's children in a container with a max width to center the content on big screens.
 * @param children content to be rendered inside the container
 * @param className additional classes that will be applied to the outer div (mainly to apply color outside the max-width)
 */
export default function Container({ children, className }: ContainerType) {
  return (
    <div className={`w-full ${className}`}>
      <div className="max-w-5xl mx-auto px-5">{children}</div>
    </div>
  );
}
