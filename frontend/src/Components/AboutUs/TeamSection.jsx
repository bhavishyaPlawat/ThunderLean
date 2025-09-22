import React, { forwardRef } from "react";

const TeamSection = forwardRef(({ visible, teamMembers }, ref) => {
  return (
    <div
      ref={ref}
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Header */}
      <div
        className={`text-center mb-12 transition-all duration-800 delay-200 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mb-4 animate-width-expand"></div>
        <p className="text-lg text-gray-600">
          The passionate minds behind ThunderLean's revolutionary technology
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-500 border border-purple-100 hover:rotate-1 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${index * 200 + 400}ms` }}
          >
            <div className={`h-2 bg-gradient-to-r ${member.gradient} group-hover:h-4 transition-all duration-300`}></div>
            <div className="p-6 text-center">
              <div className="relative mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto border-4 border-purple-100 group-hover:border-purple-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                />
                <div className="absolute inset-0 w-24 h-24 rounded-full mx-auto bg-gradient-to-tr from-transparent to-purple-100/20 group-hover:to-purple-100/40 transition-all duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-purple-700 transition-colors duration-300">
                {member.name}
              </h3>
              <p
                className={`text-sm font-semibold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-3`}
              >
                {member.role}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default TeamSection;
