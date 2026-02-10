export default function Terms() {
return ( <div className="bg-black text-gray-200 min-h-screen px-6 py-16">


  <div className="max-w-5xl mx-auto">

    {/* Header */}
    <h1 className="text-4xl font-extrabold text-center mb-6">
      Terms of <span className="text-yellow-400">Service</span>
    </h1>

    <p className="text-center text-gray-400 mb-12">
      Please read these terms carefully before using CarRental.
    </p>

    {/* Sections */}
    <div className="space-y-10 text-gray-300 leading-relaxed">

      <section>
        <h2 className="text-xl font-bold text-yellow-400 mb-2">
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing or using CarRental, you agree to be bound by these
          Terms of Service. If you do not agree, you may not use the platform.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-yellow-400 mb-2">
          2. User Responsibilities
        </h2>
        <p>
          Users must provide accurate information, maintain account
          security, and comply with applicable laws while using the platform.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-yellow-400 mb-2">
          3. Booking & Payments
        </h2>
        <p>
          Bookings are subject to availability and confirmation. Payments
          must be completed at the time of reservation through supported
          payment methods.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-yellow-400 mb-2">
          4. Vehicle Listings
        </h2>
        <p>
          Vehicle owners are responsible for providing accurate listings.
          CarRental reserves the right to remove or suspend listings that
          violate platform standards.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-yellow-400 mb-2">
          5. Limitation of Liability
        </h2>
        <p>
          CarRental is not liable for indirect damages arising from vehicle
          use, service interruptions, or third-party actions.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-yellow-400 mb-2">
          6. Modifications
        </h2>
        <p>
          We reserve the right to update these terms at any time. Continued
          use of the platform constitutes acceptance of changes.
        </p>
      </section>

    </div>

  </div>

</div>


);
}
