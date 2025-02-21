import NavBar from "../components/navBar";
import Footer from "../components/footer";

const Contact = () => {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
          <div className="max-w-6xl mx-auto px-6 py-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              This is the Contact Page
            </h1>
  
            {/* Joke Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <p className="text-lg font-semibold text-gray-800">
                Why was the Contact Page so shy?
              </p>
              <p className="text-gray-600">
                Because it didn&apos;t want to be <strong>submitted</strong> to judgment! 😄
              </p>
            </div>
  
            {/* Fun Fact Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <p className="text-lg font-semibold text-gray-800">
                Fun Fact:
              </p>
              <p className="text-gray-600">
                The first-ever &quot;Contact Us&quot; form was likely created in the early days of the web, and it probably looked something like this: <br />
                📧 <strong>Email:</strong> [your.email@example.com] <br />
                📞 <strong>Phone:</strong> [123-456-7890] <br />
                💬 <strong>Message:</strong> [Type here...] <br />
                Thankfully, we&apos;ve come a long way since then! Now we have fancy gradients, animations, and even chatbots. 😎
              </p>
            </div>
  
            {/* Placeholder for Contact Form */}
            <div className="mt-8">
              <p className="text-gray-600">
                (Your amazing contact form will go here!)
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  };

export default Contact;