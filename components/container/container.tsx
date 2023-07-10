"use client";
import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="w-9/12 mx-auto  md:w-[32rem] lg:w-[48rem] xl:w-[64rem]">
      {children}
    </div>
  );
};

export { Container };
