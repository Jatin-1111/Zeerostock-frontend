export default function TrendingIndustriesSection() {
  const iconChart =
    "https://www.figma.com/api/mcp/asset/360fc98d-2ff6-4b5a-bb40-b552feb4e7ca";
  const industryImage =
    "https://www.figma.com/api/mcp/asset/5e482c2a-ed50-4db0-99d5-b03d01aac5b5";

  const industries = [
    { name: "Construction", image: industryImage },
    { name: "Technology", image: industryImage },
    { name: "Manufacturing", image: industryImage },
    { name: "Pharma", image: industryImage },
    { name: "Agri-export", image: industryImage },
    { name: "Healthcare", image: industryImage },
  ];

  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "45px 0",
      }}
    >
      {/* Header with icon and title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginBottom: "29px",
        }}
      >
        <img
          src={iconChart}
          alt="Chart"
          style={{
            width: "29px",
            height: "29px",
          }}
        />
        <h2
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "26px",
            color: "#0d1b2a",
            margin: 0,
          }}
        >
          Trending Industries
        </h2>
        <div
          style={{
            background: "#FFF1C2",
            borderRadius: "4px",
            padding: "2px 11px",
            marginLeft: "15px",
          }}
        >
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              fontSize: "15px",
              color: "#0d1b2a",
            }}
          >
            Hot Markets
          </span>
        </div>
      </div>

      {/* Industries grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 138px)",
          gap: "15px",
          justifyContent: "space-between",
        }}
      >
        {industries.map((industry, index) => (
          <div
            key={index}
            style={{
              width: "138px",
              height: "138px",
              background: "white",
              borderRadius: "50%",
              overflow: "hidden",
              cursor: "pointer",
              boxShadow: "0px 0px 4px 0px rgba(24,181,34,0.25)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <img
              src={industry.image}
              alt={industry.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
