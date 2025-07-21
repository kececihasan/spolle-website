import Image from "next/image";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/90 backdrop-blur-xl z-50 border-b border-gray-800/50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="/images/spolle-logo.png"
                alt="Spolle Logo"
                width={160}
                height={48}
                className="h-10 w-auto"
                priority
              />
            </div>
            <a
              href="/"
              className="text-gray-300 hover:text-white font-medium transition-colors duration-200"
            >
              Back to Home
            </a>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <div className="bg-gray-900/50 rounded-2xl p-8 mb-8">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Last updated: December 2024
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                At Spolle, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our daily music guessing game.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-green-400">Information We Collect</h2>
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-400">Game Data</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Your game progress and scores</li>
                  <li>Daily challenge completion status</li>
                  <li>Guess history and statistics</li>
                  <li>Game preferences and settings</li>
                </ul>
                
                <h3 className="text-xl font-semibold mb-3 text-blue-400">Device Information</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Device type and operating system</li>
                  <li>App version and usage analytics</li>
                  <li>Crash reports and performance data</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-green-400">How We Use Your Information</h2>
              <div className="bg-gray-800/50 rounded-xl p-6">
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Provide and improve the Spolle gaming experience</li>
                  <li>Track your progress and maintain game statistics</li>
                  <li>Deliver daily challenges and new content</li>
                  <li>Analyze app performance and fix bugs</li>
                  <li>Send important updates about the game</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-green-400">Data Security</h2>
              <div className="bg-gray-800/50 rounded-xl p-6">
                <p className="text-gray-300 leading-relaxed mb-4">
                  We implement industry-standard security measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Encrypted data transmission and storage</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to personal data</li>
                  <li>Secure servers and infrastructure</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-green-400">Third-Party Services</h2>
              <div className="bg-gray-800/50 rounded-xl p-6">
                <p className="text-gray-300 leading-relaxed mb-4">
                  Spolle may use third-party services for:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Analytics and app performance monitoring</li>
                  <li>Crash reporting and bug tracking</li>
                  <li>Music data and artist information</li>
                </ul>
                <p className="text-gray-300 leading-relaxed mt-4">
                  These services have their own privacy policies and we encourage you to review them.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-green-400">Your Rights</h2>
              <div className="bg-gray-800/50 rounded-xl p-6">
                <p className="text-gray-300 leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Access your personal data</li>
                  <li>Request data correction or deletion</li>
                  <li>Opt-out of data collection</li>
                  <li>Export your game data</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-green-400">Contact Us</h2>
              <div className="bg-gray-800/50 rounded-xl p-6">
                <p className="text-gray-300 leading-relaxed">
                  If you have any questions about this Privacy Policy or your data, please contact us at:
                </p>
                <p className="text-blue-400 font-semibold mt-2">
                  privacy@spolle.com
                </p>
              </div>
            </section>

            <div className="bg-gradient-to-r from-green-400/10 to-blue-500/10 rounded-xl p-6 border border-green-400/20">
              <p className="text-gray-300 leading-relaxed">
                This Privacy Policy may be updated from time to time. We will notify you of any significant changes through the app or our website.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4 bg-gradient-to-b from-gray-950 to-black">
        <div className="container mx-auto text-center">
          <p className="text-xs text-gray-500">© 2024 Spolle. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}