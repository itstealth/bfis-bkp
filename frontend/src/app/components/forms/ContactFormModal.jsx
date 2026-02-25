"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

export default function ContactFormModal({ setIsOpen }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    email: "",
    phone: "",
    class: "",
    enquiry: "",
  });

  const [errors, setErrors] = useState({
    parentName: "",
    studentName: "",
    email: "",
    phone: "",
    class: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [utmParams, setUtmParams] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  });

  // Manage internal open state for showing the modal - initially based on localStorage
  const [isOpenState, setIsOpenState] = useState(false);

  useEffect(() => {
    // To avoid hydration errors, check localStorage on client only
    const formShown = window.localStorage.getItem("formShown");
    setIsOpenState(!formShown);
  }, []);

  // Capture UTM parameters from URL on component mount
  useEffect(() => {
    const params = {
      utm_source: searchParams.get('utm_source') || '',
      utm_medium: searchParams.get('utm_medium') || '',
      utm_campaign: searchParams.get('utm_campaign') || '',
      utm_term: searchParams.get('utm_term') || '',
      utm_content: searchParams.get('utm_content') || '',
    };
    
    // Only update if at least one UTM parameter exists
    if (Object.values(params).some(val => val !== '')) {
      setUtmParams(params);
      console.log('📊 UTM Parameters captured:', params);
    }
  }, [searchParams]);

  // Validation functions
  const validateParentName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      return "Parent's name should only contain letters and spaces";
    }
    return "";
  };

  const validateStudentName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      return "Student's name should only contain letters and spaces";
    }
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return "Phone number must be 10 digits and start with 6-9";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate on change
    switch (name) {
      case "parentName":
        setErrors((prev) => ({
          ...prev,
          parentName: validateParentName(value),
        }));
        break;
      case "studentName":
        setErrors((prev) => ({
          ...prev,
          studentName: validateStudentName(value),
        }));
        break;
      case "email":
        setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
        break;
      case "phone":
        setErrors((prev) => ({ ...prev, phone: validatePhone(value) }));
        break;
      case "class":
        setErrors((prev) => ({
          ...prev,
          class: value ? "" : "Class is required",
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const parentNameError = validateParentName(formData.parentName);
    const studentNameError = validateStudentName(formData.studentName);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    const classError = formData.class ? "" : "Class is required";

    setErrors({
      parentName: parentNameError,
      studentName: studentNameError,
      email: emailError,
      phone: phoneError,
      class: classError,
    });

    if (
      parentNameError ||
      studentNameError ||
      emailError ||
      phoneError ||
      classError
    ) {
      return;
    }

    // Create JSON payload instead of FormData
    const payload = {
      "contact-parent-name": formData.parentName,
      "contact-student-name": formData.studentName,
      "contact-email": formData.email,
      "contact-phone": formData.phone,
      "contact-class": formData.class,
      "contact-enquiry": formData.enquiry,
      "contact-marketing-consent": "true",
      utm_source: utmParams.utm_source || "",
      utm_medium: utmParams.utm_medium || "",
      utm_campaign: utmParams.utm_campaign || "",
      utm_term: utmParams.utm_term || "",
      utm_content: utmParams.utm_content || ""
    };

    setIsSubmitting(true);

    try {
      // Use PHP endpoint for OVH VPS compatibility
      const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT || "https://stealthlearn.in/bfis-lp/submit-lead.php";
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });

      // Parse response
      let result;
      try {
        const text = await response.text();
        result = text ? JSON.parse(text) : { success: false, message: "Empty response from server" };
      } catch (parseError) {
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        // Handle specific error codes with better messages
        if (response.status === 409) {
          throw new Error("This phone number is already registered");
        } else if (response.status === 502 || response.status === 503) {
          throw new Error("Server is temporarily unavailable. Please try again later.");
        } else if (response.status === 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(result.error || result.message || `Server responded with status ${response.status}`);
        }
      }

      console.log("Form submission result:", result);

      if (result.success) {
        setFormData({
          parentName: "",
          studentName: "",
          email: "",
          phone: "",
          class: "",
          enquiry: "",
        });
        setIsSubmitting(false);
        setIsOpen(false);
        localStorage.setItem("formShown", "true"); // Mark as shown
        router.push("/thankyou");
      } else {
        setIsSubmitting(false);
        throw new Error(result.message || "Failed to submit form");
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error submitting form:", error);
      const errorMessage = error.message || "Failed to send message. Please try again.";
      alert(errorMessage);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  // If you want, you can conditionally render based on isOpenState or isOpen prop

  return (
    <motion.div>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeIn}
        >
          <label
            htmlFor="parentName"
            className="block text-xs font-medium text-white"
          >
            Parent's Name
          </label>
          <input
            type="text"
            name="parentName"
            id="parentName"
            value={formData.parentName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-1.5 bg-gray-300 text-gray-800 border border-gray-600 rounded-lg focus:ring-nblue focus:border-nblue transition duration-200"
            aria-invalid={!!errors.parentName}
            aria-describedby="parentName-error"
          />
          {errors.parentName && (
            <p
              id="parentName-error"
              className="mt-1 text-xs text-vgreen"
              role="alert"
            >
              {errors.parentName}
            </p>
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeIn}
        >
          <label
            htmlFor="studentName"
            className="block text-xs font-medium text-white"
          >
            Student's Name
          </label>
          <input
            type="text"
            name="studentName"
            id="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-1.5 bg-gray-300 text-gray-800 border border-gray-600 rounded-lg focus:ring-nblue focus:border-nblue transition duration-200"
            aria-invalid={!!errors.studentName}
            aria-describedby="studentName-error"
          />
          {errors.studentName && (
            <p
              id="studentName-error"
              className="mt-1 text-xs text-vgreen"
              role="alert"
            >
              {errors.studentName}
            </p>
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeIn}
        >
          <label
            htmlFor="email"
            className="block text-xs font-medium text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-1.5 bg-gray-300 text-gray-800 border border-gray-600 rounded-lg focus:ring-nblue focus:border-nblue transition duration-200"
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
          />
          {errors.email && (
            <p
              id="email-error"
              className="mt-1 text-xs text-vgreen"
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeIn}
        >
          <label
            htmlFor="phone"
            className="block text-xs font-medium text-white"
          >
            Phone
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-1.5 bg-gray-300 text-gray-800 border border-gray-600 rounded-lg focus:ring-nblue focus:border-nblue transition duration-200"
            aria-invalid={!!errors.phone}
            aria-describedby="phone-error"
            inputMode="tel"
            pattern="[6-9]\d{9}"
          />
          {errors.phone && (
            <p
              id="phone-error"
              className="mt-1 text-xs text-vgreen"
              role="alert"
            >
              {errors.phone}
            </p>
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeIn}
        >
          <label
            htmlFor="class"
            className="block text-xs font-medium text-white"
          >
            Class
          </label>
          <select
            name="class"
            id="class"
            value={formData.class}
            onChange={handleChange}
            required
            className="mt-2 block w-full px-5 py-3 bg-gray-300 text-gray-800 border border-gray-600 rounded-lg focus:ring-nblue focus:border-nblue transition duration-200"
            aria-invalid={!!errors.class}
            aria-describedby="class-error"
          >
            <option value="">Select Class</option>
            {[
              "Pre-Nursery",
              "Nursery",
              "KG",
              "1st",
              "2nd",
              "3rd",
              "4th",
              "5th",
              "6th",
              "7th",
              "8th",
              "9th",
              "10th",
              "11th",
              "12th",
            ].map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
          {errors.class && (
            <p
              id="class-error"
              className="mt-1 text-xs text-vgreen"
              role="alert"
            >
              {errors.class}
            </p>
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeIn}
        >
          <label
            htmlFor="enquiry"
            className="block text-xs font-medium text-white"
          >
            Enquiry
          </label>
          <textarea
            name="enquiry"
            id="enquiry"
            value={formData.enquiry}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full px-3 py-1.5 bg-gray-300 text-gray-800 border border-gray-600 rounded-lg focus:ring-nblue focus:border-nblue transition duration-200"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeIn}
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 text-sm font-semibold text-white rounded-lg transition duration-300 ease-in-out ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-vgreen hover:bg-hgreen'
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
}
