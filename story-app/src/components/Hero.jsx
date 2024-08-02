import React from 'react';
import { Link as ScrollLink } from 'react-scroll';

const HeroSection = () => {
  return (
    <div className="relative bg-black bg-opacity-70 text-white overflow-hidden mb-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between py-20 px-6 lg:px-16">
        <div className="lg:w-1/2 lg:pr-8 text-center lg:text-left space-y-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            Welcome to Fabula
          </h1>
          <p className="text-xl lg:text-2xl mt-4 opacity-90">
          Embark on a journey through captivating tales and extraordinary adventures. 
          Discover a world where every story brings a new and thrilling experience.
          </p>
          <div className="mt-8">
            <ScrollLink 
              to="stories" 
              smooth={true} 
              duration={500} 
              className="cursor-pointer bg-white text-purple-900 px-6 py-3 rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:bg-gray-100"
            >
              Browse Stories
            </ScrollLink>
          </div>
        </div>
        
        {/* Right Side: Image */}
        <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center lg:justify-end">
          <img src="images/hero.jpg" alt="Hero" className="w-full h-auto rounded-lg shadow-2xl transform transition duration-500 hover:scale-105" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
