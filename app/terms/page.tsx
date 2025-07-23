import Image from "next/image";
import Link from "next/link";

export default function Terms() {
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
            <Link
              href="/"
              className="text-gray-300 hover:text-white font-medium transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Terms of Use
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <div className="bg-gray-900/50 rounded-2xl p-8 mb-8">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Last updated: December 2024
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Welcome to Spolle! These Terms of Use govern your access to and use of our daily music guessing game. By using Spolle, you agree to be bound by these terms.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-green-400">Acceptance of Terms</h2>
              <div className="bg-gray-800/50 rounded-xl p-6">
                <p className="text-gray-300 leading-relaxed">
                  By downloading, installing, or using the Spolle app, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our service.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-green-400">Game Rules and Fair Play</h2>
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-400">Daily Challenges</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Each user gets one daily challenge per day</li>
                  <li>Challenges reset at midnight UTC</li>
                  <li>No cheating or use of external tools</li>
                  <li>Multiple accounts per person are not allowed</li>
                </ul>
                
                <h3 className="text-xl font-semibold mb-3 text-blue-400">Fair Play Policy</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Play honestly and respect other players</li>
                  <li>Do not share answers or spoil challenges</li>
                  <li>Report bugs and issues responsibly</li>
                  <li>Respect the game&apos;s intended mechanics</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-green-400">User Conduct</h2>
              <div className="bg-gray-800/50 rounded-xl p-6">
                <p className="text-gray-300 leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Use the app for any illegal or unauthorized purpose</li>
                  <li>Attempt to hack, reverse engineer, or exploit the app</li>
                  <li>Create multiple accounts to gain unfair advantages</li>
                  <li>Share or distribute copyrighted content</li>
                  <li>Interfere with other users&apos; enjoyment of the game</li>
                  <li>Use automated tools or bots</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-green-400">Intellectual Property</h2>
              <div className="bg-gray-800/50 rounded-xl p-6">
                <p className="text-gray-300 leading-relaxed mb-4">
                  Spolle and all related content, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Game design and mechanics</li>
                  <li>Software code and algorithms</li>
                  <li>Visual design and user interface</li>
                  <li>Logos, trademarks, and branding</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Are owned by Spolle and protected by intellectual property laws. You may not copy, modify, or distribute any part of our content without permission.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-green-400">Music Content</h2>
              <div className="bg-gray-800/50 rounded-xl p-6">
                <p className="text-gray-300 leading-relaxed mb-4">
                  Spolle uses music data and artist information from various sources:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>All music content is used for educational and entertainment purposes</li>
                  <li>We respect copyright and intellectual property rights</li>
                  <li>Artist information is sourced from public databases</li>
                  <li>No actual music files are stored or distributed</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  If you believe your intellectual property rights have been violated, please contact us immediately.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-green-400">Disclaimers</h2>
              <div className="bg-gray-800/50 rounded-xl p-6">
                <p className="text-gray-300 leading-relaxed mb-4">
                  Spolle is provided &quot;as is&quot; without warranties of any kind:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>We do not guarantee uninterrupted service</li>
                  <li>Game content may change without notice</li>
                  <li>We are not responsible for data loss</li>
                  <li>Third-party services may affect functionality</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-green-400">Limitation of Liability</h2>
              <div className="bg-gray-800/50 rounded-xl p-6">
                <p className="text-gray-300 leading-relaxed">
                  To the maximum extent permitted by law, Spolle shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the app, including but not limited to loss of data, loss of profits, or business interruption.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-green-400">Termination</h2>
              <div className="bg-gray-800/50 rounded-xl p-6">
                <p className="text-gray-300 leading-relaxed mb-4">
                  We reserve the right to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Suspend or terminate your access for violations</li>
                  <li>Modify or discontinue the service</li>
                  <li>Remove content that violates these terms</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  You may stop using Spolle at any time by deleting the app from your device.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-green-400">Contact Information</h2>
              <div className="bg-gray-800/50 rounded-xl p-6">
                <p className="text-gray-300 leading-relaxed">
                  If you have questions about these Terms of Use, please contact us at:
                </p>
                <p className="text-blue-400 font-semibold mt-2">
                  info@spolle.com
                </p>
              </div>
            </section>

            <div className="bg-gradient-to-r from-green-400/10 to-blue-500/10 rounded-xl p-6 border border-green-400/20">
              <p className="text-gray-300 leading-relaxed">
                These Terms of Use may be updated from time to time. Continued use of Spolle after changes constitutes acceptance of the new terms.
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