'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import InteractiveButton from './components/InteractiveButton';
import RippleButton from './components/RippleButton';
import MagneticCursor from './components/MagneticCursor';

// Dynamically import Three.js components to avoid SSR issues
const SimpleMusicBackground = dynamic(() => import('./components/SimpleMusicBackground'), {
  ssr: false,
});

const SimpleParticleField = dynamic(() => import('./components/SimpleParticleField'), {
  ssr: false,
});

const ScreenshotCarousel = dynamic(() => import('./components/ScreenshotCarousel'), {
  ssr: false,
});

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Ultra-fast scroll with minimal computation
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const headerHeight = 80;
    const targetPosition = element.offsetTop - headerHeight;

    // Close mobile menu when navigating
    setIsMobileMenuOpen(false);

    // Ultra-fast scroll with native smooth behavior
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth' // Changed to smooth for better UX
    });
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <MagneticCursor />
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/90 backdrop-blur-xl z-50 border-b border-gray-800/50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <Image
                src="/images/spolle-logo.png"
                alt="Spolle Logo"
                width={160}
                height={48}
                className="h-10 w-auto transition-transform duration-200 hover:scale-105"
                priority
              />
            </div>

            {/* Navigation - Centered */}
            <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
              <div className="flex items-center gap-8">
                <button
                  onClick={() => scrollToSection('features')}
                  className="relative group px-3 py-2 text-gray-300 hover:text-white font-medium transition-all duration-200"
                >
                  Features
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 group-hover:w-full transition-all duration-200"></div>
                </button>

                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="relative group px-3 py-2 text-gray-300 hover:text-white font-medium transition-all duration-200"
                >
                  How It Works
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-200"></div>
                </button>

                <button
                  onClick={() => scrollToSection('screenshots')}
                  className="relative group px-3 py-2 text-gray-300 hover:text-white font-medium transition-all duration-200"
                >
                  Screenshots
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 group-hover:w-full transition-all duration-200"></div>
                </button>
              </div>
            </nav>

            {/* Download Buttons */}
            <div className="flex items-center gap-2">
              <RippleButton
                className="group bg-gray-800/60 border border-gray-600/40 text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:border-purple-400/60 hover:bg-gray-700/60 transition-all duration-200"
                type="secondary"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-gray-300 group-hover:text-white transition-colors duration-200">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="hidden sm:flex flex-col items-start leading-tight">
                  <span className="text-xs text-gray-400">App Store</span>
                </div>
              </RippleButton>

              <RippleButton
                className="group bg-gray-800/60 border border-gray-600/40 text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:border-blue-400/60 hover:bg-gray-700/60 transition-all duration-200"
                type="secondary"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-gray-300 group-hover:text-white transition-colors duration-200">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="hidden sm:flex flex-col items-start leading-tight">
                  <span className="text-xs text-gray-400">Google Play</span>
                </div>
              </RippleButton>

              {/* Mobile Menu Button */}
              <button 
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg border border-gray-600/40 hover:border-purple-400/60 hover:bg-gray-700/60 transition-all duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-300">
                  <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 lg:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-2xl font-medium text-gray-300 hover:text-white transition-colors duration-200"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-2xl font-medium text-gray-300 hover:text-white transition-colors duration-200"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('screenshots')}
              className="text-2xl font-medium text-gray-300 hover:text-white transition-colors duration-200"
            >
              Screenshots
            </button>
            <button
              onClick={toggleMobileMenu}
              className="mt-8 p-3 rounded-full border border-gray-600 hover:border-purple-400 transition-colors duration-200"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-300">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 bg-gradient-to-b from-black via-gray-950 to-gray-900 overflow-hidden">
        {isClient && <SimpleMusicBackground />}
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex justify-center">
              <Image
                src="/images/spolle-logo.png"
                alt="Spolle Logo"
                width={400}
                height={120}
                className="h-24 w-auto"
                priority
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Daily Music<br />Guessing Game
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Guess a new artist every day! Test your music knowledge with popular artists and compete with friends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <InteractiveButton
                className="bg-gradient-to-r from-green-400 to-blue-500 text-black px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2"
                type="primary"
              >
                <span>🎵</span>
                Start Game
              </InteractiveButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-8 max-w-xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">365</div>
                <div className="text-gray-400">Daily Challenges</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">6</div>
                <div className="text-gray-400">Music Genres</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-16 px-4 bg-gradient-to-b from-gray-900 via-blue-950/30 to-gray-900/80 overflow-hidden">
        {isClient && <SimpleParticleField color="#3366ff" />}
        <div className="container mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12">Why Spolle?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-green-400/50 transition-colors">
              <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Daily Challenge</h3>
              <p className="text-gray-300">Guess a new artist every day. No annoying waits, just your daily dose!</p>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-purple-400/50 transition-colors opacity-60">
              <div className="w-12 h-12 bg-purple-400/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Detailed Statistics</h3>
              <p className="text-gray-300">Get hints about country, debut year, genre, popularity and more.</p>
              <div className="mt-4 inline-block bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm font-semibold">
                Coming Soon
              </div>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-orange-400/50 transition-colors opacity-60">
              <div className="w-12 h-12 bg-orange-400/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎸</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Multi-Genre Support</h3>
              <p className="text-gray-300">Specialize in Pop, Rock, Hip Hop, Electronic, Classical and Country genres.</p>
              <div className="mt-4 inline-block bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm font-semibold">
                Coming Soon
              </div>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-red-400/50 transition-colors opacity-60">
              <div className="w-12 h-12 bg-red-400/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Score Tracking</h3>
              <p className="text-gray-300">Track your correct, close and wrong guesses, see your progress.</p>
              <div className="mt-4 inline-block bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm font-semibold">
                Coming Soon
              </div>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-cyan-400/50 transition-colors">
              <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Reset Feature</h3>
              <p className="text-gray-300">If you want to start over, you can reset your progress.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-16 px-4 bg-gradient-to-b from-gray-900/80 via-slate-950/50 to-gray-950 overflow-hidden">
        <div className="container mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works?</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-black font-bold text-2xl shadow-lg">
                  1
                </div>
                <h3 className="font-bold mb-3 text-lg">Start Game</h3>
                <p className="text-gray-300 text-base leading-relaxed">Open the app and begin your daily challenge</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl shadow-lg">
                  2
                </div>
                <h3 className="font-bold mb-3 text-lg">Make Guess</h3>
                <p className="text-gray-300 text-base leading-relaxed">Guess the daily artist and get hints</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl shadow-lg">
                  3
                </div>
                <h3 className="font-bold mb-3 text-lg">View Results</h3>
                <p className="text-gray-300 text-base leading-relaxed">Discover detailed information and check your score</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Preview - Interactive Carousel */}
      <section id="screenshots" className="relative -mt-8 pt-20 pb-16 px-4 bg-gradient-to-b from-gray-950 via-purple-950/40 to-black overflow-hidden">
        {isClient && <SimpleParticleField color="#8b5cf6" />}
        <div className="container mx-auto text-center relative z-10 mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Real Screenshots</h2>
          <p className="text-xl text-gray-300 mb-8">Discover the real interface of Spolle app</p>
        </div>
        <div className="relative z-10">
          {isClient && <ScreenshotCarousel />}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 px-4 bg-gradient-to-b from-black via-green-950/20 to-emerald-950/30 overflow-hidden">
        {isClient && <SimpleParticleField color="#22c55e" />}
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-12 rounded-3xl border border-gray-700">
            <h2 className="text-4xl font-bold mb-4">Ready to Play?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the daily artist quiz and experience this fun challenge with popular artists!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <RippleButton
                className="bg-black border-2 border-gray-600 text-white px-8 py-5 rounded-xl flex items-center gap-5 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 min-w-[240px]"
                type="primary"
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-base text-gray-300">Download on</span>
                  <span className="text-xl font-semibold">App Store</span>
                </div>
              </RippleButton>

              <RippleButton
                className="bg-black border-2 border-gray-600 text-white px-8 py-5 rounded-xl flex items-center gap-5 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 min-w-[240px]"
                type="secondary"
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-base text-gray-300">Get it on</span>
                  <span className="text-xl font-semibold">Google Play</span>
                </div>
              </RippleButton>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-800 py-8 px-4 bg-gradient-to-b from-emerald-950/30 via-gray-950 to-black">
        <div className="container mx-auto text-center relative z-10">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/images/spolle-logo.png"
              alt="Spolle Logo"
              width={120}
              height={36}
              className="h-8 w-auto"
            />
          </div>
          <p className="text-gray-400 mb-4">Daily artist guessing game - With popular artists</p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="mailto:contact@spolle.com" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-xs text-gray-500 mt-4">© 2024 Spolle. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
