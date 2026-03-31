export default function Cookies() {
return ( <div className="bg-black text-gray-200 min-h-screen px-6 py-16">


  <div className="max-w-5xl mx-auto">

    {/* Header */}
    <h1 className="text-4xl font-extrabold text-center mb-6">
      Cookies <span className="text-yellow-400">Policy</span>
    </h1>

    <p className="text-center text-gray-400 mb-12">
      Learn how cookies are used to enhance your experience on CarRental.
    </p>

    {/* Sections */}
    <div className="space-y-10 text-gray-300 leading-relaxed">

      <section>
        <h2 className="text-xl font-bold text-yellow-400 mb-2">
          What Are Cookies?
        </h2>
        <p>
          Cookies are small data files stored on your device that help
          improve functionality, remember preferences, and analyze usage.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-yellow-400 mb-2">
          How We Use Cookies
        </h2>
        <p>
          CarRental may use cookies to maintain session information,
          improve performance, and enhance user experience across the
          platform.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-yellow-400 mb-2">
          Managing Cookies
        </h2>
        <p>
          You can manage or disable cookies through your browser settings.
          Disabling cookies may affect certain platform features.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-yellow-400 mb-2">
          Policy Updates
        </h2>
        <p>
          This policy may change as we improve our services. Continued use
          of the platform indicates acceptance of updates.
        </p>
      </section>

    </div>

  </div>

</div>


);
}
