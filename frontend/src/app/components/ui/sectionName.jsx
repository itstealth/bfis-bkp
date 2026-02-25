import PropTypes from "prop-types"; // Import PropTypes for validation
import { cn } from "@/app/lib/utils";
import SlideUp from "@/app/lib/animations/slideUp";

const SectionName = ({ className, children }) => {
  return (
    <SlideUp>
      <p
        className={cn(
          "text-secondary-foreground font-roboto text-[19px]",
          className
        )}
      >
        {children}
      </p>
    </SlideUp>
  );
};

// PropTypes validation for className and children
SectionName.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default SectionName;
