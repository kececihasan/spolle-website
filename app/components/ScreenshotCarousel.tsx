'use client';

import { useState } from 'react';
import Image from 'next/image';

const screenshots = [
  {
    id: 1,
    title: "Daily Challenge",
    description: "Her gün yeni bir sanatçı tahmin et! Günlük meydan okumanı başlat.",
    category: "Ana Menü",
    features: ["Spotify Entegrasyonu", "Günlük Reset", "Temiz Arayüz"],
    mockupContent: {
      header: "Spolle",
      mainText: "Guess the Artist",
      subtext: "Challenge yourself with a new artist every day. Can you guess who it is?",
              buttonText: "🎵 Start Spolle (Spotify)",
      statusText: "🎵 Spotify Connected ✓"
    }
  },
  {
    id: 2,
    title: "Genre Selection", 
    description: "Pop, Rock, Hip Hop, Electronic, Classical ve Country arasından favori türünü seç.",
    category: "Tür Seçimi",
    features: ["6 Müzik Türü", "Özel İkonlar", "Kolay Seçim"],
    mockupContent: {
      header: "Music",
      mainText: "Select a genre",
      genres: [
        { name: "Pop", subtitle: "Natural Heartbeats", color: "bg-orange-300" },
        { name: "Rock", subtitle: "Rock Music", color: "bg-red-800" },
        { name: "Hip Hop", subtitle: "Nunahop Natural", color: "bg-gray-800" },
        { name: "Electronic", subtitle: "Digital Waves", color: "bg-green-400" },
        { name: "Classical", subtitle: "Classical Classics", color: "bg-yellow-500" },
        { name: "Country", subtitle: "Country Vibes", color: "bg-green-600" }
      ]
    }
  },
  {
    id: 3,
    title: "Game Interface",
    description: "Sanatçı bilgilerini incele, tahminini yap ve sonuçları gör.",
    category: "Oyun Arayüzü",
    features: ["Gerçek Zamanlı Geri Bildirim", "Detaylı İstatistikler", "Skor Takibi"],
    mockupContent: {
      header: "Guess the Artist",
      subheader: "Guess the daily artist from Spotify",
      inputPlaceholder: "Enter your guess",
      buttonText: "Submit Guess",
      resultText: "🎉 Correct! You guessed Alan Walker!",
      artistName: "Alan Walker",
      stats: [
        { label: "Country", value: "Unknown", color: "green" },
        { label: "Debut Year", value: "2015", color: "green" },
        { label: "Gender", value: "Unknown", color: "gray" },
        { label: "Genre", value: "Unknown", color: "gray" },
        { label: "Popularity", value: "#492", color: "gray" },
        { label: "Type", value: "Solo", color: "green" }
      ]
    }
  },
  {
    id: 4,
    title: "Success Screen",
    description: "Doğru tahmin! Alan Walker'ı başarıyla tahmin ettin. Spotify preview ve detaylar.",
    category: "Başarı Ekranı",
    features: ["Başarı Animasyonu", "Sanatçı Bilgileri", "Spotify Preview"],
    mockupContent: {
      header: "Congratulations!",
      subheader: "You guessed Alan Walker!",
      artistImage: true,
      previewText: "No Preview Available",
      spotifyStatus: "Spotify connected ✓",
      spotifyId: "Spotify ID found ✓",
      trackInfo: "Track has no preview",
      buttonText: "Close"
    }
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

  const PhoneMockup = ({ screenshot, isActive }: { screenshot: typeof screenshots[0], isActive: boolean }) => {
    const { mockupContent } = screenshot;
    
    return (
      <div className={`relative transition-all duration-500 ${isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-60'}`}>
        {/* Phone Frame */}
        <div className="relative w-80 h-[600px] bg-black rounded-[3rem] p-3 shadow-2xl">
          {/* Screen */}
          <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-6 py-2 text-white text-sm">
              <span>20:57</span>
              <div className="flex gap-1">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
                <div className="ml-2">📶</div>
                <div className="w-6 h-3 border border-white rounded-sm">
                  <div className="w-4 h-1.5 bg-white rounded-sm m-0.5"></div>
                </div>
              </div>
            </div>

            {/* Content based on screenshot type */}
            <div className="px-4 py-2 h-full">
              {screenshot.id === 1 && (
                // Main Menu
                <div className="flex flex-col items-center justify-center h-full text-white text-center">
                  <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">{mockupContent.mainText}</h1>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed px-4">
                      {mockupContent.subtext}
                    </p>
                  </div>
                  
                  <div className="w-full max-w-xs">
                    <button className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-black py-3 rounded-full font-semibold mb-6">
                      {mockupContent.buttonText}
                    </button>
                    <p className="text-green-400 text-sm flex items-center justify-center gap-2">
                      {mockupContent.statusText}
                    </p>
                  </div>
                </div>
              )}

              {screenshot.id === 2 && (
                // Genre Selection
                <div className="text-white h-full flex flex-col">
                  <div className="text-center py-4">
                    <p className="text-gray-400 text-sm">{mockupContent.header}</p>
                    <h1 className="text-xl font-bold">{mockupContent.mainText}</h1>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 flex-1 px-2">
                    {mockupContent.genres?.map((genre, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className={`${genre.color} w-full h-20 rounded-lg flex flex-col justify-center items-center p-2 mb-2`}>
                          <div className="text-white font-bold text-xs">{genre.name.toUpperCase()}</div>
                          <div className="text-white text-xs opacity-80">{genre.subtitle}</div>
                          <div className="text-white text-lg mt-1">
                            {index === 0 ? '🎵' : index === 1 ? '⚡' : index === 2 ? '🎤' : index === 3 ? '🎧' : index === 4 ? '🎼' : '🤠'}
                          </div>
                        </div>
                        <span className="text-white text-sm">{genre.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {screenshot.id === 3 && (
                // Game Interface
                <div className="text-white h-full flex flex-col">
                  <div className="flex justify-between items-center py-3">
                    <button className="text-gray-400">✕</button>
                    <button className="text-blue-400 text-sm">Reset</button>
                  </div>
                  
                  <div className="text-center mb-6">
                    <h1 className="text-xl font-bold">{mockupContent.header}</h1>
                    <p className="text-gray-400 text-sm">{mockupContent.subheader}</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <input 
                      className="w-full bg-gray-800 rounded-full px-4 py-3 text-white placeholder-gray-400"
                      placeholder={mockupContent.inputPlaceholder}
                    />
                    <button className="w-full bg-gray-700 text-white py-3 rounded-full">
                      {mockupContent.buttonText}
                    </button>
                  </div>

                  <div className="bg-green-800 rounded-lg p-3 mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">✓</div>
                      <div>
                        <div className="text-green-400 font-bold text-sm">🎉 Correct!</div>
                        <div className="text-gray-300 text-xs">You guessed Alan Walker!</div>
                      </div>
                    </div>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs">View Result</button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-bold">Your Guesses</span>
                      <div className="flex gap-2">
                        <span className="text-green-400">🟢 Correct</span>
                        <span className="text-yellow-400">🟡 Close</span>
                        <span className="text-gray-400">⚪ Wrong</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-gray-800 rounded p-2">
                      <span className="text-blue-400 text-xs">LATEST</span>
                      <div className="w-6 h-6 rounded-full bg-gray-600"></div>
                      <span className="text-white flex-1">{mockupContent.artistName}</span>
                      <div className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">✓</div>
                    </div>
                  </div>
                </div>
              )}

              {screenshot.id === 4 && (
                // Success Screen
                <div className="text-white h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mb-6">
                    <span className="text-black text-2xl font-bold">✓</span>
                  </div>
                  
                  <h1 className="text-2xl font-bold mb-2">{mockupContent.header}</h1>
                  <p className="text-gray-400 mb-8">{mockupContent.subheader}</p>
                  
                  <div className="w-32 h-32 bg-gray-700 rounded-lg mb-6 flex items-center justify-center">
                    <div className="w-20 h-20 bg-gray-600 rounded-lg"></div>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-4 mb-6 w-full max-w-xs">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-gray-400 text-4xl">🔇</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{mockupContent.previewText}</p>
                    <div className="space-y-1 text-xs">
                      <div className="text-green-400">• {mockupContent.spotifyStatus}</div>
                      <div className="text-green-400">• {mockupContent.spotifyId}</div>
                      <div className="text-gray-400">• {mockupContent.trackInfo}</div>
                    </div>
                  </div>
                  
                  <button className="border-2 border-blue-500 text-blue-400 px-8 py-3 rounded-full">
                    {mockupContent.buttonText}
                  </button>
                </div>
              )}
            </div>
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
                  <PhoneMockup screenshot={screenshot} isActive={index === currentIndex} />
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
            <h4 className="text-lg font-bold text-white mb-2">Günlük Hedef</h4>
            <p className="text-gray-200 text-sm">Her gün yeni bir sanatçı tahmin etme imkanı</p>
          </div>
          
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl border-2 border-gray-600 text-center shadow-xl hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-3xl mb-3">🎵</div>
            <h4 className="text-lg font-bold text-white mb-2">Spotify Entegre</h4>
            <p className="text-gray-200 text-sm">Gerçek müzik verileriyle desteklenen oyun</p>
          </div>
          
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl border-2 border-gray-600 text-center shadow-xl hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-3xl mb-3">📊</div>
            <h4 className="text-lg font-bold text-white mb-2">Detaylı Analiz</h4>
            <p className="text-gray-200 text-sm">Sanatçı bilgileri ve istatistikleri</p>
          </div>
        </div>
      </div>
    </div>
  );
} 