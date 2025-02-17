import { GlowyDivider } from '@/components/ui/GlowyDivider'
import { FileText, Shield, Lock, AlertCircle, Mail, Home, Check, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-black text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Terms of Service</h1>
          <Link 
            href="/" 
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
        </div>
        
        <div className="space-y-4">
          <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-semibold">Agreement to Terms</h2>
            </div>
            <p className="mb-4">By accessing or using SafeCircle's services, you agree to be bound by these Terms of Service and our Privacy Policy. Our services are designed to protect families while respecting privacy and data ownership rights.</p>
          </section>

          <GlowyDivider />

          <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-semibold">Service Description</h2>
            </div>
            <p className="mb-4">SafeCircle provides AI-powered child safety monitoring services that include:</p>
            <ul className="list-none space-y-3">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>Real-time monitoring of online activity</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>Smart protection and content filtering</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>Privacy-first design with zero-knowledge architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>End-to-end encrypted data protection</span>
              </li>
            </ul>
          </section>

          <GlowyDivider />

          <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-semibold">User Responsibilities</h2>
            </div>
            <ul className="list-none space-y-3">
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Maintain the confidentiality of your account credentials</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Use the service in compliance with all applicable laws</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Respect the privacy rights of all users</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Not attempt to circumvent or disable any security features</span>
              </li>
            </ul>
          </section>

          <GlowyDivider />

          <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
            </div>
            <p className="mb-4">While we strive to provide the highest level of protection, SafeCircle is not liable for:</p>
            <ul className="list-none space-y-3">
              <li className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>Internet connectivity issues or service interruptions</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>Actions taken by users in violation of these terms</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>Content that may bypass our filtering systems</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>Any indirect, consequential, or incidental damages</span>
              </li>
            </ul>
          </section>

          <GlowyDivider />

          <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-semibold">Changes to Terms</h2>
            </div>
            <p>We reserve the right to modify these terms at any time. Users will be notified of significant changes via email or through the service interface.</p>
          </section>

          <GlowyDivider />

          <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-semibold">Contact Information</h2>
            </div>
            <p>For questions about these terms, please contact our legal team at legal@safecircle.com</p>
          </section>
        </div>
      </div>
    </main>
  )
}