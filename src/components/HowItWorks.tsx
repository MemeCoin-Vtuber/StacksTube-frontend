const HowItWorks = () => {
  const steps = [
    {
      title: "Create VTuber",
      description:
        "Design your unique VTuber character using our templates or upload custom artwork. Set personality traits and voice characteristics.",
      icon: "/images/Body.svg",
    },
    {
      title: "Launch on Stacks",
      description:
        "Deploy your VTuber's smart contracts on Stacks blockchain. Set up NFT collections and token integration for community rewards.",
      icon: "/images/Gradient Shades.svg",
    },
    {
      title: "Customize AI Behavior",
      description:
        "Define your VTuber's interaction style, content themes, and engagement patterns using our AI configuration tools.",
      icon: "/images/light.svg",
    },
    {
      title: "Start Earning",
      description:
        "Generate revenue through NFT sales, token staking rewards, and community engagement. Build your VTuber brand on Stacks.",
      icon: "/images/Helmet.svg",
    },
  ];

  return (
    <section className="bg-blue-dark py-12 md:py-24 relative overflow-hidden">
      {/* Left side images - hidden on mobile */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] hidden lg:block pointer-events-none">
        <img
          src="/images/hero-image04.svg"
          loading="lazy"
          alt=""
          className="absolute left-[15%] top-[-100px] w-[160px] rotate-[10deg] mix-blend-soft-light opacity-70"
        />
      </div>

      {/* Right side images - hidden on mobile */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] hidden lg:block pointer-events-none">
        <img
          src="/images/hero-image02.svg"
          loading="lazy"
          alt=""
          className="absolute right-[15%] top-[-80px] w-[150px] rotate-[-15deg] mix-blend-soft-light opacity-70"
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-10 shadow-[-4px_4px_0_0_#1f2024]">
          <h2 className="text-center mb-8 md:mb-10 text-2xl md:text-3xl">How StacksTube Works</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="text-center flex flex-col items-center bg-white/50 rounded-lg p-4 md:p-0 md:bg-transparent"
              >
                <div className="mx-auto mb-4 md:mb-5 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                  <img
                    src={step.icon}
                    alt={step.title}
                    className="max-w-full max-h-full transform transition-transform hover:scale-110"
                  />
                </div>
                <h3 className="mb-2 md:mb-4 text-lg md:text-xl font-bold">{step.title}</h3>
                <p className="text-sm md:text-base text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
