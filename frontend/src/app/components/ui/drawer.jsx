import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/app/components/ui/sheet";
import { Menu } from "lucide-react";

const Drawer = () => {
  const navlinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Admissions", path: "/admissions" },
    { name: "Events", path: "/events" },
    { name: "Why Indo Global", path: "/why-indo-global" },
    { name: "Blogs", path: "/blogs" },
    { name: "Careers", path: "/careers" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden block">
        <Menu className="w-8 h-8 text-white" />
      </SheetTrigger>
      <SheetContent className="bg-primary-color">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl font-bold text-left">
            Indo Global
          </SheetTitle>
          <SheetDescription className="text-white text-left pt-5">
            <nav>
              <ul className="space-y-1">
                {navlinks.map(({ name, path }, index) => (
                  <li key={index}>
                    <SheetClose asChild>
                      <Link
                        to={path}
                        className="block py-2 px-4 w-fit font-semibold text-slate-200 tracking-wider hover:bg-white/10 rounded transition-colors"
                      >
                        {name}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;
