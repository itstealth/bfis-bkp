import SlideUp from "@/app/lib/animations/slideUp";
import { cn } from "@/app/lib/utils";
import React from "react";

const SectionDescription = ({ children, className }) => {
  return (
    <SlideUp delay={2}>
      <p className={cn("", className)}>{children}</p>
    </SlideUp>
  );
};

export default SectionDescription;
