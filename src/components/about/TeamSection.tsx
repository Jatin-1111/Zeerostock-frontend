export default function TeamSection() {
  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former McKinsey Partner, 15+ years in supply chain optimization.",
    },
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former McKinsey Partner, 15+ years in supply chain optimization.",
    },
    {
      name: "Sarah Ch",
      role: "CEO & Co-Founder",
      bio: "Former McKinsey Partner, 15+ years in supply chain optimization.",
    },
    {
      name: "Sarah Ch",
      role: "CEO & Co-Founder",
      bio: "Former McKinsey Partner, 15+ years in supply chain optimization.",
    },
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-gray-600 mb-4">Our Team</p>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Meet the People Behind Zeerostock
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          Our experienced leadership team brings together decades of expertise
          in technology, supply chain, and B2B marketplaces.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-900 rounded-lg p-6"
            >
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Photo</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-gray-900 font-medium text-center mb-2">
                {member.role}
              </p>
              <p className="text-sm text-gray-600 text-center">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
