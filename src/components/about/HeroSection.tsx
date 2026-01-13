import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[22rem] shadow-md overflow-hidden py-4 sm:py-6 md:py-7">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          alt=""
          className="absolute h-full w-full object-cover"
          src={"/About us.jpg"}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 sm:px-6 md:px-7 gap-3">
        <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-4xl leading-tight text-center text-gray-900 max-w-full sm:max-w-md md:max-w-lg px-4 sm:px-0">
          Transforming <span className="text-emerald-500">Global Surplus</span>{" "}
          Trade
        </h1>
        <p className="font-semibold text-sm sm:text-base md:text-lg leading-normal text-center text-gray-500 max-w-full sm:max-w-sm md:max-w-md px-4 sm:px-0">
          Connect suppliers, buyers and agents with trust, transparency and
          speed
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-2 w-auto px-4 sm:px-0">
          <Link
            href="/signup"
            className="bg-blue-900 text-white font-medium px-5 sm:px-[21px] py-2 sm:py-[8px] rounded-lg hover:bg-blue-800 transition-colors text-center"
          >
            Join Our Mission
          </Link>
          <Link
            href="/careers"
            className="bg-white text-blue-900 font-medium px-5 sm:px-[21px] py-2 sm:py-[8px] rounded-lg border-2 border-blue-900 hover:bg-gray-50 transition-colors text-center"
          >
            View Careers
          </Link>
        </div>
      </div>
    </section>
  );
}
