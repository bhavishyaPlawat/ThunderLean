import React from 'react'

const Hero = () => {
  return (
    <div>
        <div className="absolute" style={{ left: "228px", top: "136px" }}>
          <h1 className="text-[4vw] font-bold leading-tight text-[#1A1A1A] w-[24.03vw] h-[18.89vh">
            Track Your <br /> Calories <br /> Smartly
          </h1>
          <p className="text-[#5C5C5C] text-[1.2vw] font-medium mt-[1.5vh]">
            AI-powered insights for <br /> your fitness journey
          </p>
        </div>

        <img
          src="src/assets/92b1abfd1bf20f53a8f801764609dfb4aa64d3a2.png"
          alt=""
          className="absolute"
          style={{
            width: "385px",
            height: "385px",
            left: "904px",
            top: "116px",
          }}
          loading="lazy"
        />
      </div>
  )
}

export default Hero