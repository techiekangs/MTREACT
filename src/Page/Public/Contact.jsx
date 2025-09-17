export default function Contact() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-pink-700">Contact Us 🌺</h1>
      <p className="mt-4 text-pink-900">
        Feel free to reach out via email at <span className="font-bold">hello@mysite.com</span>.
      </p>
      <form className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <textarea
          placeholder="Your Message"
          className="w-full p-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          rows="4"
        ></textarea>
        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-400 text-white px-4 py-2 rounded-md"
        >
          Send
        </button>
      </form>
    </div>
  );
}
