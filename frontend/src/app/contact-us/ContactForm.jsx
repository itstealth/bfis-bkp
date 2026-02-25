"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    email: "",
    phone: "",
    class: "",
    enquiry: "",
    marketingConsent: true,
  });

  const [utmParams, setUtmParams] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  });

  const [errors, setErrors] = useState({
    parentName: "",
    studentName: "",
    email: "",
    phone: "",
    marketingConsent: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

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

  const validateParentName = (name) =>
    /^[A-Za-z\s]+$/.test(name)
      ? ""
      : "Parent's name should only contain letters and spaces";
  const validateStudentName = (name) =>
    /^[A-Za-z\s]+$/.test(name)
      ? ""
      : "Student's name should only contain letters and spaces";
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? ""
      : "Please enter a valid email address";
  const validatePhone = (phone) =>
    /^[6-9]\d{9}$/.test(phone)
      ? ""
      : "Phone number must be 10 digits and start with 6-9";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let fieldValue = type === "checkbox" ? checked : value;
    
    // Limit phone field to 10 digits only (numeric)
    if (name === "phone") {
      // Remove any non-numeric characters and limit to 10 digits
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      fieldValue = numericValue;
      setFormData({ ...formData, [name]: fieldValue });
      setErrors((p) => ({ ...p, phone: validatePhone(fieldValue) }));
      return;
    }
    
    setFormData({ ...formData, [name]: fieldValue });
    if (name === "parentName")
      setErrors((p) => ({ ...p, parentName: validateParentName(value) }));
    if (name === "studentName")
      setErrors((p) => ({ ...p, studentName: validateStudentName(value) }));
    if (name === "email")
      setErrors((p) => ({ ...p, email: validateEmail(value) }));
    if (name === "marketingConsent")
      setErrors((p) => ({ ...p, marketingConsent: checked ? "" : "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parentNameError = validateParentName(formData.parentName);
    const studentNameError = validateStudentName(formData.studentName);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    const classError = formData.class ? "" : "Class is required";
    const marketingConsentError = formData.marketingConsent ? "" : "Consent is required";

    setErrors({
      parentName: parentNameError,
      studentName: studentNameError,
      email: emailError,
      phone: phoneError,
      class: classError,
      marketingConsent: marketingConsentError,
    });
    if (
      parentNameError ||
      studentNameError ||
      emailError ||
      phoneError ||
      classError ||
      marketingConsentError
    )
      return;

    // Create JSON payload instead of FormData
    const payload = {
      "contact-parent-name": formData.parentName,
      "contact-student-name": formData.studentName,
      "contact-email": formData.email,
      "contact-phone": formData.phone,
      "contact-class": formData.class,
      "contact-enquiry": formData.enquiry,
      "contact-marketing-consent": formData.marketingConsent.toString(),
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
        if (response.status === 502 || response.status === 503) {
          throw new Error("Server is temporarily unavailable. Please try again later.");
        } else if (response.status === 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(result.error || result.message || `Server responded with status ${response.status}`);
        }
      }
      
      if (result.success) {
        setFormData({
          parentName: "",
          studentName: "",
          email: "",
          phone: "",
          class: "",
          enquiry: "",
          marketingConsent: true,
        });
        setIsSubmitting(false);
        router.push("/thankyou");
      } else {
        setIsSubmitting(false);
        throw new Error(result.message || result.error || "Failed to submit form");
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

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeIn}
      >
        <label
          htmlFor="parentName"
          className="block text-sm font-medium text-white"
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
          className="mt-2 block w-full px-5 py-3 bg-gray-300 text-gray-800 border border-gray-600 rounded-lg focus:ring-nblue focus:border-nblue transition duration-200"
        />
        {errors.parentName && (
          <p className="mt-1 text-sm text-vgreen">{errors.parentName}</p>
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
          className="block text-sm font-medium text-white"
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
          className="mt-2 block w-full px-5 py-3 bg-gray-300 text-gray-800 border border-gray-600 rounded-lg focus:ring-nblue focus:border-nblue transition duration-200"
        />
        {errors.studentName && (
          <p className="mt-1 text-sm text-vgreen">{errors.studentName}</p>
        )}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeIn}
      >
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-2 block w-full px-5 py-3 bg-gray-300 text-gray-800 border border-gray-600 rounded-lg focus:ring-nblue focus:border-nblue transition duration-200"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-vgreen">{errors.email}</p>
        )}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeIn}
      >
        <label htmlFor="phone" className="block text-sm font-medium text-white">
          Phone
        </label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          maxLength={10}
          inputMode="numeric"
          pattern="[0-9]*"
          className="mt-2 block w-full px-5 py-3 bg-gray-300 text-gray-800 border border-gray-600 rounded-lg focus:ring-nblue focus:border-nblue transition duration-200"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-vgreen">{errors.phone}</p>
        )}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeIn}
      >
        <label htmlFor="class" className="block text-sm font-medium text-white">
          Class
        </label>
        <select
          name="class"
          id="class"
          value={formData.class}
          onChange={handleChange}
          required
          className="mt-2 block w-full px-5 py-3 bg-gray-300 text-gray-800 border border-gray-600 rounded-lg focus:ring-nblue focus:border-nblue transition duration-200"
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
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeIn}
      >
        <label
          htmlFor="enquiry"
          className="block text-sm font-medium text-white"
        >
          Enquiry
        </label>
        <textarea
          name="enquiry"
          id="enquiry"
          value={formData.enquiry}
          onChange={handleChange}
          required
          rows="5"
          className="mt-2 block w-full px-5 py-3 bg-gray-300 text-gray-800 border border-gray-600 rounded-lg focus:ring-nblue focus:border-nblue transition duration-200"
        ></textarea>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeIn}
      >
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="marketingConsent"
            id="marketingConsent"
            checked={formData.marketingConsent}
            onChange={handleChange}
            required
            className="mt-1 w-5 h-5 text-vgreen bg-gray-300 border-gray-600 rounded focus:ring-nblue focus:ring-2"
          />
          <span className="text-sm font-medium text-white">
            I hereby give my consent to receive marketing and promotional messages via SMS, Email, WhatsApp, and RCS
          </span>
        </label>
        {errors.marketingConsent && (
          <p className="mt-1 text-sm text-vgreen">{errors.marketingConsent}</p>
        )}
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
          className={`w-full py-3 px-6 text-lg font-semibold text-white rounded-lg transition duration-300 ease-in-out ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-vgreen hover:bg-hgreen'
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </motion.div>
    </form>
  );
}
