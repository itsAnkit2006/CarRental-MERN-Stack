export default function Help() {

const faqs = [
{
q: "How do I book a car?",
a: "Browse available cars, select pickup and return dates, and complete the booking through the checkout flow."
},
{
q: "Can I cancel my booking?",
a: "Yes. Navigate to your bookings dashboard and cancel before the scheduled pickup time."
},
{
q: "How do payments work?",
a: "Payments are processed securely during booking. Confirmation will appear in your dashboard."
},
{
q: "I forgot my password — what do I do?",
a: "Use the Forgot Password option on the login screen and follow the reset link sent to your email."
},
{
q: "How do I list my car?",
a: "Register as an owner and submit your vehicle and verification documents from the owner dashboard."
}
];

return ( <div className="bg-black text-gray-200 min-h-screen px-6 py-16">


  <div className="max-w-5xl mx-auto">

    {/* Header */}
    <h1 className="text-4xl font-extrabold text-center mb-4">
      Help <span className="text-yellow-400">Center</span>
    </h1>

    <p className="text-center text-gray-400 mb-12">
      Find answers to common questions and guidance for using CarRental.
    </p>

    {/* FAQ */}
    <div className="space-y-6">

      {faqs.map((item, i) => (
        <div
          key={i}
          className="p-6 rounded-xl border border-yellow-500/20 bg-black/60"
        >
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">
            {item.q}
          </h3>
          <p className="text-gray-400 text-sm">
            {item.a}
          </p>
        </div>
      ))}

    </div>

    {/* Support Box */}
    <div className="
        mt-16 p-8 text-center
        border border-yellow-500/25
        rounded-xl bg-black/70
    ">
      <h2 className="text-xl font-bold text-yellow-400 mb-2">
        Still need help?
      </h2>

      <p className="text-gray-400 mb-4">
        Contact our support team and we’ll assist you shortly.
      </p>

      <a
        href="mailto:support@carrental.com"
        className="
            inline-block px-6 py-3
            bg-yellow-400 text-black font-bold
            rounded-xl
            hover:bg-yellow-300
            transition-all
            shadow-lg shadow-yellow-500/20
        "
      >
        Contact Support
      </a>
    </div>

  </div>

</div>


);
}
