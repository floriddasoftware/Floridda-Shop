"use client";
import { useState } from "react";
import Layout from "@/components/Layout";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subject, message }),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setStatus("Error sending message.");
      }
    } catch (err) {
      setStatus("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-grow">
          <section className="bg-gradient-to-r from-primary to-secondary py-24">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Contact Us
              </h1>
              <p className="text-text max-w-2xl mx-auto mt-4">
                Have questions? We're here to help! Reach out to our team
                anytime.
              </p>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 mb-12 md:mb-0">
                  <h2 className="text-2xl font-bold text-text mb-6">
                    Say Hello
                  </h2>
                  <p className="text-text mb-8">
                    We'd love to hear from you. Fill out the form and our team
                    will get back to you as soon as possible.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-accent p-3 rounded-full mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text">Visit Us</h3>
                        <p className="text-text">
                          First Gate, Dutse FCT Nigeria
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-accent p-3 rounded-full mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text">Email Us</h3>
                        <p className="text-text">floriddasoftware@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-accent p-3 rounded-full mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text">Call Us</h3>
                        <p className="text-text">+234 701 456 1890</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <h2 className="text-2xl font-bold text-text mb-6">
                    Ask Your Queries
                  </h2>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-text mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="your.email@example.com"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-text mb-2">Subject *</label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="How can we help?"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-text mb-2">Message *</label>
                      <textarea
                        rows="4"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="Your message here..."
                        required
                        disabled={loading}
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-3 rounded-lg transition duration-300 ${
                        loading
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-secondary text-white hover:bg-primary"
                      }`}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                    {status && (
                      <p
                        className={`text-center mt-4 ${
                          status.includes("Error")
                            ? "text-red-500"
                            : "text-accent"
                        }`}
                      >
                        {status}
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-text text-center mb-8">
                Find Us
              </h2>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0196999999997!2d7.108277215195!3d9.083520993223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0ba3f7e1b5b7%3A0x4e4e4e4e4e4e4e4e!2sDutse%2C%20Abuja%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1698765432100!5m2!1sen!2sus"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}