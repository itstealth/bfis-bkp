"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { X } from "lucide-react";
import axios from "axios";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

const ITEMS_PER_PAGE = 6;

const Pagination = ({ currentPage, totalPages, goToPage }) => (
  <ul className="flex items-center justify-center gap-3 mt-6">
    <li
      className={`w-8 h-8 flex justify-center items-center rounded-full text-lg cursor-pointer transition-colors ${
        currentPage === 1
          ? "text-nblue/40 cursor-not-allowed"
          : "text-nblue hover:bg-nblue hover:text-white"
      }`}
      onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
    >
      <FaAngleLeft />
    </li>
    {Array.from({ length: totalPages }, (_, index) => (
      <li
        key={index}
        className={`w-8 h-8 flex justify-center items-center rounded-full text-lg font-semibold cursor-pointer transition-colors ${
          currentPage === index + 1
            ? "bg-nblue text-white"
            : "text-nblue hover:bg-nblue hover:text-white"
        }`}
        onClick={() => goToPage(index + 1)}
      >
        {index + 1}
      </li>
    ))}
    <li
      className={`w-8 h-8 flex justify-center items-center rounded-full text-lg cursor-pointer transition-colors ${
        currentPage === totalPages
          ? "text-nblue/40 cursor-not-allowed"
          : "text-nblue hover:bg-nblue hover:text-white"
      }`}
      onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
    >
      <FaAngleRight />
    </li>
  </ul>
);

export default function NewsCoverageClient() {
  const [isClient, setIsClient] = useState(false);
  const [newsCoverages, setNewsCoverages] = useState([]);
  const [selectedNewsCoverage, setSelectedNewsCoverage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define these outside useEffect so they can be used in JSX
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.bfis.in/api";
  const uploadsBaseUrl =
    process.env.NEXT_PUBLIC_UPLOADS_BASE_URL ||
    "https://www.bfis.in/api/uploads";

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run on client side after component mounts
    if (isClient) {
      const fetchNewsCoverages = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `${apiBaseUrl}/gallery-news-coverage`
          );
          const sorted = response.data.newsCoverages.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setNewsCoverages(sorted);
          setError(null);
        } catch (err) {
          console.error("Error fetching news coverages:", err);
          setError("Failed to load news coverages. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchNewsCoverages();
    }
  }, [isClient, apiBaseUrl]);

  const totalPages = Math.ceil(newsCoverages.length / ITEMS_PER_PAGE);
  const currentNewsCoverages = newsCoverages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openModal = (item) => {
    setSelectedNewsCoverage(item);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setLightboxIndex(null);
  };
  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const showNextImage = () =>
    setLightboxIndex((i) =>
      i < selectedNewsCoverage.images.length - 1 ? i + 1 : 0
    );
  const showPrevImage = () =>
    setLightboxIndex((i) =>
      i > 0 ? i - 1 : selectedNewsCoverage.images.length - 1
    );
  const goToPage = (n) => setCurrentPage(n);

  if (isLoading)
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold text-center lg:text-5xl text-nblue my-12">
          News Coverage
        </h1>
        <p>Loading news coverages...</p>
      </div>
    );
  if (error)
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold text-center lg:text-5xl text-nblue my-12">
          News Coverage
        </h1>
        <p className="text-vgreen">{error}</p>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center lg:text-5xl text-nblue my-12">
        News Coverage
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentNewsCoverages.map((newsCoverage, index) => (
          <motion.div
            key={newsCoverage.id}
            initial={{ opacity: 0, y: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
          >
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
              onClick={() => openModal(newsCoverage)}
            >
              <CardContent className="p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                  <img
                    src={`${uploadsBaseUrl}/${newsCoverage.thumbnail}`}
                    alt={newsCoverage.name}
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                  <h2 className="text-lg font-semibold">{newsCoverage.name}</h2>
                  {newsCoverage.date && (
                    <p className="text-sm text-gray-600">
                      {new Date(newsCoverage.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      {newsCoverages.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      )}

      {isModalOpen && selectedNewsCoverage && (
        <div className="fixed inset-0 bg-nblue/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {selectedNewsCoverage.name}
              </h2>
              <Button variant="ghost" size="icon" onClick={closeModal}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedNewsCoverage.images.map((image, idx) => (
                <img
                  key={image}
                  src={`${uploadsBaseUrl}/${image}`}
                  alt={`${selectedNewsCoverage.name} - Image`}
                  className="w-full h-48 object-cover rounded-md cursor-pointer"
                  onClick={() => openLightbox(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {lightboxIndex !== null && selectedNewsCoverage && (
        <div className="fixed inset-0 bg-nblue/80 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 text-white text-3xl font-bold cursor-pointer"
            >
              &times;
            </button>
            <button
              onClick={showPrevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-nblue/70 text-white text-3xl font-bold rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
            >
              &#10094;
            </button>
            <img
              src={`${uploadsBaseUrl}/${selectedNewsCoverage.images[lightboxIndex]}`}
              alt={`${selectedNewsCoverage.name} - Image`}
              className="max-w-[90vw] max-h-[90vh] rounded-lg"
            />
            <button
              onClick={showNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-nblue/70 text-white text-3xl font-bold rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
            >
              &#10095;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
