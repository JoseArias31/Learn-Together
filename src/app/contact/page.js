import NavBar from "../components/navBar";
import Footer from "../components/footer";

import Link from "next/link"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
     
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Get in Touch</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold mb-6 text-teal-400">Contact Information</h2>

            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-green-400 mt-1" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-400">support@learntogether.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-green-400 mt-1" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-green-400 mt-1" />
              <div>
                <h3 className="font-medium">Office</h3>
                <p className="text-gray-400">123 Education Street</p>
                <p className="text-gray-400">San Francisco, CA 94103</p>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">Office Hours</h3>
              <p className="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-400">Saturday: 10:00 AM - 4:00 PM</p>
              <p className="text-gray-400">Sunday: Closed</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-teal-400">Send us a Message</h2>

            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium rounded-md hover:from-green-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

   
      <Footer />
    </div>
  )
}
