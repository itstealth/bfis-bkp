/* eslint-disable react/prop-types */
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Pagination = ({ currentPage, totalPages, goToPage }) => {
  return (
    <ul className="flex items-center justify-center gap-3 mt-6">
      {/* Previous Button */}
      <li
        className={`w-8 h-8 flex justify-center items-center rounded-full text-lg cursor-pointer transition-colors ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-600 hover:bg-blue-600 hover:text-white"
        }`}
        onClick={() => goToPage(Math.max(currentPage - 1, 1))}
      >
        <Link>
          <FaAngleLeft />
        </Link>
      </li>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => (
        <li
          key={index}
          className={`w-8 h-8 flex justify-center items-center rounded-full text-lg font-semibold cursor-pointer transition-colors ${
            currentPage === index + 1
              ? "bg-blue-600 text-white"
              : "text-blue-600 hover:bg-blue-600 hover:text-white"
          }`}
          onClick={() => goToPage(index + 1)}
        >
          <Link>{index + 1}</Link>
        </li>
      ))}

      {/* Next Button */}
      <li
        className={`w-8 h-8 flex justify-center items-center rounded-full text-lg cursor-pointer transition-colors ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-600 hover:bg-blue-600 hover:text-white"
        }`}
        onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
      >
        <Link>
          <FaAngleRight />
        </Link>
      </li>
    </ul>
  );
};

export default Pagination;
