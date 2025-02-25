import { GlowyDivider } from '@/components/ui/GlowyDivider'
import { Eye, Shield, Lock, FileCheck, Mail, Home } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">Privacy Policy</h1>
          <Link 
            href="/" 
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-teal-500/10 hover:from-cyan-500/20 hover:to-teal-500/20 transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
        </div>
        
        <div className="space-y-4">
          <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-cyan-500" />
              <h2 className="text-2xl font-semibold">Our Commitment to Privacy</h2>
            </div>
            <p className="mb-4">At SafeCircle, we prioritize the privacy and security of your family&apos;s data. Our platform is built on a zero-knowledge architecture, ensuring that your personal information remains completely private and under your control.</p>
          </section>

          <GlowyDivider />

          <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-teal-500" />
              <h2 className="text-2xl font-semibold">Data Collection and Use</h2>
            </div>
            <ul className="list-none space-y-3">
              <li className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>We never see or store your personal data - all monitoring is done locally</span>
              </li>
              <li className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>All data is encrypted end-to-end using AES-256 & RSA encryption</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>You maintain full ownership and control of your data</span>
              </li>
              <li className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>Data can be exported or deleted at any time</span>
              </li>
            </ul>
          </section>

          <GlowyDivider />

          <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-cyan-500" />
              <h2 className="text-2xl font-semibold">Privacy Features</h2>
            </div>
            <ul className="list-none space-y-3">
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Zero-knowledge architecture ensures complete privacy</span>
              </li>
              <li className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Granular privacy controls for customizing data sharing</span>
              </li>
              <li className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Regular third-party security audits</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>GDPR compliant data handling</span>
              </li>
              <li className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Transparent data processing policies</span>
              </li>
            </ul>
          </section>

          <GlowyDivider />

          <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-teal-500" />
              <h2 className="text-2xl font-semibold">Contact Us</h2>
            </div>
            <p>If you have any questions about our privacy policy or data practices, please contact our privacy team at privacy@safecircle.com</p>
          </section>
        </div>
      </div>
    </main>
  )
}