'use client';

import { useState } from 'react';
import Image from 'next/image';

const screenshots = [
  {
    id: 1,
    title: "Main Menu",
    description: "Welcome to Spolle game! Start your daily music guessing challenge from here.",
    category: "Home Screen",
    features: ["Daily Challenge", "Clean Interface", "Easy Start"],
    image: "/images/main.jpeg"
  },
  {
    id: 2,
    title: "Guess Screen", 
    description: "Get hints about the artist and make your guesses. Each hint brings you closer to the target.",
    category: "Game Interface",
    features: ["Hints", "Guess System", "Real-time Feedback"],
    image: "/images/guess.jpeg"
  },
  {
    id: 3,
    title: "Success Screen",
    description: "Congratulations! You made the correct guess. View your results and celebrate your success.",
    category: "Results",
    features: ["Success Celebration", "Detailed Results", "Statistics"],
    image: "/images/win.jpeg"
  }
];

export default function ScreenshotCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const ScreenshotImage = ({ screenshot, isActive }: { screenshot: typeof screenshots[0], isActive: boolean }) => {
    return (
      <div className={`relative transition-all duration-500 ${isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-60'}`}>
        <div className="relative w-80 h-[600px] bg-black rounded-[3rem] p-3 shadow-2xl">
          <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
            <Image
              src={screenshot.image}
              alt={screenshot.title}
              fill
              className="object-cover rounded-[2rem]"
              sizes="(max-width: 768px) 100vw, 320px"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full bg-gradient-to-b from-gray-900 to-black py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
        
        {/* Phone Carousel Section */}
        <div className="relative w-full mb-16">
          <div className="flex items-center justify-center min-h-[700px]">
            {/* Navigation Buttons */}
            <button
              className="absolute left-4 z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 hover:bg-white/20 transition-colors"
              onClick={prevSlide}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <button
              className="absolute right-4 z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 hover:bg-white/20 transition-colors"
              onClick={nextSlide}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Phone Carousel */}
            <div className="flex items-center justify-center space-x-8">
              {screenshots.map((screenshot, index) => (
                <div
                  key={screenshot.id}
                  className={`transition-all duration-500 ${
                    index === currentIndex 
                      ? 'opacity-100 scale-100 z-10' 
                      : Math.abs(index - currentIndex) === 1
                      ? 'opacity-40 scale-75'
                      : 'opacity-0 scale-50 hidden'
                  }`}
                >
                  <ScreenshotImage screenshot={screenshot} isActive={index === currentIndex} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex gap-2 justify-center mt-8">
            {screenshots.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-green-400' : 'bg-white/30'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Current Screenshot Info - Now positioned below phones */}
        <div className="w-full max-w-2xl text-center">
          <div className="bg-black/90 backdrop-blur-xl rounded-2xl p-8 border-2 border-gray-600 shadow-2xl shadow-green-500/20">
            <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
              {screenshots[currentIndex].title}
            </h3>
            <p className="text-gray-200 mb-6 text-lg leading-relaxed">
              {screenshots[currentIndex].description}
            </p>
            
            {/* Feature Tags */}
            <div className="flex flex-wrap gap-3 justify-center mb-6">
              {screenshots[currentIndex].features.map((feature, index) => (
                <span key={index} className="bg-gradient-to-r from-green-400/30 to-blue-500/30 border-2 border-green-400/50 text-green-200 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ✨ {feature}
                </span>
              ))}
            </div>
            
            {/* Category Badge */}
            <div className="flex justify-center">
              <span className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-black px-8 py-4 rounded-full text-xl font-bold shadow-2xl shadow-green-400/50 transform hover:scale-105 transition-transform">
                📱 {screenshots[currentIndex].category}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl mt-12">
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl border-2 border-gray-600 text-center shadow-xl hover:border-green-400/50 transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="text-lg font-bold text-white mb-2">Daily Target</h4>
            <p className="text-gray-200 text-sm">Opportunity to guess a new artist every day</p>
          </div>
          
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl border-2 border-gray-600 text-center shadow-xl hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-3xl mb-3">🎵</div>
            <h4 className="text-lg font-bold text-white mb-2">Popular Artists</h4>
            <p className="text-gray-200 text-sm">Game powered by popular music data</p>
          </div>
          
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl border-2 border-gray-600 text-center shadow-xl hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-3xl mb-3">📊</div>
            <h4 className="text-lg font-bold text-white mb-2">Detailed Analysis</h4>
            <p className="text-gray-200 text-sm">Artist information and statistics</p>
          </div>
        </div>
      </div>
    </div>
  );
} 