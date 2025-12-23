import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUs() {
  return (
    <section id="contact" className="bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* Left Content */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Contact Us</h2>
          <p className="text-gray-600 mb-8">
            Have questions, feedback, or need help? Our support team is here to assist you.
            Reach out anytime!
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-indigo-600" />
              <span className="text-gray-700 text-lg">aarishk623@gmail.com</span>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-indigo-600" />
              <span className="text-gray-700 text-lg">+92 302 3739939</span>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-indigo-600" />
              <span className="text-gray-700 text-lg">Mardan, Pakistan</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-white shadow-lg rounded-xl p-8 space-y-5">
          <h3 className="text-xl font-semibold mb-2">Send a Message</h3>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />

          <textarea
            placeholder="Your Message"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Send Message
          </button>
        </form>

      </div>
    </section>
  );
}
