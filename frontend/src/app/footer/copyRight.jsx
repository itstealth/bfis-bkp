import Link from "next/link";
import { cn } from "@/app/lib/utils";

const CopyRight = ({ color }) => {
  return (
    <div className="lg:pt-[75px] overflow-x-hidden">
      <div className="flex lg:flex-row flex-col justify-between items-center text-center lg:text-left pt-7 pb-8 sm:border-t sm:border-t-white border-opacity-20">
        <p className={cn("wow fadeInLeft", color)} data-wow-delay=".3s">
          © <Link href="#">BFIS</Link> 2024 | All Rights{" "}
          <span className="text-inherit cursor-default select-text">
            Reserved
          </span>
        </p>

        {/* 
        Uncomment and update links as needed. Example below for Next.js Link usage: 

        <ul
          className="flex items-center gap-7 lg:gap-5 wow fadeInRight mt-4 lg:mt-0"
          data-wow-delay=".3s"
        >
          <li>
            <Link href="/terms" className={cn("", color)}>
              Terms & Condition
            </Link>
          </li>
          <li>
            <Link href="/privacy" className={cn("", color)}>
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/contact" className={cn("", color)}>
              Contact Us
            </Link>
          </li>
        </ul>
        */}
      </div>
    </div>
  );
};

export default CopyRight;
