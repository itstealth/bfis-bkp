import Link from "next/link";
import Image from "next/image";

const Logo = ({ className = "" }) => {
  return (
    <div className={`flex justify-center lg:justify-start ${className}`}>
      <Link
        href="/"
        aria-label="BFIS Logo"
        className="flex justify-center items-center gap-1"
      >
        <Image
          src="/assets/images/logo_color.png" // place logo.png under public/assets/images/
          alt="BFIS Logo"
          width={300} // adjust as per your logo size or use layout='intrinsic'
          height={80}
          className="h-auto"
          unoptimized
          style={{
            width: "auto",
            height: "auto",
            maxWidth: "300px",
            minWidth: "80px",
          }}
          priority
        />
      </Link>
    </div>
  );
};

export default Logo;
