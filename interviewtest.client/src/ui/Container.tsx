import React from "react";

type ContainerType = {
  children: React.ReactNode;
  bgClassName: string;
};

export default function Container({ children, bgClassName }: ContainerType) {
  return (
    <div className={`w-full ${bgClassName}`}>
      <div className="max-w-5xl mx-auto">{children}</div>
    </div>
  );
}
