import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-black bg-opacity-75 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-100 mb-6 mt-2 text-center">What's Fabula?</h1>
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-lg text-gray-100">
            Welcome to Fabula, where stories come alive! Our platform is dedicated to capturing the essence 
            of human experiences through compelling narratives, personal reflections, and insightful discussions.
            </p>
          </div>
        </div>
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-lg text-gray-100">
            Whether you're here to read captivating stories, share your own 
            experiences, or connect with like-minded individuals, Fabula is your go-to destination.
            </p>
          </div>
        </div>
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-lg text-gray-100">
              Join us on this journey of discovery, inspiration, and connection. Explore stories that 
              resonate with you, engage with a vibrant community, and share your own unique perspective. 
              Together, let's make Fabula a place where stories come alive.
            </p>
          </div>
        </div>
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-lg text-gray-100">
            We believe in the power of storytelling. Every story shared enriches our community and brings 
            us closer together. Our team is passionate about building a platform that fosters creativity, empathy, 
            and meaningful connections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
