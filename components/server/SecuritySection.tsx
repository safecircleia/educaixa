"use client"

import { Lock, Bot, FileCheck } from "lucide-react"

export default function SecuritySection() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* Grid Shield Animation */}
      <div className="relative w-48 h-48 mb-6">
        <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] gap-0.5 opacity-80">
          {Array(400)
            .fill(null)
            .map((_, i) => {
              const distance = Math.sqrt(Math.pow((i % 20) - 10, 2) + Math.pow(Math.floor(i / 20) - 10, 2))
              const isInCircle = distance < 10
              return (
                <div
                  key={i}
                  className={`aspect-square ${isInCircle ? "bg-[#4dc8ff]/30 animate-pulse" : "bg-transparent"}`}
                  style={{
                    animationDelay: `${i * 10}ms`,
                  }}
                />
              )
            })}
        </div>
        <div className="absolute inset-0 bg-gradient-radial from-[#4dc8ff]/20 to-transparent blur-xl" />
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 gap-4 w-full">
        {[
          {
            icon: Lock,
            title: "End-to-End Encryption",
            description: "Enterprise-grade data protection"
          },
          {
            icon: Bot,
            title: "AI Protection",
            description: "Real-time threat detection"
          },
          {
            icon: FileCheck,
            title: "Full Compliance",
            description: "GDPR and CCPA standards"
          }
        ].map((feature) => (
          <div key={feature.title} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#4dc8ff]/10 flex items-center justify-center">
              <feature.icon className="w-4 h-4 text-[#4dc8ff]" />
            </div>
            <div>
              <h4 className="text-sm font-medium">{feature.title}</h4>
              <p className="text-xs text-white/60">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
