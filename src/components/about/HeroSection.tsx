import Link from "next/link";

export default function HeroSection() {

  return (
    <section className="relative w-full h-[500px] shadow-md overflow-hidden py-10">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          alt=""
          className="absolute h-full w-full object-cover"
          src={'/About us.jpg'}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full px-10 gap-5">
        <h1 className="font-poppins font-semibold text-5xl leading-tight text-center text-gray-900 max-w-lg">
          Transforming <span className="text-emerald-500">Global Surplus</span>{" "}
          Trade
        </h1>
        <p className="font-inter font-semibold leading-normal text-center text-gray-500 max-w-lg">
          Connect suppliers, buyers and agents with trust, transparency and
          speed
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 mt-2 ml-20">
          <Link
            href="/signup"
            className="bg-blue-900 text-white font-medium px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Join Our Mission
          </Link>
          <Link
            href="/careers"
            className="bg-white text-blue-900 font-medium px-8 py-3 rounded-lg border-2 border-blue-900 hover:bg-gray-50 transition-colors"
          >
            View Careers
          </Link>
        </div>
      </div>
    </section>
  );
}
