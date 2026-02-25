/* eslint-disable react/prop-types */
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { motion } from "framer-motion";
import axios from "axios";

const ITEMS_PER_PAGE = 6;

// Pagination component
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
        onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
      >
        <FaAngleLeft />
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
          {index + 1}
        </li>
      ))}

      {/* Next Button */}
      <li
        className={`w-8 h-8 flex justify-center items-center rounded-full text-lg cursor-pointer transition-colors ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-600 hover:bg-blue-600 hover:text-white"
        }`}
        onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
      >
        <FaAngleRight />
      </li>
    </ul>
  );
};

export default function EventsGallery() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from the backend and sort them
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/gallery-events");

        // Sort events by date in descending order (latest first)
        const sortedEvents = response.data.events.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });

        setEvents(sortedEvents);
        setError(null);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);
  const currentEvents = events.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setLightboxIndex(null);
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showNextImage = () => {
    setLightboxIndex((prevIndex) =>
      prevIndex < selectedEvent.images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const showPrevImage = () => {
    setLightboxIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : selectedEvent.images.length - 1
    );
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-6">Events Gallery</h1>
        <p>Loading events...</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-6">Events Gallery</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Events Gallery</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentEvents.map((event, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: isEven ? -50 : 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
                onClick={() => openModal(event)}
              >
                <CardContent className="p-4 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <img
                      src={`https://www.bfis.in/api/uploads/${event.thumbnail}`}
                      alt={event.name}
                      className="w-full h-48 object-cover rounded-md mb-2"
                    />
                    <h2 className="text-lg font-semibold">{event.name}</h2>
                    {event.date && (
                      <p className="text-sm text-gray-600">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination Component */}
      {events.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      )}

      {/* Modal for Event Images */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedEvent.name}</h2>
              <Button variant="ghost" size="icon" onClick={closeModal}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedEvent.images.map((image, index) => (
                <img
                  key={image}
                  src={`https://www.bfis.in/api/uploads/${image}`}
                  alt={`${selectedEvent.name} - Image`}
                  className="w-full h-48 object-cover rounded-md cursor-pointer"
                  onClick={() => openLightbox(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Popup with Navigation */}
      {lightboxIndex !== null && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 text-white text-3xl font-bold cursor-pointer"
            >
              &times;
            </button>
            <button
              onClick={showPrevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white text-3xl font-bold rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
            >
              &#10094;
            </button>
            <img
              src={`https://www.bfis.in/api/uploads/${selectedEvent.images[lightboxIndex]}`}
              alt={`${selectedEvent.name} - Image`}
              className="max-w-[90vw] max-h-[90vh] rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
