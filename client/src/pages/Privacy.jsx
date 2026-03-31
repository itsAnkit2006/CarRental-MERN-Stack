export default function Privacy() {
return ( <div className="bg-black text-gray-200 min-h-screen px-6 py-16">


  <div className="max-w-5xl mx-auto">

    {/* Header */}
    <h1 className="text-4xl font-extrabold text-center mb-6">
      Privacy <span className="text-yellow-400">Policy</span>
    </h1>

    <p className="text-center text-gray-400 mb-12">
      Your privacy is important to us. This policy explains how we collect,
      use, and protect your information.
    </p>

    {/* Sections */}
    <div className="space-y-10 text-gray-300 leading-relaxed">

      <section>
        <h2 className="text-xl font-bold text-yellow-400 mb-2">
          1. Information We Collect
        </h2>
        <p>
          We may collect personal information such as name, email address,
          booking details, and usage data when you interact with the
          platform.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-yellow-400 mb-2">
          2. How We Use Information
        </h2>
        <p>
          Information is used to provide services, improve user experience,
          process bookings, and communicate important updates.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-yellow-400 mb-2">
          3. Data Protection
        </h2>
        <p>
          We implement reasonable security measures including encryption,
          authentication, and secure storage to protect your data.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-yellow-400 mb-2">
          4. Sharing Information
        </h2>
        <p>
          We do not sell personal data. Information may be shared with
          service providers only when necessary for operations.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-yellow-400 mb-2">
          5. Cookies
        </h2>
        <p>
          Cookies may be used to enhance functionality and analyze usage
          patterns. You may disable cookies through browser settings.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-yellow-400 mb-2">
          6. Policy Updates
        </h2>
        <p>
          This policy may be updated periodically. Continued use of the
          platform indicates acceptance of changes.
        </p>
      </section>

    </div>

  </div>

</div>


);
}
