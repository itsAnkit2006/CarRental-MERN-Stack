export default function Insurance() {
return ( <div className="bg-black text-gray-200 min-h-screen px-6 py-16">


  <div className="max-w-5xl mx-auto">

    {/* Header */}
    <h1 className="text-4xl font-extrabold text-center mb-6">
      Rental <span className="text-yellow-400">Insurance</span>
    </h1>

    <p className="text-center text-gray-400 mb-12">
      Understanding protection coverage during your rental experience.
    </p>

    {/* Sections */}
    <div className="space-y-10 text-gray-300 leading-relaxed">

      <section>
        <h2 className="text-xl font-bold text-yellow-400 mb-2">
          Coverage Overview
        </h2>
        <p>
          CarRental encourages safe and responsible usage of all vehicles.
          Insurance coverage may vary depending on vehicle owner policies
          and regional regulations.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-yellow-400 mb-2">
          Driver Responsibility
        </h2>
        <p>
          Renters are responsible for operating vehicles safely and
          complying with traffic laws. Any damages outside coverage
          limitations may be the responsibility of the renter.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-yellow-400 mb-2">
          Recommended Protection
        </h2>
        <p>
          Users are encouraged to review personal insurance policies or
          purchase additional coverage when necessary to ensure adequate
          protection.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-yellow-400 mb-2">
          Incident Reporting
        </h2>
        <p>
          In case of an accident or issue, contact local authorities and
          notify the platform immediately through support channels.
        </p>
      </section>

    </div>

  </div>

</div>


);
}
