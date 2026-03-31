export default function About() {
return ( <div className="bg-black text-gray-200 min-h-screen px-6 py-16">

  <div className="max-w-5xl mx-auto">

    {/* Header */}
    <h1 className="text-4xl font-extrabold text-center mb-6">
      About <span className="text-yellow-400">CarRental</span>
    </h1>

    <p className="text-center text-gray-400 mb-12">
      Premium vehicle booking experience built for reliability,
      transparency, and convenience.
    </p>

    {/* Content */}
    <div className="space-y-8 leading-relaxed text-gray-300">

      <p>
        CarRental is a modern car booking platform designed to connect
        customers with trusted vehicle owners through a seamless and
        secure experience. Our goal is to simplify vehicle access while
        maintaining high standards of safety and reliability.
      </p>

      <p>
        The platform allows users to browse vehicles, schedule bookings,
        complete payments, and manage trips effortlessly. Owners can
        manage listings and verification processes through a dedicated
        dashboard, while administrators ensure system quality and trust.
      </p>

      <p>
        Built using the MERN stack, CarRental focuses on scalable
        architecture, secure authentication, and responsive design
        patterns that reflect production-grade development standards.
      </p>

    </div>

    {/* Highlight Cards */}
    <div className="grid md:grid-cols-3 gap-6 mt-14">

      <div className="p-6 rounded-xl border border-yellow-500/20 bg-black/60">
        <h3 className="text-lg font-bold text-yellow-400 mb-2">
          Secure Booking
        </h3>
        <p className="text-sm text-gray-400">
          Verified users and token-based authentication ensure reliable
          transactions.
        </p>
      </div>

      <div className="p-6 rounded-xl border border-yellow-500/20 bg-black/60">
        <h3 className="text-lg font-bold text-yellow-400 mb-2">
          Trusted Owners
        </h3>
        <p className="text-sm text-gray-400">
          Verification workflows maintain listing quality and trust.
        </p>
      </div>

      <div className="p-6 rounded-xl border border-yellow-500/20 bg-black/60">
        <h3 className="text-lg font-bold text-yellow-400 mb-2">
          Scalable Tech
        </h3>
        <p className="text-sm text-gray-400">
          Built on modern web architecture for future expansion.
        </p>
      </div>

    </div>

  </div>

</div>

);
}
